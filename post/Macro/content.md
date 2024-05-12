#  Macro C++
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2024.03.30 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu 

Giới thiệu về macros và một số ví dụ thực tế

```
Ta sử dụng macros cho các đoạn code trở lên ngắn gọn và dễ hiểu. Nó được xử lý bởi trình biên dịch.

Đơn giản là trình biên dịch sẽ thay thế các đoạn macro tương ứng thành các đoạn code. Từ đó tiến hành biên dịch chúng



</br><!--Section-->

## Nội dung

##### 1. Bài toán một macro cho nhiều function
---

Ta muốn sử dụng một macro nhưng với các function khác nhau ta có thể làm theo cách dưới

Ví dụ :

``` cpp
#define Initx1(a) a
#define Initx2(a) {a,a}
#define Initx3(a) {a,a,a}
#define Initx4(a) {a,a,a,a}

#define __InitxN(a,b) Initx ## a (b)

#define	_InitxN(a,b) __InitxN(a,b)

#define	InitxN(a) _InitxN(_PCN,a)
```

**Giải thích** : Khi ta truyền vào hàm ```AddTypeFilter``` nó sẽ được gọi đệ quy và kết thúc việc gọi thì hàm ```AddTypeFilter(ShapeType _type)``` sẽ được gọi.

##### 2. Sử dụng tham số truyền vào dạng cấu trúc hoặc mảng
---

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
---

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

##### Cập nhật

- 2024.01.29 : Create
