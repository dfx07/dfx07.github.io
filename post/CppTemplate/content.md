#  Using Template C++
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2023.12.20 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu 

Giả sử bạn có một khuôn mẫu của nhiều lớp nào đó mà chỉ khác nhau ở dữ liệu sử dụng, và bạn không muốn triển khai nó một cách cụ thể ví nó quá nhàm chán và có khả năng xảy ra vấn đề. Template ra đời giúp chúng ta một phần làm tăng tính tái sử dụng của các đoạn code có tính lặp lại. Nó được đưa vào trong c++11

Template được sử dụng phổ biến trong 2 trường hợp sau:
- Kết hợp với Class
- Kết hợp với Function

Tham số Template chính là đầu vào của template để hình thành -> trường hợp cụ thể.

Hiểu đơn giản khi bạn tiến hành code template và triển khai nó trên một kiểu dữ liệu cụ thể, trình biên dịch sẽ thay nó vào trong template của bạn và tiến hành tạo ra một lớp cụ thể.

Chỉ khi bạn chỉ định (đinh nhĩa) template một cách cụ thể thì class hoặc function đó mới được tạo tương ứng. Nếu bạn không sử dụng ở bất kỳ đâu thì trình biên dịch sẽ bỏ qua nó.

## Nội dung

1. Cách sử dụng typename
	Template class kết hợp typedef.

	```cpp
	template <typename T>
	class Object
	{
		T value;
		T GetValue() { return value;}
	}

	typedef Object<float> ObjectFloat;

	ObjectFloat obj;
	```
	Template function kết hợp định nghĩa tên mới.

	Trình biên dịch có thể tự động nhận dạng lại dữ liệu sử dụng và tạo tương ứng không cần nhất thiết phải chỉ định.

	```cpp
	template <typename T>
	T Add(T value1, T value2)
	{
		return value1 + value2;
	};

	const auto AddInt = Add<int>;

	int main(int argc, char** argv)
	{
		int a = AddInt(1.f, 1);
	}
	```

	* Sử dụng nhiều loại khác trong cùng một hàm hoặc class.

	```cpp
	template <typename R, typename T, typename U>
	R Add(T value1, U value2)
	{
		return static_cast<R>(value1 + value2);
	};

	int main(int argc, char** argv)
	{
		int a = Add<int>(1.f, 1);
	}

	```

	* Ngoài ra ta khi ta muốn loại trừ một vài loại không thể là đầu vào của class.
	
	Sử dụng ```std::enable_if``` hoặc ```std::enable_if_t``` của template cung cấp

	Ví dụ: Trong hàm ```Add``` trên khi ta không muốn đầu vào là loại ```float``` ta sẽ loại bỏ nó.
	``` cpp
	template <typename T, std::enable_if_t<std::is_floating_point_v<T>>* = nullptr>

	template<typename T, typename std::enable_if<std::is_same<int, T>::value>::type* = nullptr>
	template<typename T, std::enable_if_t<std::is_same<int, T>::value>* = nullptr>
	```

	Hơn nữa ta có thể viết ngắn gọn biểu thứ thành một bí danh ```using``` ngắn gọn hơn như sau:
	``` cpp
	template <typename T>
	using Enable_Float = std::enable_if_t<std::is_floating_point_v<T>>;

	template <typename T, Enable_Float<T>* = nullptr>
	T Add(T value1, T value2)
	{
		return static_cast<T>(value1 + value2);
	};

	```

	* Tham số mặc định của template param.
	``` cpp
	template <typename R, typename T, typename U = int>
	R Add(T value1, U value2)
	{
		return static_cast<R>(value1 + value2);
	};
	```

1. Template xử lý riêng cho từng loại dữ liệu

	Trong một số trường hợp đặt biệt hàm cần xử lý riêng cho từng loại dữ liệu thì ta có thể sử dụng toán tử so sánh dữ liệu.

	Ví dụ bên dưới xử lý riêng biệt cho các trường hợp dữ liệu ```int``` và ```float```.

	``` cpp
	template <typename T>
	T Add(T value1, T value2)
	{
		if (std::is_same_v<int, T> == true)
		{
			return static_cast<T>(value1 + value2);
		}
		else if (std::is_same_v<float, T> == true)
		{
			return static_cast<T>(value1 + value2 + 2.f);
		}
	}

	int main(int argc, char** argv)
	{
		float a = Add(1.f, 1.f); // = 4.f
	}
	```

1. Template có thể chỉ định loại kết quả trả về của hàm <a id="section3"></a>

	Ví dụ bên dưới nếu typename thuộc loại integral thì giá trị của hàm trả về là bool.

	``` cpp
	template<typename T>
	typename std::enable_if_t<std::is_integral_v<T>, bool>
	fun_2(T c)
	{
		return true;
	}
	```

	Ngoài ra ta có thể sử dụng lại auto thay thế.

	``` cpp
	template<typename T, std::enable_if_t<std::is_integral_v<T>>* = nullptr>
	auto fun_2(T c)
	{
		return true;
	}
	```

## Tham khảo

+ [https://en.cppreference.com/w/cpp/language/templates](https://en.cppreference.com/w/cpp/language/templates)
+ [https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022](https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022)

## Cập nhật

* 2024.05.08 : Template có thể chỉ định loại kết quả trả về của hàm *[#](#section3)*

<br/>
