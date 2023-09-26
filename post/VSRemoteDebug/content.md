[//]: Tiêu đề bài viết
#  Debug C++ thông qua TeamViewer
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b> : 2023.09.26 by <a>thuong.nv</a>
</p>

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Yêu cầu](#yêu-cầu)
- [Chuẩn bị](#chuẩn-bị)
- [Thao tác](#thao-tác)

## Giới thiệu 

Quá trình fix bug không phải lúc nào ta cũng có thể chạy code trực tiếp trên máy. Vì thế Visual Studio cung cấp một tính năng gọi là **Attach Process** sử dụng thông qua mạng LAN.

Việc sử dụng TeamView giúp ta vừa có thể điều khiển, view vừa giúp ta kết nối VPN sử dụng cho việc Remote Debug


## Yêu cầu

- Window 10 (x64)
- Visual Studio 2019 : [Download Remote Debug 2019 ](https://learn.microsoft.com/en-us/visualstudio/debugger/remote-debugging)

- TeamViewer : [Download TeamViewer](https://www.teamviewer.com/)

Chú ý :
> - Hai máy cùng sử dụng TeamView 
> - Cùng cài một bản Remote Debug cho Visual Studio
> - Tắt tính năng Optimize trên các project cần debug


## Chuẩn bị
1. Cài đặt TeamViewer trên hai máy Remote và Debug 

> TeamViewer.exe

2. Cài đặt RemoteDebug tool trên máy Remote và Debug

Download Remote Debug 
> VS_RemoteTools.exe

**Chú ý**: cần dùng chung một phiên bản và tương ứng với phiên bản Visual Studio đang sử dụng 


3. Cài đặt VPN TeamViewer trên máy Remote

TeamViewer > Open Setting 
> Settting > Advanced > Install VPN driver

![install VPN TeamViewer](./image/InstallVPN.png)

## Thao tác

##### B1. Kết nối TeamView thông thường và tiến hành bật kết nối VPN <br>
Tiến hành kết nối TeamViewer thông qua ID/PW. Sau đó kết nối VPN như dưới
![connect VPN TeamViewer](./image/ConnectVPNTeamView.png)

Một cửa sổ hiện ra: Hiển thị thông tin về địa chỉ VPN kết nối của 2 máy
![show VPN TeamViewer](./image/ShowVPN.png)

##### B2. Chạy RemoteDebug Tool trên máy Remote <br>

Chạy file : msvsmon.exe 

Bản cài RemoteDebug VS 2019
> C:\Program Files\Microsoft Visual Studio 16.0\Common7\IDE\Remote Debugger\x64\msvsmon.exe

**Chú ý**: Cần chạy Tool bằng quyền Administrator

![Run Tool](./image/RunTool.png)

PS : Trong mỗi phiên bản Tool sẽ mở các công khác nhau VD: VS2019(4024)

##### B3. Tiến hành Attach Debug trên máy Debug <br>

![Alt text](./image/AttachVS.png)

Có thể sử dụng tổ hợp phím : `Ctrl + Alt + P` hoặc Attach

![Attach1](./image/Attach.png)
![Attach2](./image/Attach2.png)

## Chú ý:

- Nếu cần debug file nào thì build *.dll của project đó và đặt nó vào thư mục cài đặt bên máy Remote và chạy lại chương trình.

- Disable optimization của project đó và build lại

![Alt text](./image/DisableOptimize.png)

## Tham khảo


