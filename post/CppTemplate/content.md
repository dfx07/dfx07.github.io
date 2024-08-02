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

Tham số Template chính là đầu vào để hình thành -> trường hợp cụ thể. Hiểu đơn giản khi bạn tiến hành code template và triển khai nó trên một kiểu dữ liệu cụ thể, trình biên dịch sẽ thay nó vào trong template của bạn và tiến hành tạo ra một lớp cụ thể.

Chỉ khi bạn chỉ định (đinh nhĩa) template một cách cụ thể thì class hoặc function đó mới được tạo tương ứng. Nếu bạn không sử dụng ở bất kỳ đâu thì trình biên dịch sẽ bỏ qua nó.

## Nội dung

1. Cách dụng cơ bản <a id="section1"></a>

	Template cho một class
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
	Template cho function kết hợp định nghĩa tên mới.

	Trình biên dịch có thể tự động nhận dạng loại dữ liệu sử dụng và tạo tương ứng không cần nhất thiết phải chỉ định.

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

1. Sử dụng nhiều loại khác trong cùng một hàm hoặc class. <a id="section2"></a>

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

1. Định nghĩa __std::enable_if__ và __std::enable_if_t__ <a id="section3"></a>

	```std::enable_if``` và ```std::enable_if_t``` đều là  chức năng tiện ích kiểm tra điều kiện trong template class.
	
	`std::enable_if_t` là viết tắt của `std::enable_if::type`

	Xem chi tiết tại đây : [https://en.cppreference.com/w/cpp/types/enable_if](https://en.cppreference.com/w/cpp/types/enable_if)

	```cpp
	std::enable_if<{condition, type}>::type
	<=>
	std::enable_if_t<{condition, type}>
	```

	với condition cũng tương tự ta thường lấy value (true/false) nên nhiều khi ta sẽ có thể thay thế nó như ví dụ bên dưới:
	```cpp
	std::is_same<{type1, type2}>::value
	<=>
	std::is_same_v<{type1, type2}>
	```

1. Loại trừ một vài loại không thể là đầu vào của class. <a id="section4"></a>
	
	Ví dụ: Trong hàm ```Add``` trên khi ta không muốn đầu vào là loại ```float``` ta sẽ loại bỏ nó.
	``` cpp
	template<typename T, std::enable_if_t<std::is_floating_point_v<T>>* = nullptr>
	template<typename T, typename std::enable_if<std::is_same<int, T>::value>::type* = nullptr>
	template<typename T, std::enable_if_t<std::is_same<int, T>::value>* = nullptr>
	```

	Ta có một vài chú ý các cách sử dụng `enable_if` là tương đương VD:
	```cpp
	template<typename T, typename std::enable_if<std::is_same<int, T>::value>::type* = nullptr>
	<=>
	template<typename T, typename std::enable_if_t<std::is_same_v<int, T>>* = nullptr>
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

1. Tham số mặc định của template param. <a id="section5"></a>
	``` cpp
	template <typename R, typename T, typename U = int>
	R Add(T value1, U value2)
	{
		return static_cast<R>(value1 + value2);
	};
	```

1. Template xử lý riêng cho từng loại dữ liệu <a id="section6"></a>

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

1. Template chỉ định loại kết quả trả về của hàm <a id="section7"></a>

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

1. Định nghĩa hàm sử dụng tùy thuộc vào loại dữ liệu của template<a id="section8"></a>

	Ví dụ dưới bạn sẽ thấy với loại là `_XYZ` thì hàm khởi tạo là hàm đầu tiên và biến : x, y, z.

	Nhưng với loại đầu vào là `_RGB` thì hàm khởi tạo là hàm thứ 2 biến : r, g, b.

	Trong C++17 có thể sử dụng `if constexpr` để thay cho `std::enable_if`

	``` cpp

	////////////////////////////////////////////////////////////////////////////////
	/******************************************************************************/
	//.Tag3

	struct _XYZ;
	struct _RGB;

	template<typename T, typename N>
	struct _t3Trait;

	template<typename T>
	struct _t3Trait<T, _XYZ> {
		T x, y, z;
	};

	template<typename T>
	struct _t3Trait<T, _RGB> {
		T r, g, b;
	};

	template<typename T, typename N>
	struct tag3 : public _t3Trait<T, N> {
		template< typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _XYZ>, bool > = true >
		tag3()
		{
			value.x = static_cast<T>(0);
			value.y = static_cast<T>(0);
			value.z = static_cast<T>(0);
		}

		template< typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _RGB>, bool > = true >
		tag3() {
			value.r = static_cast<T>(0);
			value.g = static_cast<T>(0);
			value.b = static_cast<T>(0);
		}

		template <typename U, typename V, typename K, typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _XYZ>, bool > = true >
		tag3(const U& _u, const V& _v, const K& _k)
		{
			value.x = static_cast<T>(_u);
			value.y = static_cast<T>(_v);
			value.z = static_cast<T>(_k);
		}

		template <typename U, typename V, typename K, typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _RGB>, bool > = true >
			tag3(const U& _u, const V& _v, const K& _k)
		{
			value.r = static_cast<T>(_u);
			value.g = static_cast<T>(_v);
			value.b = static_cast<T>(_k);
		}
	};

	////////////////////////////////////////////////////////////////////////////////
	/******************************************************************************/
	//.Tag2

	struct _XY;
	struct _UV;

	template<typename T, typename N>
	struct _t2Trait;

	template<typename T>
	struct _t2Trait<T, _XY> {
		T x, y;
	};

	template<typename T>
	struct _t2Trait<T, _UV> {
		T u, v;
	};

	template<typename T, typename N>
	struct tag2 : public _t2Trait<T, N> {
		template< typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _XY>, bool > = true >
			tag2()
		{
			value.x = static_cast<T>(0);
			value.y = static_cast<T>(0);
		}

		template< typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _UV>, bool > = true >
			tag2() {
			value.u = static_cast<T>(0);
			value.v = static_cast<T>(0);
		}

		template <typename U, typename V, typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _XY>, bool > = true >
			tag2(const U& _u, const V& _v)
		{
			value.x = static_cast<T>(_u);
			value.y = static_cast<T>(_v);
		}

		template <typename U, typename V, typename _N = N,
			typename  std::enable_if_t< std::is_same_v<_N, _UV>, bool > = true >
			tag2(const U& _u, const V& _v)
		{
			value.u = static_cast<T>(_u);
			value.v = static_cast<T>(_v);
		}
	};
	```

## Tham khảo

+ [https://en.cppreference.com/w/cpp/language/templates](https://en.cppreference.com/w/cpp/language/templates)
+ [https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022](https://learn.microsoft.com/en-us/visualstudio/debugger/format-specifiers-in-cpp?view=vs-2022)

## Cập nhật

* 2024.05.08 : Template chỉ định loại kết quả trả về của hàm *[#](#section7)*
* 2024.08.01 : Định nghĩa hàm sử dụng tùy thuộc vào loại dữ liệu của template *[#](#section8)*

<br/>
