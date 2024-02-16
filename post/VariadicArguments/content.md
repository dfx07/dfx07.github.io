#  Variadic arguments C++
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2024.01.29 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu 

Bài toán đặt ra là khi chúng ta có một hàm và cần truyền vào số lượng tham số không cố định.

Ví dụ:
```Cpp
void AddTypeFilter(ShapeType _type)
{
	m_vecShapeType.push_back(_type);
}
void AddTypeFilter(ShapeType _type, ShapeType _type2)
{
	m_vecShapeType.push_back(_type);
	m_vecShapeType.push_back(_type2);
}
void AddTypeFilter(ShapeType _type, ShapeType _type2, ShapeType _type3)
{
	m_vecShapeType.push_back(_type);
	m_vecShapeType.push_back(_type2);
	m_vecShapeType.push_back(_type3);
}
***
```
Vấn đề là khi ta cần truyền vào 5 hoặc 10 tham số ta cần viết thêm hàm này với 5 và mười tham số tương tứng. Điều này là mất công và tăng rủi ro.

Vấn đề này gọi là `Variadic arguments`.

Nó giúp chúng ta không cần viết nhiều hàm giống nhau chỉ khác nhau ở số lượng tham số truyền vào:

Có 3 cách tiếp cận:
* Sử dụng tham số truyền vào dạng cấu trúc hoặc mảng
* Sử dụng template 
* Sử dụng varlist được hỗ trợ


</br><!--Section-->

## Nội dung

##### 1. Sử dụng template

Sử dụng teamplate được hỗ trợ bởi C++ để giúp ta giải quyết. Chúng ta không cần code nhiều hàm mà chỉ sử dụng một mẫu duy nhất.

Ví dụ :

``` cpp
void AddTypeFilter(ShapeType _type)
{
	m_vecShapeType.push_back(_type);
}

// function only enable with shapetype
template <typename... Types, std::enable_if_t<std::is_same<ShapeType, Types...>::value>* = nullptr>
void AddTypeFilter(ShapeType _type, Types&&... _types)
{
	m_vecShapeType.push_back(_type);
	AddTypeFilter(_types...);
}

// use 
AddTypeFilter(ShapeType::RECTANGLE, ShapeType::LINE);
```

**Giải thích** : Khi ta truyền vào hàm ```AddTypeFilter``` nó sẽ được gọi đệ quy và kết thúc việc gọi thì hàm ```AddTypeFilter(ShapeType _type)``` sẽ được gọi.

##### 2. Sử dụng tham số truyền vào dạng cấu trúc hoặc mảng

Thay vì sử dụng các hàm riêng biệt ta sẽ nhóm các tham số và một dạng cấu trúc hoặc mảng để truyền.

Với bài toán bên trên ta sẽ nhóm tất các các `ShapeType` là dạng `std::vector` từ đó truyền nó vào. 

Ví dụ :

``` cpp
void AddTypeFilter(std::vector<ShapeType>& _vec_type)
{
	m_vecShapeType.insert(m_vecShapeType.end(), _vec_type.begin(), _vec_type.end());
}

// use 
std::vector<ShapeType> vect;
vect.push_back(ShapeType::RECTANGLE);
vect.push_back(ShapeType::LINE);

AddTypeFilter(vect);
```

##### 3. Sử dụng va_list hỗ trợ

Thay vì sử dụng các hàm riêng biệt ta sẽ nhóm các tham số và một dạng cấu trúc hoặc mảng để truyền.

Với bài toán bên trên ta sẽ nhóm tất các các `ShapeType` là dạng `std::vector` từ đó truyền nó vào. 

Ví dụ :

``` cpp
void AddTypeFilter(ShapeType _type...)
{
	std::va_list args;
	va_start(args, _type);

	ShapeType _nexttype = va_arg(args, ShapeType);
	while (_nexttype != ShapeType::END)
	{
		m_vecShapeType.push_back(_nexttype);
		int i = va_arg(args, int);
	}
	va_end(args);
}

// use 
AddTypeFilter(ShapeType::RECTANGLE, ShapeType::LINE, ShapeType::END);
```
**Chú ý** : thư việc yêu cầu `<cstdarg>`

## Tham khảo
* [https://en.cppreference.com/w/cpp/language/variadic_arguments](https://en.cppreference.com/w/cpp/language/variadic_arguments)

</br><!--Section-->

##### Cập nhật

- 2024.01.29 : Create
