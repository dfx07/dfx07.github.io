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

1. Sử dụng con trỏ thông minh<a id="poly2tri"></a>

	* Các cách khai báo con trỏ thông minh `std::unique_ptr` với hàm hủy custom.

	```cpp
	1.
	std::unique_ptr<CURL, void(*)(CURL*)> curlp {curl_easy_init(), curl_easy_cleanup};

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

	* Quản lý dữ liệu thô được cấp phát theo phong cách C và sử dụng trong hàm ta có thể sử dụng `smartpointer` thay thế.

	```cpp
	char* read_from_file(const char* filename)
	{
		return new char[1000];
	}

	void example()
	{
		auto deleter_ptr = [](void* ptr) {
			delete[] ptr;
		};

		auto spfile_data = std::unique_ptr<char, decltype(deleter_ptr)>(read_from_file("test.data"), deleter_ptr);
	}
	```
	</br>

	* Tạo con trỏ smartpointer giữa `unique_ptr` và `share_ptr` sử dụng custom deleter cũng có sự khác biệt. Hãy xem ví dụ bên dưới.

	```cpp
	std::unique_ptr<int, std::function<void(void*)>> ptr(new int[10], [](void* ptr) { delete[] ptr; });
	std::shared_ptr<int> ptr(new int[10], [](void* ptr) { delete[] ptr; });
	```

	

## Tham khảo

+ [https://en.cppreference.com/w/cpp/language/templates](https://en.cppreference.com/w/cpp/language/templates)
+ [https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022](https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022)

</br><!------------------------------------------------------ Section ------------------------------------------------------>

## Cập nhật