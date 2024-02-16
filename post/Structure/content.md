#  Data Structure
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2024.02.16 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu

Bài viết giới thiệu các loại cấu trúc dữ liệu hay sử dụng.
* [Buffer](#buffer)

## Nội dung

##### Buffer
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


## Tham khảo

+ [https://en.wikipedia.org/wiki/Bitwise_operation](https://en.wikipedia.org/wiki/Bitwise_operation)
+ [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

##### Cập nhật

- 2024.02.16 : Create
