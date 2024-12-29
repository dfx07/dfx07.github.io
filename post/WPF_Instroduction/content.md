#  WPF instroduction
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2024.12.29 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu 

WPF (Windows Presentation Foundation) là một framework phát triển ứng dụng giao diện người dùng (UI) cho Windows, được giới thiệu bởi Microsoft. Nó là một phần của .NET Framework và hiện nay có sẵn trong .NET Core và .NET 5 trở đi. WPF cho phép tạo ra các ứng dụng Windows có giao diện người dùng phong phú, tương tác cao, và hỗ trợ đồ họa, hoạt ảnh, và các hiệu ứng trực quan mạnh mẽ.

**Các đặc điểm nổi bật của WPF:**
- XAML (Extensible Application Markup Language): WPF sử dụng XAML để định nghĩa giao diện người dùng. Đây là một ngôn ngữ đánh dấu giúp tách biệt giữa giao diện người dùng và logic ứng dụng.

- Data Binding: WPF hỗ trợ mạnh mẽ việc liên kết dữ liệu giữa các thành phần UI và đối tượng dữ liệu trong mã C#.

- Chế độ đồ họa vector: WPF sử dụng đồ họa vector (vector graphics), giúp tạo ra các hình ảnh rõ nét ở mọi độ phân giải mà không bị mờ hay vỡ hình.

- Styles & Templates: WPF cho phép tùy chỉnh giao diện UI thông qua styles và templates, giúp thay đổi ngoại hình của các điều khiển mà không thay đổi logic bên trong.

- Animation & Media: WPF hỗ trợ dễ dàng tạo hoạt ảnh (animations), phát video, âm thanh và các hiệu ứng đa phương tiện.

- Đa nền tảng: Mặc dù WPF chủ yếu được thiết kế cho Windows, nhưng với .NET Core và các công nghệ mới, WPF cũng đang phát triển hướng đến khả năng chạy trên nhiều nền tảng.


## Nội dung
---
1. **Cấu trúc một ứng dụng WPF**

	Cấu trúc của một ứng dụng WPF, bao gồm MainWindow.xaml, MainWindow.xaml.cs, và các thư viện hỗ trợ.

	Mô hình MVVM, một cách tiếp cận phổ biến trong WPF để tổ chức mã và tạo ứng dụng dễ bảo trì.

	Quá trình khởi tạo của một app WPF:

	* B1. Khởi tạo đối tượng Application

		> Khi ứng dụng WPF bắt đầu, đối tượng Application được tạo và phương thức Run() được gọi. Đối tượng Application quản lý vòng đời của ứng dụng và là nơi xử lý các sự kiện toàn cục như Startup, Exit, và UnhandledException.

	* B2. Khởi tạo MainWindow

		> Đây là cửa sổ chính của ứng dụng, nơi giao diện người dùng được định nghĩa. Tệp này chứa mã XAML định nghĩa giao diện của cửa sổ.

	* B3. Chạy ứng dụng (UI Thread)

		> Sau khi MainWindow được khởi tạo, ứng dụng bắt đầu chạy trên UI thread. Đây là luồng chính xử lý các sự kiện và render giao diện người dùng.

	* B4. Khởi tạo MainWindow.xaml.cs (Code-behind)

		> Khi cửa sổ MainWindow được hiển thị, mã code-behind (MainWindow.xaml.cs) sẽ được tải và khởi tạo. Trong tệp này, bạn sẽ viết mã xử lý các sự kiện UI, tương tác với dữ liệu, và các logic của ứng dụng.

	* B5. Binding và Tạo Dữ liệu

		> Khi giao diện người dùng đã sẵn sàng, bạn có thể kết nối các điều khiển UI với dữ liệu thông qua Binding. Điều này giúp tự động cập nhật giao diện khi dữ liệu thay đổi mà không cần viết mã thêm.




## Tham khảo
* [https://en.cppreference.com/w/cpp/language/variadic_arguments](https://en.cppreference.com/w/cpp/language/variadic_arguments)

##### Cập nhật

- 2024.12.29 : Create
