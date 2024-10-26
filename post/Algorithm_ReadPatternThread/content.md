#  Read pattern using multiple thread
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2024.10.26 by <a href="#">thuong.nv</a>
</p>

## Bài toán

Khi đọc file pattern nhiều dữ liệu. Nếu chỉ sử dụng đọc tuần tự thì sẽ mất rất nhiều thời gian. 
Bài toán đặt ra: Cải thiện việc đọc file dữ liệu đầu vào sao cho nhanh mà vẫn đảm bảo kết quả vẫn chính xác nhất.

**Phương pháp**
* Sử dụng nhiều thread cho việc đọc file.
* Sử dụng phương pháp đọc khác nhau nhằm tối ưu thời gian đọc dữ liệu.


Mẫu dữ liệu của file pattern :

```
 636422	21/10/2023	 3	  4.8	 88	 7	 46	 78.	  0.1	  0.1	 75	1019.5	 4	  4.8
 636426	21/10/2023	 3	  4.2	 89	 6	 45	 74.	  0.1	  0.1	 77	1019.8	 4	  4.3
 636444	21/10/2023	 3	  3.9	 89	 6	 44	 61.	  0.1	  0.1	 77	1020.2	 3	  4.0
 636450	21/10/2023	 3	  2.7	 83	 6	 41	 10.	  0.0	  0.0	 74	1020.9	 2	  2.9
```
Mỗi bản ghi gồm 14 trường dữ liệu dạng số hoặc ký tự.

## Kết quả
---

Thông tin máy tính:

```
Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz

Base speed:	2.20 GHz
Sockets:	1
Cores:	2
Logical processors:	4
Virtualization:	Enabled
L1 cache:	128 KB
L2 cache:	512 KB
L3 cache:	3.0 MB

Utilization	15%
Speed	2.50 GHz
```

Thông tin dữ liệu : file dữ liệu với 1054822 bản ghi.

* Đọc lần lượt : **~12s**
* Đọc đa luồng (4 luồng) : **~6s** : sẽ giảm trong trường hợp cung cấp nhiều luồng.

Thời gian đọc file được giảm rõ rệt.

## Triển khai
---

**Các bước tiến hành:**<a id="cac-buoc-tien-hanh"></a>

1. Chi file thành nhiều phần tương ứng. Chú ý rằng phải chia sao cho phải đảm bảo toàn vẹn dữ liệu cho mỗi phần.
2. Tạo thread và tiến hành đọc từng phần tương ứng.
3. Kết hợp kết quả của các quá trình trên.


**Một vài lưu ý**<a id="mot-vai-luu-y"></a>

* Sử dụng việc đọc từng dòng vào buffer thay vì đọc tuần tự. Điều này có một nhược điểm là cần phải cấp biết trước kích thước bộ đệm. Để giải quyết vấn đề này một cách tự động, sẽ tiến hành triển khai sao cho bộ nhớ sẽ tự động tăng nên khi việc đọc nội dung dòng không hoàn thành (xuống dòng là `\r\n`, cái này phụ thuộc vào hệ thống).

* Để đảm bảo rằng các phần khi chia là đảm bảo toàn vẹn `split_pattern_file`, ta sẽ kiểm tra xem liệu kết thúc của phần có phải là xuống dòng hay không. Trong trường hợp không phải xuống dòng ta sẽ tăng kích thước bộ đệm và tiến hành đọc lại như bình thường.

* Trong quá trình triển khai việc gọi hàm hệ thống nhiều sẽ làm chậm quá trình đọc dữ liệu file ví dụ như hàm `fseek`. Vì vậy cần hạn chế sử dụng các hàm hệ thống nhằm tăng tốc độ.

* Khi đọc file và sử dụng các hàm hệ thông tôi không thấy sự khách biệt nếu tôi đọc file đó từ ổ HDD và SSD.

* Đã thử sử dụng `list` thay thế cho `vector` nhằm giảm thời gian cấp phát dữ liệu cho giá trị trả về, nhưng điều này trên thức tế không hiệu quả, kết quả là tương tự nhau. Các thao tác trên `list` và `vector` là khá tương đồng. Có thể đây là vấn đề cấp phát và điểu chỉnh bộ nhớ.


