#  Cpp Habits
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2024.05.01 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu

Trong bài viết này sẽ trình bày các thói quen lập trình và sử dụng kết hợp các tính năng của C++ một cách hiệu quả :

- Giảm thiểu sai lầm trong lập trình.
- Cải thiện tính hiệu quả của các đoạn code.

## Nội dung

##### 1. Con trỏ thông minh (Smart pointer)
---

1. Các cách khai báo con trỏ thông minh `std::unique_ptr` với hàm hủy custom.

	```cpp
	1.
	std::unique_ptr<CURL, void(*)(CURL*)> pCurl {curl_easy_init(), curl_easy_cleanup};

	std::unique_ptr pCurl = std::unique_ptr<CURL, void(*)(CURL*)>(curl_easy_init(), curl_easy_cleanup);

	2.
	std::unique_ptr<CURL, std::function<void(CURL*)>> curlp{curl_easy_init(), [](CURL* handle){curl_easy_cleanup(handle);}};
	auto curlp = std::unique_ptr<FILE, decltype(deleter_file)>(file, deleter_file);

	3.
	struct curl_easy_cleanup {
		void operator() ( CURL* handle ) {
			return curl_easy_delete( handle );
		}
	};

	using curl_easy_pointer = std::unqiue_ptr<CURL,curl_easy_deleter>;

	std::unique_ptr<CURL, decltype(&curl_easy_deleter)> curlp{curl_easy_init(), &curl_easy_deleter};
	```
</br>

2. Quản lý dữ liệu thô được cấp phát theo phong cách C và sử dụng trong hàm ta có thể sử dụng `smartpointer` thay thế.

	```cpp
	char* read_from_file(const char* filename)
	{
		return new char[1000];
	}

	void example()
	{
		// C1.
		auto deleter_ptr = [](void* ptr) {
			delete[] ptr;
		};
		auto spfile_data = std::unique_ptr<char, decltype(deleter_ptr)>(read_from_file("test.data"), deleter_ptr);

		// C2. 
		auto spfile_data = std::unique_ptr<char, void(*)(char* )>(read_from_file("test.data"), [](void* ptr) {
			delete[] ptr;
		});
	}
	```
</br>

3. Tạo con trỏ smartpointer giữa `unique_ptr` và `share_ptr` sử dụng custom deleter cũng có sự khác biệt. Hãy xem ví dụ bên dưới.

	```cpp
	std::unique_ptr<int, std::function<void(void*)>> ptr(new int[10], [](void* ptr) { delete[] ptr; });
	std::shared_ptr<int> ptr(new int[10], [](void* ptr) { delete[] ptr; });
	```

</br>

4. Tự động thực hiện hoặc xử lý trả về khi kết thúc hàm.

	Nhiều khi ta muốn thực một hành động nào đó khi hàm được thực thi xong. Nhưng rất khó để control hết vì có thể nó được return trước đó.

	Để giải quyết vấn đề này, ý tưởng được đưa ra là sử dụng con trỏ thông minh (phạm vi trong hàm). Khi này ta chỉ cần custom lại hàm hủy của nó.

	```cpp
	void funAutoClean(int _c)
	{
		int pA = new int[10];

		bool __bEnd__ = false;
		auto __pAutoCall__ = std::unique_ptr<bool, void(*)(bool *) >(&__bEnd__, [](bool* ptr)
			{
				delete[] pA;
			});

		if(_c == 4)
			return 2;

		pA[1] = 100;
		return pA[1] + _c;
	}

	```

	Trong hàm trên ta có thể thấy rằng : Dù có return ở vị trí nào đi nữa thì giá trị của `pA` vẫn luôn được dọn dẹp khi kết thúc hàm.
	Nhưng cần chú ý về giá trị trả về.
	

## Tham khảo

+ [https://en.cppreference.com/w/cpp/language/templates](https://en.cppreference.com/w/cpp/language/templates)
+ [https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022](https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022)

</br><!------------------------------------------------------ Section ------------------------------------------------------>

## Cập nhật

* 2024.05.01 : Tạo lần đầu. 
* 2025.02.03 : Cập nhật con trỏ thông minh (tự động dọn dẹp khi trả về).