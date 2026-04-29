#  Multithreading C++
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2026.04.29 by <a href="#">thuong.nv</a>
</p>

## Tổng quan

Giới thiệu đa luồng và các kỹ thuật về lập trình đa luồng, cách xử lý các vấn đề trong lập trình đa luồng.

Trong bài viết sẽ sử dụng C++ để đưa ra các hướng dẫn và giải thích.


**Khái niệm :** Multithreading (Đa luồng) là kỹ thuật lập trình cho phép một chương trình (tiến trình) thực thi đồng thời nhiều luồng (threads) độc lập, giúp tối ưu hóa hiệu suất CPU và cải thiện tốc độ xử lý tác vụ

---

##### Kiến trúc phổ biến

Trong thực tế rất nhiều ứng dụng sử dụng một cấu trúc gọi là `threadpools` nhằm mục đích quản lý các task vụ chạy đọc lập.

Thread pool là một tập hợp các thread được tạo sẵn, sau đó:
- Bạn đưa task (công việc) vào hàng đợi.
- Các thread trong pool sẽ lấy task ra và xử lý.
- Xong thì không chết, mà quay lại chờ task mới.

Hướng thiết kế : Tạo ra một số lượng thread dùng để thực hiện task. Mỗi task đầu vào sẽ được phân bổ một vào các thread tùy ý.
Khi có một task mới được thêm vào nó sẽ thông báo và 1 trong các thread sẽ nhận tín hiệu lấy task và thực hiện.

1. ThreadPools <a id="threadpools"></a>

   `ThreadPools` là thực hiện các task một cách độc lập. Phân bổ task một cách ngẫu nhiên vào các thread.

    a. Đầu tiên cần giới thiệu đơn vị làm việc trong thread đó là `WorkTask`. 
    (Không hỗ trợ giá trị trả về). Class không support copy và gán vì điều này có thể làm cho mất nhiều thời gian.

    ```cpp
    class WorkTask
    {
    public:
        WorkTask() { }
        ~WorkTask() {}
        WorkTask(const WorkTask&) = delete;
        WorkTask& operator=(const WorkTask&) = delete;

        WorkTask(WorkTask&& other) noexcept
            : execute_func(std::move(other.execute_func)) {
        }

        WorkTask& operator=(WorkTask&& other) noexcept {
            if (this != &other) {
                execute_func = std::move(other.execute_func);
            }
            return *this;
        }

        template <typename F>
        explicit WorkTask(F&& f) : execute_func(std::forward<F>(f)) {}

    public:
        void operator()() {
            if (execute_func) {
                execute_func();
            }
        }

        bool IsValid() const{
            return execute_func ? true : false;
        }

    protected:
        std::function<void()> execute_func;
    };
    ```

    Xem xét đoạn code này : 
    ```cpp 
    template <typename F>
    explicit WorkTask(F&& f) : execute_func(std::forward<F>(f)) {}
    ```
    Đoạn code này hỗ trợ khởi tạo từ các loại như : lambda, bind, Function pointer. `std::forward<F>` có nghĩa là nếu ra rvalue -> rvalue, lvalue -> lvalue.

    `F&&` ở đây không phải rvalue reference thuần túy — nó là universal reference, nghĩa là nhận được cả lvalue lẫn rvalue.

    ```
    WorkTask task1([](){ ... });       // F = lambda      → F&& = lambda&&   (rvalue)
    WorkTask task2(some_function);     // F = func ptr    → F&& = func ptr&  (lvalue)
    WorkTask task3(std::move(myFunc)); // F = std::function → F&& = rvalue
    ```

    std::forward\<F\>(f)

    Giữ nguyên "tính chất" của argument khi truyền vào execute_func:

    ```
    // Nếu f là rvalue → move vào execute_func (không copy)
    // Nếu f là lvalue → copy vào execute_func
    ```

    b. `WorkerThread` cái này mục đích sử dụng kỹ thuật RAII để quản lý vòng đời của thread.

    Nó giúp nó tự động dọn dẹp sau khi hoàn thành. Đồng thời bao gồm thông tin về trạng thái của thread.
    Nó cũng được thiết kế để không thể copy và gán trực tiếp, chỉ có thể move.


    ```cpp
    class WorkerThread {

    public:
        enum class ThreadStatus : int { Idle, Waiting, Processing };
    public:
        explicit WorkerThread(std::thread t_in) : t(std::move(t_in)) {
            if (!t.joinable())
                throw std::logic_error("No thread!");
        }

        ~WorkerThread() {
            if (t.joinable())
                t.join();
        }

        WorkerThread(WorkerThread&& other) noexcept
            : t(std::move(other.t)),
            status(other.status.load())
        {
        }

        WorkerThread(const WorkerThread&) = delete;
        WorkerThread& operator=(const WorkerThread&) = delete;

    public:
        std::thread t;
        std::atomic<ThreadStatus> status{ ThreadStatus::Idle };
    };

    ```

    ```cpp
    class IThreadPools
    {
    public:
        IThreadPools() {}
        IThreadPools(const unsigned int nThreads){
            InitThread(nThreads);
        }
        virtual ~IThreadPools() = default;
        virtual void WorkThread() = 0;

    public:
        virtual bool InitThread(const unsigned int nThreads)
        {
            for (auto i = 0ul; i < nThreads; i++)
            {
                WorkerThread wt(std::thread(&IThreadPools::WorkThread, this));
                m_workthreads.push_back(std::move(wt));
            }

            return true;
        }

    protected:
        std::mutex m_mtxTask;
        std::vector<WorkerThread> m_workthreads;
        std::condition_variable m_condition;
        std::atomic_bool m_bDone = false;
    };

    class ThreadPools : public IThreadPools
    {
    protected:
        void WorkThread() override
        {
            while (!m_bDone)
            {
                WorkTask task;
                {
                    std::unique_lock<std::mutex> lock(m_mtxTask);
                    m_condition.wait(lock, [this] { return m_bDone || !m_tasks.empty(); });

                    if (m_bDone)
                        break;

                    task = std::move(m_tasks.front());

                    m_tasks.pop();
                }

                if (task.IsValid())
                    task();
            }

            while (!m_tasks.empty())
                m_tasks.pop();
        }

    public:
        void Submit(WorkTask&& worktask)
        {
            {
                std::unique_lock<std::mutex> lock(m_mtxTask);
                m_tasks.push(std::move(worktask));
            }
            m_condition.notify_one();
        }

    public:
        ThreadPools(): IThreadPools()
        {
            const unsigned int cores = std::thread::hardware_concurrency();
            IThreadPools::InitThread(cores);
        }

        ~ThreadPools()
        {
            CleanThread();
        }

        virtual void CleanThread()
        {
            m_bDone = true;
            m_condition.notify_all();
        }

    protected:
        std::queue<WorkTask> m_tasks;
    };
    ```

