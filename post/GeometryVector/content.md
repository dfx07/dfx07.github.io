#  Vector 2D
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2023.03.10 by <a href="#">thuong.nv</a>
</p>

## Mục lục

<div style="padding:20px; margin-bottom:20px; background-color: #f3f3f587;border-radius: 10px;">

* [Giới thiệu](#giới-thiệu)

* [Yêu cầu](#yêu-cầu)

* [Nội dung](#nội-dung)

    * [Định nghĩa](#định-nghĩa)
    * [Toán tử vector](#toán-tử-vector)
    * [Tính chất vector](#tính-chất-vector)
    * [Thao tác vectoc](#thao-tác-vector)
    * [Tính chất mở rộng](#tính-chất-mở-rộng-vector)

</div>

## Giới thiệu 

Dưới đây sẽ trình bày về các xử lý cơ bản vector 2D. Nó là cơ sở để thực hiện các thuật toán liên quan đến hình học trong ứng dụng thực tế.

Nó sẽ bao gồm các giải thích và triển khai code sử dụng C++.

## Yêu cầu

Cấn có các kiến thức cơ bản về Vector, Điểm, Độ lớn. Ngoài ra cần biết các tính toán liên quan đến vector các khái niệm cơ bản như: độ lớn, tích vô hướng, tính có hướng


## Nội dung

##### <b> Định nghĩa </b>

Ta sẽ sử dụng định nghĩa này xuyên xuốt 

```C++
struct Vec2D 
{
    float x;
    float y;

    Vec2D(const float _x, const float _y):
        x(_x), y(_y) { }
};
```

> Dưới đây sẽ trình bày theo phong cách C, Ngoài ra có thể định nghĩa lại thành lớn phù hợp cho C++

##### <b> Toán tử vector </b>

1. Cộng (Add) <a id="Add"></a>

    ```C++
    Vec2D Add(const Vec2D& v1, const Vec2D& v2)
    {
        return Vector(v1.x + v2.x, v1.y + v2.y);
    }
    ```
    Link tham khảo: 

2. Trừ (Sub)

    ```C++
    Vec2D Sub(const Vec2D& v1, const Vec2D& v2)
    {
        return Vector(v1.x - v2.x, v1.y - v2.y);
    }
    ```

    Link tham khảo: 

3. Nhân (Mul)

    ```C++
    template<typename T>
    Vec2D Mul(const Vec2D& v, const T& factor)
    {
        return  Vec2D(v.x * static_cast<float>(factor),
            v.y * static_cast<float>(factor));
    }
    ```

    Link tham khảo: 

4. Chia (Div)

    ```C++
    template<typename T>
    Vec2D Div(const Vec2D& v, const T& factor)
    {
        if(std::abs(factor) <= 0.01)
            return Vec2D(0, 0);

        return Vec2D(v.x / static_cast<float>(factor),
                    v.y / static_cast<float>(factor));
    }
    ```

    Link tham khảo: 

##### <b> Tính chất vector </b>

1. Độ lớn (Magnitude)

    ```C++
    float Mag(const Vec2D& v)
    {
        return std::sqrtf(v.x * v.x + v.y * v.y);
    }
    ```

    Link tham khảo: 

2. Vector đơn vị (Normalize)

    Tiêu chuẩn vector về vector có độ dài bằng 1 đơn vị

    Trong hàm ```Normalize``` có sử dụng hàm ```Mag``` định nghĩa trước đó

    ```C++
    Vec2D Normalize(const Vec2D& v)
    {
        float fMagnitude = Mag(v);

        if (fMagnitude <= 0)
        {
            return Vec2D(0.f, 0.f);
        }
        return Vec2D(v.X / fMagnitude, v.Y / fMagnitude);
    }
    ```

    Link tham khảo: 

3. Tích vô hướng (dot product)

    Tích vô hướng của hai vector là một số có thể sử dụng cho việc xác định vị   trí của một điểm với một đoạn thẳng

    Ứng dụng:
    - Finding the orthogonal component of a vector to another vector
    - Finding the shortest distance from a point to a segment.

    <br>
    Công thức:

    ![Alt text](./image/formula_dot.png)

    ```C++

    float Dot(const Vec2D& vec1, const Vec2D& vec2)
    {
        return vec1.x * vec2.x + vec1.y + vec2.y;
    }
    ```

4. Tích có hướng (cross product)

    Tích có hướng của hai vector là một số có thể sử dụng cho việc xác định vị trí của một điểm với một đoạn thẳng

    Cross product là một vector vuông góc với lần lượt các vector thành phần
    Cross product 2D sẽ là một giá trị (bởi vì 2D thì cross product x, y = (0, 0) chỉ còn z ).

    Công thức:
    
    ![Alt text](./image/formula_cross.png)

    ```C++

    float Cross(Vec2D& v1, Vec2D& v2)
    {
        return (v1.x * v2.y) - (v1.y * v2.x);
    }
    ```

    Link tham khảo: https://www.mathsisfun.com/algebra/vectors-cross-product.html

##### <b>Thao tác vector</b>

1. Di chuyển (Move)
 
    Di chuyển một điểm hoặc một vector sử dụng vector đơn vị và độ lớn.

    ```C++

    Point2D Move(const Point2D& pt, const Vec2D& vn, const float fDistance)
    {
        Point2D ptMove;

        ptMove.X = pt.X + vn.X * fDistance;
        ptMove.Y = pt.Y + vn.Y * fDistance;

        return ptMove;
    }
    ```

2. Quay (rotate)

    2.1 Quay tại gốc tọa độ 

    ```C++

    Vec2D Rotate(const Vec2D& v, const float fDegree)
    {
        float fRadAngle = ConvertDegToRad(fDegree);

        Vec2D vRoate;
        vRoate.X = std::cos(fRadAngle) * v.X - sin(fRadAngle) * v.Y;
        vRoate.Y = std::sin(fRadAngle) * v.X + cos(fRadAngle) * v.Y;
        return vRoate;
    }
    ```

    2.2 Quay một điểm xung quanh điểm
  
    ```C++

    Point2D	RotatePoint(const Point2D& ptPivot, const Point2D& ptRotate,
                        const float fDegree)
    {
        Vec2D vpipr = ptRotate - ptPivot;
        FLOAT fDistance = Mag(vpipr);

        Vec2D vuint_pipr = Normalize(vpipr);
        Vec2D vuint_rotate = Rotate(vuint_pipr, fDegree);

        Point2D ptMove = Move(ptPivot, vuint_rotate, fDistance);

        return ptMove;
    }
    ```


##### Tính chất mở rộng Vector:

1. Góc giữa 2 vector (Angle bettwen two vector)

    Góc giữa 2 Vector là góc giữa 2 vector đơn bị của nó

    ```C++
    float Angle2Vector(const Vec2D& v1, const Vec2D& v2)
    {
        FLOAT fDot = Dot(v1, v2);
        FLOAT fDet = v1.x * v2.y - v1.y * v2.x;

        FLOAT fAngle = std::atan2f(fDet, fDot);

        return ConvertRadToDeg(fAngle);
    }
    ```

2. Hướng của một điểm với một vector (Orientation)
    
    Theo chiều tiến của vector ta có thể xác định được điểm đó nằm ở phí nào theo hướng vector

    ![Alt text](./image/orien_p2vec.png)

    ```C++
    // Enum orientation
	enum EnumOrien
	{
		LEFT      =-1,	// left
		COLLINEAR = 0,	// collinear
		RIGHT     = 1,	// right
	};
    
    EnumOrien OrientationPoint2Vector(IN Point2D& ptC, IN Point2D& pt1,
                                      IN Point2D& pt2)
    {
        const float fOrin = (pt2.X - pt1.X) * (ptC.Y - pt1.Y) - (ptC.X - pt1.X) * (pt2.Y - pt1.Y);

        if (IsEqual(fOrin, 0.f, 0.01f)) return EnumOrien::COLLINEAR; /* ptc and p1p2 collinear */
        else if (fOrin < 0.f) return EnumOrien::LEFT; /* ptc on the left p1p2 */
        else	          return EnumOrien::RIGHT; /* ptc on the right p1p2 */
    }
    ```

    Chú ý :
    > Cần để ý tới chiều của trục tọa độ biểu diễn, với hàm trên sẽ tương ứng với trục Y hướng xuống

    Link tham khảo : 
    - https://www.geeksforgeeks.org/direction-point-line-segment/
    - https://www.geeksforgeeks.org/orientation-3-ordered-points/
    
<br>

3. Hai vector cùng phương, cùng hướng

    Hai vector được cho là cùng phương nếu nó cùng vector đơn vị

    ```C++
    bool SameDirection(const Vec2D& v1, const Vec2D& v2)
    {
        Vec2D vNv1 = Normalize(v1);
        Vec2D vNv2 = Normalize(v2);
        return (std::abs(vNv1.x / vNv2.x) - std::abs(vNv1.y / vNv2.y)) <= Ztol;
    }
    ```

    Trường hợp cùng hướng thì dấu của vector đơn vị phải giống nhau

##### Các tính toán hình học cơ bản với vector, đường thẳng

1. Kiểm tra điểm nằm trên đoạn thẳng <a id="PointInLineSegment"></a> 


    ```C++
    bool PointInLineSegment(const Point2D& pt1, const Point2D& pt2, 
                            const Point2D& pt)
    {
        Vec2D vp1p = pt - pt1; // Vector vp1p ;
        Vec2D vp2p = pt - pt2; // Vector vp2p ;

        float fCrs = Cross(vp1p, vp2p);

        // Point in straight line + Độ chính xác có thể sử dụng sai số ở đây
        if (IsEqual(fCrs, 0.f, 0.01f))
        {
            // Point in side line Segment
            float fp1pDis  = GetMagnitude(vp1p);
            float fp2pDis  = GetMagnitude(vp2p);
            float fp1p2Dis = GetMagnitude(pt1 - pt2);

            if (fp1pDis <= fp1p2Dis && fp2pDis <= fp1p2Dis)
            {
                return TRUE;
            }
        }
        return FALSE;
    }
    ```

2. Giao điểm hai đường thẳng giao nhau


    ![Alt text](./image/inter_line.png)

    Hàm dưới tìm giao điểm giữa 2 đường thẳng cho bởi 4 điểm

    - Tọa độ điểm giao sẽ trả về tham số ```pInter``` nếu có
    - Return : True (giao nhau) | False (không giao)


    ```C++
    bool Intersect2Line(const Point2D& pt1,		// L1
	                    const Point2D& pt2,		// L1
	                    const Point2D& pt3,		// L2
	                    const Point2D& pt4,		// L2
	                          Point2D* pInter	/*= NULL*/)
    {
        // Equation of the first straight line Segment  : ax +by = c
        float fA = pt2.y - pt1.y;
        float fB = pt1.x - pt2.x;
        float fC = fA * (pt1.x) + fB * (pt1.y);

        // Equation of the second straight line Segment : a1x +b1y = c1
        float fA1 = pt4.y - pt3.y;
        float fB1 = pt3.x - pt4.x;
        float fC1 = fA1 * (pt3.x) + fB1 * (pt3.y);

        float fDet = fA * fB1 - fB * fA1;

        Vec2D ptInter = Point2D(0.f, 0.f);
        bool bInter = false;

        // Check not parallel line Segment
        if (IsEqual(fDet, 0.f, 0.01f) == false)
        {
            ptInter.x = (fB1 * fC  - fB  * fC1) / fDet;
            ptInter.y = (fA  * fC1 - fA1 * fC ) / fDet;

            bInter = true;
        }

        if (pInter)
        {
            *pInter = ptInter;
        }

        return bInter;
    }
    ```

3. Giao điểm hai đoạn thẳng giao nhau

    Tương tự với giao điểm giữa 2 đường thẳng chỉ thêm kiểm tra giao điểm nằm trong khoảng của 2 đoạn thẳng là được.

    Hàm dưới xử dụng hàm [PointInLineSegment](#PointInLineSegment) đã được trình bày ở trên.

    - Tọa độ điểm giao sẽ trả về tham số ```pInter``` nếu có
    - Return : True (giao nhau) | False (không giao)

    ```C++
    bool Intersect2Segment( const Point2D& pt1,     // Seg1
                            const Point2D& pt2,     // Seg1
                            const Point2D& pt3,     // Seg2
                            const Point2D& pt4,     // Seg2
                                  Point2D* pInter   /*= NULL*/)
    {
        // Equation of the first straight line Segment  : ax +by = c
        float fA = pt2.y - pt1.y;
        float fB = pt1.x - pt2.x;
        float fC = fA * (pt1.x) + fB * (pt1.y);

        // Equation of the second straight line Segment : a1x +b1y = c1
        float fA1 = pt4.y - pt3.y;
        float fB1 = pt3.x - pt4.x;
        float fC1 = fA1 * (pt3.x) + fB1 * (pt3.y);

        float fDet = fA * fB1 - fB * fA1;

        Vec2D ptInter = Point2D(0.f, 0.f);
        bool bInter = false;

        // Check not parallel line Segment
        if (IsEqual(fDet, 0.f, 0.01f) == false)
        {
            ptInter.X = (fb1 * fc - fb * fc1) / fDet;
            ptInter.Y = (fa * fc1 - fa1 * fc) / fDet;

            // Inside intersection 
            if (PointInLineSegment(pt1, pt2, ptInter) &&
                PointInLineSegment(pt3, pt4, ptInter))
            {
                bInter = true;
            }
            else // Outside intersection
            {
                bInter = false;
            }
        }

        if (pInter)
        {
            *pInter = ptIntersect;
        }

        return bInter;
    }
    ```

4. Hình chiếu của một điểm xuống đường thẳng <a id="PerpPoint2Line"></a>

    ```C++
    Point2D PerpPoint2Line(const Point2D& ptLine1, const Point2D& ptLine2,
                              const Point2D& pt)
    {
        Vec2D ptPer;
        Vec2D vp1p2 = ptLine2 - ptLine1;  // p1p2
        Vec2D vp1p = pt - ptLine1;  // p1p
        Vec2D vp2p = pt - ptLine2;  // p2p

        FLOAT fDis = vp1p2.X * vp1p2.X + vp1p2.Y * vp1p2.Y;

        if (FALSE == IsEqual(fDis, 0.f, 0.01f))
        {
            FLOAT fDet = Dot(vp1p, vp1p2);

            FLOAT t = fDet / fDis;
            ptPer.X = ptLine1.X + t * (ptLine2.X - ptLine1.X);
            ptPer.Y = ptLine1.Y + t * (ptLine2.Y - ptLine1.Y);
        }
        else
        {
            ptPer = ptLine1; // case 3 points coincide
        }

        return ptPer;
    }
    ```

5. Hình chiếu của một điểm xuống đoạn thẳng

    ![Alt text](./image/perp_p2seg.png)

    Giống như hình chiếu một điểm xuống đường thẳng chỉ cần xét thêm 2 đầu mút.
    Với vị trí vượt qua đầu mút thì đầu mút gầm hơn sẽ được lấy làm hình chiếu.

    Hàm [PerpPoint2Line](#PerpPoint2Line) được định nghĩa ở trên

    ```C++

    Point2D PerpPoint2Segment(const Point2D& ptSeg1, const Point2D& ptSeg2,
                              const Point2D& pt)
    {
        Vec2D ab = ptSeg2 - ptSeg1;
        Vec2D ae = pt     - ptSeg1;
        Vec2D be = pt     - ptSeg2;

        float fDot_ab_be = Dot(ab, be);
        float fDot_ab_ae = Dot(ab, ae);

        if(fDot_ab_be > 0)
        {
            return ptSeg2;
        }
        else if(fDot_ab_ae < 0)
        {
            return ptSeg1;
        }
        else
        {
            return PerpPoint2Line(ptSeg1, ptSeg2, pt);
        }
    }
    ```

## Tham khảo