```cpp
#include <chrono>
#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <mutex>
#include <list>

std::string file_name = "C:\\10L.txt";

struct stItem
{
	float db1;
	char  dt[20];
	float db2;
	float db3;
	float db4;
	float db5;
	float db6;
	float db7;
	float db8;
	float db9;
	float db10;
	float db11;
	float db12;
	float db13;
};

struct part_file
{
	long part_start = 0;
	long part_end = 0;
	int part_size = 0;
};

int read_pattern(FILE* cur_file, stItem& item)
{
	memset(&item, 0, sizeof(item));

	int nRead = fscanf_s(cur_file, "%f %s %f %f %f %f %f %f %f %f %f %f %f %f",
		&item.db1,
		item.dt,
		20,
		&item.db2,
		&item.db3,
		&item.db4,
		&item.db5,
		&item.db6,
		&item.db7,
		&item.db8,
		&item.db9,
		&item.db10,
		&item.db11,
		&item.db12,
		&item.db13);

	return nRead;
}

int read_pattern(const char* buffer, stItem& item)
{
	memset(&item, 0, sizeof(item));

	int nRead = sscanf_s(buffer, "%f %s %f %f %f %f %f %f %f %f %f %f %f %f",
		&item.db1,
		item.dt,
		20,
		&item.db2,
		&item.db3,
		&item.db4,
		&item.db5,
		&item.db6,
		&item.db7,
		&item.db8,
		&item.db9,
		&item.db10,
		&item.db11,
		&item.db12,
		&item.db13);

	return nRead;
}

std::vector<part_file> split_pattern_file(FILE* cur_file, int nPart)
{
	long position_bak, position_cur;
	position_bak = position_cur = ftell(cur_file);
	fseek(cur_file, 0, SEEK_END);
	long file_size = ftell(cur_file);
	fseek(cur_file, position_bak, SEEK_SET);

	std::vector<part_file> parts; parts.resize(nPart);

	long part_size = file_size / nPart;
	if (part_size <= 0)
		return parts;

	int iPart = 0;
	const int nReadBuffSize = 256;
	char buffer[nReadBuffSize];

	while (iPart < nPart)
	{
		position_cur = ftell(cur_file);
		fseek(cur_file, position_cur + part_size, SEEK_SET);

		parts[iPart].part_start = position_cur;

		// read to nearest line break
		if (fgets(buffer, sizeof(buffer), cur_file) != NULL)
		{
			parts[iPart].part_end = ftell(cur_file);
		}
		else
		{
			fseek(cur_file, 0, SEEK_END);
			parts[iPart].part_end = ftell(cur_file);
			break;
		}

		iPart++;
	}

	fseek(cur_file, position_bak, SEEK_SET);

	return parts;
}

std::vector<stItem> read_pattern_file(const char* filename)
{
	std::vector<stItem> items; /*items.reserve(1000);*/

	FILE* csv_file = NULL;

	if (fopen_s(&csv_file, file_name.c_str(), "r") != 0)
		return items;

	std::unique_ptr<FILE, decltype(&fclose)> cs_file_ptr(csv_file, &fclose);

	long cur_read = 0;

	stItem item;
	size_t nLine = 0;

	const int nBufferSizeOffset = 256;
	size_t nbuffer_size = nBufferSizeOffset;
	std::unique_ptr<char[]> pBuffer(new char[nBufferSizeOffset]);
	size_t nread_length = 0;

	while (fgets(pBuffer.get(), static_cast<int>(nbuffer_size), cs_file_ptr.get()))
	{
		nread_length = strlen(pBuffer.get());

		// increate reading buffer
		if (nread_length == nbuffer_size && pBuffer[nread_length - 1] != '\n')
		{
			pBuffer.reset(new char[sizeof(nbuffer_size + nBufferSizeOffset)]);
			memset(pBuffer.get(), 0, nbuffer_size);

			cur_read = ftell(cs_file_ptr.get());

			fseek(cs_file_ptr.get(), long(cur_read - nread_length), SEEK_SET);

			continue;
		}

		if (read_pattern(pBuffer.get(), item))
		{
			items.push_back(item);
		}

		cur_read += (long)nread_length;
	}

	return items;
}

/*Vector*/

size_t read_pattern_file_vector(FILE* cur_file, part_file& csv_part, std::vector<stItem>& out_items)
{
	long cur_read = csv_part.part_start;
	fseek(cur_file, cur_read, SEEK_SET);

	stItem item;
	size_t nLine = 0;

	const int nBufferSizeOffset = 256;
	size_t nbuffer_size = nBufferSizeOffset;
	std::unique_ptr<char[]> pBuffer(new char[nBufferSizeOffset]);
	size_t nread_length = 0;

	do {
		// C2: getline
		while (true)
		{
			if (fgets(pBuffer.get(), static_cast<int>(nbuffer_size), cur_file))
			{
				nread_length = strlen(pBuffer.get());

				// increate reading buffer
				if (nread_length == nbuffer_size && pBuffer[nread_length - 1] != '\n')
				{
					pBuffer.reset(new char[sizeof(nbuffer_size + nBufferSizeOffset)]);
					memset(pBuffer.get(), 0, nbuffer_size);

					cur_read = ftell(cur_file);

					fseek(cur_file, long(cur_read - nread_length), SEEK_SET);

					continue;
				}

				if (read_pattern(pBuffer.get(), item))
				{
					out_items.push_back(item);
				}

				cur_read += (long)nread_length;
			}

			break;
		}

	} while (++nLine && cur_read < csv_part.part_end - 1);

	return out_items.size();
}

std::vector<stItem> read_pattern_file_multiple_thread_vector(const char* filename, int nthread)
{
	std::vector<stItem> items; items.reserve(1000);

	FILE* csv_file = NULL;

	if (fopen_s(&csv_file, file_name.c_str(), "r") != 0)
		return items;

	std::unique_ptr<FILE, decltype(&fclose)> cs_file_ptr(csv_file, &fclose);

	std::vector<part_file> parts = split_pattern_file(cs_file_ptr.get(), nthread);

	cs_file_ptr.reset(nullptr);

	if (parts.size() != nthread)
		return items;

	std::vector<std::thread> thread_group; thread_group.reserve(nthread);
	std::vector<std::vector<stItem>> items_group; items_group.resize(nthread);

	for (int i = 0; i < nthread; ++i)
	{
		thread_group.emplace_back([i, &items_group, &parts]() {

			FILE* _csv_file = _fsopen(file_name.c_str(), "r", _SH_DENYNO);
			if (_csv_file == NULL)
				return;

			std::unique_ptr<FILE, decltype(&fclose)> cs_part_file_ptr(_csv_file, &fclose);

			read_pattern_file_vector(cs_part_file_ptr.get(), parts[i], items_group[i]);
			});
	}

	for (int i = 0; i < nthread; ++i)
	{
		thread_group[i].join();
	}

	size_t nItems = 0;

	// Summary of results
	for (auto& item_list : items_group)
	{
		nItems += item_list.size();
	}

	items.reserve(nItems);

	for (auto& item_list : items_group)
	{
		items.insert(items.end(), item_list.begin(), item_list.end());
	}

	return items;
}



int main()
{
	auto beg = std::chrono::high_resolution_clock::now();

	std::vector<stItem> items = read_pattern_file_multiple_thread_vector(file_name.c_str(), 4);
	//std::vector<stItem> items = read_pattern_file(file_name.c_str());

	auto end = std::chrono::high_resolution_clock::now();

	auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - beg);

	std::cout << "Elapsed Time: " << duration.count() << std::endl;

	std::cout << "Sum : " << items.size() << std::endl;

	getchar();

	return 1;

}
```


## Tham khảo
* [https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture))


##### Cập nhật

- 2024.10.26 : Create
