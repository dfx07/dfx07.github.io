#  Git overview and commands
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2023.12.27 by <a href="#">thuong.nv</a>
</p>

## Tổng quan

Giới thiệu tổng quan về Git và các lệnh hay được sử dụng trong thực tế (hữu ích). Ngoài ra chúng ta có thể sử dụng tool hỗ trợ git bên dưới chúng vẫn được cập nhật thường xuyên :

**tortoisegit** : [https://tortoisegit.org/](https://tortoisegit.org/)

**sourcetree** : [https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)

</br><!--Section-->

## Tham khảo

+ [https://git-scm.com/docs/git#_git_commands](https://git-scm.com/docs/git#_git_commands)
+ [https://en.wikipedia.org/wiki/Git](https://en.wikipedia.org/wiki/Git)
+ [https://docs.gitlab.com/ee/topics/git/](https://docs.gitlab.com/ee/topics/git/)

</br><!--Section-->

## Nội dung

##### <b> Giới thiệu về Git </b>

Git is a free and open source distributed version control system. It handles projects of all sizes quickly and efficiently, while providing support for rolling back changes when needed.

##### </br><b> Các lệnh hay sử dụng </b>

1. <b>Branch</b> <a id="branch"></a>

    Tạo branch:
    ```bash
    git checkout -b feature/thuong.nv/A
    ```

    Ngoài ra chúng ta có thể set nó với một brach trên remote như sau: 
    ```bash
    git checkout -b feature/thuong.nv origin/feature/thuong.nv
    ```
    Thường thì một nhánh trên remote sẽ tương ứng với một nhánh ở local.

    Xóa một nhánh trên local.

    ```sh
    git branch -D feature/thuong.n
    ```

    Xóa một nhánh chỉ định trên remote.

    ```sh
    git push -D origin feature/thuong.nv
    ```

    Xóa các file không được theo dõi:
    ```
    git clean -fxd
    ```

    Hồi phục các file như trước khi sửa đổi. Hãy cẩn thận không là công cốc
    ```
    git restore .
    ```

    Hiển thị toàn bộ branch có tên chứa bugfix > cho nó ra một file ```branch_delete.log```.
    ```
    git branch | grep.exe bugfix > branch_delete.log
    ```

    Xóa toàn bộ brach từ file:
    ```sh
    xargs.exe -a ranch_delete.log git branch -D
    ```

1. <b>Full</b> <a id="full"></a>

    Lấy dữ liệu từ remote và merge vào local. bao gồm nhánh mới và cập nhật vị trí.

    ```bash
    git full --all
    ```

    Chỉ định một nhánh cụ thể.

    VD : lấy thông tin về nhánh ```feature/thuong.nv``` từ remote reps

    ```bash
    git pull origin feature/thuong.nv
    ```

    Nếu tiến hành ```pull``` từ một nhánh không cùng nhánh không cùng ref thì tương đương với lệnh merge.

    VD: đang ở nhánh master và pull nhánh feature/thuong.nv vào thì tương đương merge : ```feature/thuong.nv``` -> ```master```

    ```sh
    git pull origin feature/thuong.nv
    ```

1. <b>Cherry-pick</b> <a id="cherry-pick"></a>

    Trong một vài trường hợp ta chỉ chọn một vài commit để di chuyển chúng qua lại giữa các nhánh. Hoặc merge không hết tất cả commit. 

    Mỗi lần ```cherry-pick``` sẽ tạo ra các hash khác nhau hay là một commit khác.


    VD: ta có hash từ nhánh ```feature/thuong.nv``` là ```af091a72e124c``` và muốn merge nó sang nhánh ```master```.

    ```bash
    git checkout master
    git cherry-pick af091a72e124c
    ```

    Lệnh này khá hữu ích trong việc merge branch mà có quá nhiều khác biệt.

    Nếu có conflic trong quá trình pick thì ta tiến hành ```resovle``` và sau khi resovle xong ta tiếng hành pick tiếp tục :
    ```sh
    git cherry-pick --continue
    ```

    Nếu muốn ngừng pick :
    ```sh
    git cherry-pick --about
    ```

1. <b>Commit</b> <a id="commit"></a>
    
    Đổi tên một commit gần nhất:

    ```sh
    git commit --amend
    ```
    
    Đổi tên một commit đã cũ hơn:
    ```sh
    git rebase -i HEAD~<n> // commit thứ n từ vị trí hiện tại
    ```

    * Editer xuất hiện thì -> Edit reword vào commit cần chuyển
    * Đổi message thích và đóng editer

    Trong trường hợp muốn đẩy nó lên remote cần cân nhắc bằng lệnh:

    ```sh
    git push origin feature/thuong.nv -f
    ```

1. <b>Fetch</b> <a id="fetch"></a>

    Đầu vào có thể là vị trí của bit được set hoặc giá trị

    Lấy hết toàn bộ thông tin nhánh trên remote về.
    ```bash
    git fetch --all
    ```

    Chỉ định một nhánh cụ thể.

    VD : lấy thông tin về nhánh ```feature/thuong.nv``` từ remote reps

    ```bash
    git fetch origin feature/thuong.nv
    ```

1. <b>Stash</b> <a id="stash"></a>

    Lệnh này mục đích giúp ta lưu trữ lại nhưng thây đổi và có thể sử dung nó.
    cơ chế của nó hoạt động giống stack.

    ```sh
    git stash push
    ```

    Mặc định lệnh stash là : lấy thay đổi cuối cùng ra vào working tree
    ```
    git stash pop 
    ```
    Vì thế cần cẩn thận nếu bạn chỉ sử dụng ```git stash``` nó hiểu và đẩy top stash ra vì thế những thay đổi hiện tại sẽ mất =((.

    Để xóa một state trong stash list:
    ```sh
    git stash drop
    ```

1. <b>Submodule</b> <a id="submodule"></a>

    Một vài lệnh liên qua đến submodule

    Cập nhật submodule nếu lần đầu thì khởi tạo nó.

    ```sh
    git submodule update --init

    Nếu: update link trong file .gitmodules
    [*] Cần sử dụng lệnh dưới trước khi sử dụng lệnh trên
    git submodule update sync --recursive
    ```

    Trong trường hợp không sử dụng được submodule hay clean chúng và tạo lại

    ```sh
    git submodule deinit --all -f
    git submodule init
    git submodule update --recursive
    ```

    Cần checkout các submodule con thay đổi theo cha

    ```
    git submodule foreach --recursive git checkout -f
    ```

    Xóa toàn bộ những file không cần thiết trong submodule
    ```
    git submodule foreach --recursive git clean -fxd
    ```