1. SeqThreadPools <a id="seqthreadpools"></a>

    `SeqThreadPools` có hỗ trợ thực hiện các task theo trình tự. Có hỗ trợ chờ đến khi thread thực hiện xong.

    Thiết kế của class này phức tạp hơn so với `ThreadPools` đã trình bày trước đó. Các thread sẽ quản lý các task riêng.
    Không sử dung chung queue task như ở trên nữa. Điều này giúp chúng có tính độc lập.

    ```cpp
    class SeqThreadPools : public IThreadPools
    {
        struct WorkerThreadData
        {
            std::mutex mtx;
            std::condition_variable cv;
            std::condition_variable cvDone;

            std::atomic_size_t pendingTasks{ 0 };
            std::atomic_bool bBlocked{ false };

            std::queue<WorkTask> tasks;
        };

        WorkerThreadData* GetThreadData(std::thread::id thread_id) const
        {
            WorkerThreadData* pThreadData = nullptr;

            auto itFound = m_thread_tasks.find(thread_id);

            if (itFound != m_thread_tasks.end())
                pThreadData = itFound->second.get();

            return pThreadData;
        }

    public:
        SeqThreadPools() : IThreadPools()
        {
            const unsigned int cores = std::thread::hardware_concurrency();
            IThreadPools::InitThread(cores);

            for (auto& thread : m_workthreads)
            {
                m_thread_tasks.emplace(thread.t.get_id(), std::make_unique<WorkerThreadData>());
            }
        }

        ~SeqThreadPools()
        {
            CleanThread();
        }

        virtual void CleanThread()
        {
            m_bDone = true;

            for (auto& thread_data : m_thread_tasks)
            {
                thread_data.second->cv.notify_all();
            }
        }

        void WorkThread() override
        {
            std::thread::id cur_thread_id = std::this_thread::get_id();

            WorkerThread* p_cur_thread = nullptr;

            for (auto& thread : m_workthreads)
            {
                if (thread.t.get_id() == cur_thread_id)
                    p_cur_thread = &thread;
            }

            if (!p_cur_thread)
                return;

            WorkerThreadData* pThreadData = GetThreadData(cur_thread_id);

            if (!pThreadData)
                return;

            while (!m_bDone)
            {
                WorkTask task;
                {
                    std::unique_lock<std::mutex> lock(pThreadData->mtx);

                    p_cur_thread->status.store(WorkerThread::ThreadStatus::Idle, std::memory_order_relaxed);
                    pThreadData->cv.wait(lock, [&pThreadData, this]
                        { return m_bDone || !pThreadData->tasks.empty(); });

                    if (m_bDone)
                        break;

                    task = std::move(pThreadData->tasks.front());

                    pThreadData->tasks.pop();
                }

                p_cur_thread->status.store(WorkerThread::ThreadStatus::Processing, std::memory_order_relaxed);

                if (task.IsValid())
                    task();

                {
                    std::unique_lock<std::mutex> lock(pThreadData->mtx);
                    pThreadData->pendingTasks--;

                    if (pThreadData->pendingTasks == 0)
                        pThreadData->cvDone.notify_all();
                }
            }

            while (!pThreadData->tasks.empty())
                pThreadData->tasks.pop();
            pThreadData->pendingTasks = 0;

            pThreadData->cvDone.notify_all();
        }

    public:

        std::thread::id Submit(WorkTask&& worktask)
        {
            auto thread_id = IdleThread();

            return Submit(thread_id, std::move(worktask));
        }

        std::thread::id Submit(std::thread::id thread_id, WorkTask&& worktask)
        {
            WorkerThreadData* pThreadData = GetThreadData(thread_id);

            if (!pThreadData)
                return std::thread::id();

            {
                std::unique_lock<std::mutex> lock(pThreadData->mtx);

                pThreadData->tasks.push(std::move(worktask));
                pThreadData->pendingTasks++;
                pThreadData->cv.notify_one();
            }

            return thread_id;
        }

        void WaitForDone(std::thread::id thread_id) const
        {
            WorkerThreadData* pThreadData = GetThreadData(thread_id);

            if (!pThreadData)
                return;

            std::unique_lock<std::mutex> lock(pThreadData->mtx);

            pThreadData->cvDone.wait(lock, [&pThreadData, this]
                { return m_bDone || pThreadData->pendingTasks == 0; });
        }

        bool WaitFor(std::thread::id thread_id, unsigned int ms) const
        {
            WorkerThreadData* pThreadData = GetThreadData(thread_id);

            if (!pThreadData)
                return false;

            std::unique_lock<std::mutex> lock(pThreadData->mtx);

            bool bDone = pThreadData->cvDone.wait_for(lock, std::chrono::milliseconds(ms),
                [&pThreadData, this] { return m_bDone || pThreadData->pendingTasks == 0; });

            return bDone;
        }

        std::thread::id IdleThread() const
        {
            // B1. Find an available thread
            for (auto& thread : m_workthreads)
            {
                WorkerThreadData* pThreadData = GetThreadData(thread.t.get_id());

                if (!pThreadData || pThreadData->bBlocked)
                    continue;

                if (pThreadData->pendingTasks.load(std::memory_order_acquire) == 0)
                    return thread.t.get_id();
            }

            // B2. Find a thread with the fewest tasks
            std::thread::id best_id;
            size_t min_tasks = std::numeric_limits<size_t>::max();

            for (auto& thread : m_workthreads)
            {
                WorkerThreadData* pThreadData = GetThreadData(thread.t.get_id());

                if (!pThreadData || pThreadData->bBlocked)
                    continue;

                size_t current_pending = pThreadData->pendingTasks.load(std::memory_order_relaxed);
                if (current_pending < min_tasks)
                {
                    min_tasks = current_pending;
                    best_id = thread.t.get_id();
                }

                if (min_tasks == 0)
                    break;
            }

            return best_id;
        }

    protected:
        std::unordered_map<std::thread::id, std::unique_ptr<WorkerThreadData>> m_thread_tasks;
    };
    ```

## Tham khảo


## Cập nhật

* 2026.04.29 : Create

