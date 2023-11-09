#  Bitwise and Bit shifts
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2023.11.09 by <a href="#">thuong.nv</a>
</p>

<div class="table-of-contents">

[Giới thiệu](#giới-thiệu) 

[Yêu cầu](#yêu-cầu) 

[Chuẩn bị](#chuẩn-bị) 

[Thao tác](#thao-tác) 
</div>

## Tổng quan

Giới thiệu bitwise bit shift và các bài toán liên quan

</br><!--Section-->

## Tham khảo

+ [https://en.wikipedia.org/wiki/Bitwise_operation](https://en.wikipedia.org/wiki/Bitwise_operation)
+ [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

</br><!--Section-->

## Nội dung

For test bit : 
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)


##### <b> Giới thiệu về bitwise </b>

1. NOT

    The bitwise NOT, or bitwise complement, is a unary operation that performs logical negation on each bit, forming the ones' complement of the given binary value. Bits that are 0 become 1, and those that are 1 become 

    For example:

    ```c
    NOT 0111  (decimal 7)
    =   1000  (decimal 8)
    ```

1. AND

    A bitwise AND is a binary operation that takes two equal-length binary representations and performs the logical AND operation on each pair of the corresponding bits

    For example:

    ```s
        0101 (decimal 5)
    AND 0011 (decimal 3)
    =   0001 (decimal 1)
    ```

1. OR

    A bitwise OR is a binary operation that takes two bit patterns of equal length and performs the logical inclusive OR operation on each pair of corresponding bits

    For example:

    ```text
        0101 (decimal 5)
    OR  0011 (decimal 3)
    =   0111 (decimal 7)
    ```

1. XOR

    A bitwise XOR is a binary operation that takes two bit patterns of equal length and performs the logical exclusive OR operation on each pair of corresponding bits

    For example:

    ```text
        0101 (decimal 5)
    XOR 0011 (decimal 3)
    =   0110 (decimal 6)
    ```


##### </br><b> Các bài toán điển hình </b>

1. Bài toán : Set, clear, flip, check

    ```cpp
    /* a=target variable, b=bit number to act upon 0-n */
    #define BIT_SET(a,b) ((a) |= (1U<<(b)))
    #define BIT_CLEAR(a,b) ((a) &= ~(1U<<(b)))
    #define BIT_FLIP(a,b) ((a) ^= (1U<<(b)))
    #define BIT_CHECK(a,b) ((a) & (1U<<(b)))

    /* x=target variable, y=mask */
    #define BITMASK_SET(x,y) ((x) |= (y))
    #define BITMASK_CLEAR(x,y) ((x) &= (~(y)))
    #define BITMASK_FLIP(x,y) ((x) ^= (y))
    #define BITMASK_CHECK(x,y) (((x) & (y)) == (y))

    ```

</br><!--Section-->

## Chú ý





