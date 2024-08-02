#  Data Structure
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2024.02.16 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu

Bài viết giới thiệu các loại cấu trúc dữ liệu hay sử dụng.
* [Buffer](#section1)
* [Vector](#section2)

## Nội dung

##### Buffer <a id="section1"></a>
---

Trong C++ có một cấu trúc dữ liệu rất hay được sử dụng đó là là vector. Tương tự như vậy, phần này sẽ trình bày một loại dữ liệu cấu trúc giống vector được gọi là `buffer`. Nguyên lý hoạt động tương tự như vector trong thư viên tiêu chuẩn.

> Cần cẩn trọng khi sử dụng nó truyền qua lại giữ nhiều tiến trình sử dụng liên kết động.

Cấu trúc được viết có sử dụng window api vì thế trên các hệ thống khác cần thay thế và chỉnh sửa cho phù hợp.

```cpp
class CBuffer
{
public:
	CBuffer() : m_data(nullptr),
		m_size(0), m_capacity(0)
	{
	}

	~CBuffer()
	{
		_delete();
	}

private:
	void _delete()
	{
		if (::GetProcessHeap())
			::HeapFree(::GetProcessHeap(), 0, (void*)m_data);
		else
			::operator delete((void*)m_data);

		m_size = 0;
		m_capacity = 0;
	}

	void free()
	{
		if (m_data)
		{
			ZeroMemory(m_data, m_size);
		}

		m_size = 0;
	}

	size_t alloc(size_t nsize, bool cp = false)
	{
		if (nsize <= m_capacity)
			return nsize;

		BYTE* pOldData = m_data;

		if (::GetProcessHeap())
			m_data = (BYTE*)(::HeapAlloc(::GetProcessHeap(), 0, nsize * sizeof(BYTE)));
		else
			m_data = (BYTE*)(::operator new(nsize * sizeof(BYTE)));

		if (m_data)
			ZeroMemory(m_data, nsize);

		m_capacity = nsize;

		if (cp && pOldData && m_data)
		{
			CopyMemory(m_data, pOldData, m_size);
		}

		::HeapFree(::GetProcessHeap(), 0, (void*)pOldData);

		return nsize;
	}

public:
	void* buffer() const { return m_data; }
	size_t length() const { return m_size; }

	// return maximum number of elements that can be allocated
	size_t max_size() const
	{
		return (std::numeric_limits<std::size_t>::max)() / sizeof(BYTE);
	}

	// appending additional data at the end of its current value
	size_t append(const void* data, const size_t nsize)
	{
		if (nsize == 0)
			return 0;

		size_t nNewSize = alloc(m_size + nsize + 2, true);
		if (0 == nNewSize)
			return 0;

		if (m_data)
			CopyMemory(m_data + m_size, data, nsize);
		m_size += nsize;
		return nsize;
	}

	// set data
	size_t set(const void* data, const size_t nsize)
	{
		if (nsize == 0)
			return 0;

		size_t nNewSize = alloc(nsize + 2, false);
		if (0 == nNewSize)
			return 0;

		CopyMemory(m_data, data, nsize);
		m_size = nsize;
		return nsize;
	}

	// Requests that the data capacity be adapted to a planned change
	void reserve(const size_t nsize)
	{
		if (nsize <= 0)
			return;
		alloc(nsize, false);
	}

	bool empty()
	{
		return m_size <= 0 ? true : false;
	}

	// Erases the data contents not 
	void clear()
	{
		free();
	}

private:
	BYTE*		m_data;
	size_t		m_size;
	size_t		m_capacity;
};
```

**Giải thích :**

Câu lệnh : `m_data = (BYTE*)(::operator new(nsize * sizeof(BYTE)));`

nó khá lạ, tại sao ta không sử dụng `new` mà lại sử dụng `::operator new`.

> `::operator new` là cấp phát bộ nhớ nguyên thủy nó tương tự như `malloc` trong C. Nó sẽ không tiến hành gọi hàm khởi tạo như khi sử dụng `new`. Điều này giúp ta bỏ qua giai đoạn gọi khởi tạo và cũng không cần gọi hàm hủy khi `delete` chúng


##### Vector <a id="section2"></a>
---

Ví dụ bên dưới sử dụng template trong việc xây dựng struct nó có  đối ứng cho nhiều loại không chỉ vector(xyz) mà còn color (rgb). Ngoài ra còn có thể sử dụng `union` thay thế giống như `glm` đã làm.

Nhưng khi sử dụng với cách này sẽ không không nhầm lẫn tên thành phần.

```cpp
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

+ [https://en.wikipedia.org/wiki/Bitwise_operation](https://en.wikipedia.org/wiki/Bitwise_operation)
+ [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

##### Cập nhật

- 2024.02.16 : Create
- 2024.08.02 : Upate Vector struct
