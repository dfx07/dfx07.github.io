#  Bitwise and Bit shifts
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2023.11.09 by <a href="#">thuong.nv</a>
</p>

## Tổng quan

Giới thiệu bitwise bit shift và các bài toán liên quan

</br><!--Section-->

## Tham khảo

+ [https://en.wikipedia.org/wiki/Bitwise_operation](https://en.wikipedia.org/wiki/Bitwise_operation)
+ [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

</br><!--Section-->

## Nội dung

Công cụ kiểm tra (online) : 
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)


##### <b> Giới thiệu về bitwise </b>

1. NOT <a id="NOT"></a>

    The bitwise NOT, or bitwise complement, is a unary operation that performs logical negation on each bit, forming the ones' complement of the given binary value. Bits that are 0 become 1, and those that are 1 become 

    For example:

    ```c
    NOT 0111  (decimal 7)
    =   1000  (decimal 8)
    ```

1. AND <a id="ADD"></a>

    A bitwise AND is a binary operation that takes two equal-length binary representations and performs the logical AND operation on each pair of the corresponding bits

    For example:

    ```c
        0101 (decimal 5)
    AND 0011 (decimal 3)
    =   0001 (decimal 1)
    ```

1. OR <a id="OR"></a>

    A bitwise OR is a binary operation that takes two bit patterns of equal length and performs the logical inclusive OR operation on each pair of corresponding bits

    For example:

    ```c
        0101 (decimal 5)
    OR  0011 (decimal 3)
    =   0111 (decimal 7)
    ```

1. XOR <a id="XOR"></a>

    A bitwise XOR is a binary operation that takes two bit patterns of equal length and performs the logical exclusive OR operation on each pair of corresponding bits

    For example:

    ```c
        0101 (decimal 5)
    XOR 0011 (decimal 3)
    =   0110 (decimal 6)
    ```


##### </br><b> Các bài toán điển hình </b>

1. Set Bit <a id="SETBIT"></a>

    Đầu vào có thể là vị trí của bit được set hoặc giá trị

    ```cpp
    /* a=target variable, b=bit number to act upon 0-n */
    #define BIT_SET(a,b) ((a) |= (1U<<(b)))

    /* x=target variable, y=mask */
    #define BITMASK_SET(x,y) ((x) |= (y))

    ```


1. Clear Bit <a id="CLEARBIT"></a>

    ```cpp
    /* a=target variable, b=bit number to act upon 0-n */
    #define BIT_CLEAR(a,b) ((a) &= ~(1U<<(b)))

    /* x=target variable, y=mask */
    #define BITMASK_CLEAR(x,y) ((x) &= (~(y)))

    ```

    Có thể sử dụng cách dưới đây (không khuyến khích)

    ```cpp
    DWORD dwFlag; // 32 bit | Ex : 0001101100011001110000010100111

    /*set bit 0 the last 8 bits*/
    dwFlag = dwFlag ^ 0x0000ffff & dwFlag;

    /* Example
        00011011000110001110000010100111
    XOR
        00000000000000001111111111111111
        --------------------------------
        00011011000110000001111101011000
    AND
        00011011000110001110000010100111
        --------------------------------
        00011011000110000000000000000000
    */

    ```


1. Flip Bit <a id="FLIPBIT"></a>

    ```cpp
    /* a=target variable, b=bit number to act upon 0-n */
    #define BIT_FLIP(a,b) ((a) ^= (1U<<(b)))

    /* x=target variable, y=mask */
    #define BITMASK_FLIP(x,y) ((x) ^= (y))

    ```

1. Check Bit <a id="CHECKBIT"></a>

    ```cpp
    /* a=target variable, b=bit number to act upon 0-n */
    #define BIT_CHECK(a,b) ((a) & (1U<<(b)))

    /* x=target variable, y=mask */
    #define BITMASK_CHECK(x,y) (((x) & (y)) == (y))

    ```

</br><!--Section-->

## Chú ý





