# 2D Geometry Algorithms
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2023.10.04 by <a href="#">thuong.nv</a>
</p>

## Giới thiệu 

Sau khi giới thiệu xong về vector2D cơ bản. Bài viết sẽ trình bày các thuật toán liên quan.

Mọi kiến thức liên quan đến Vector2D có thể tham khảo [Vector2D cơ bản](/post/GeometryVector/vector-2d.html)

## Yêu cầu

Cần nắm vũng kiến thức 2D cơ bản. Ngoài ra còn các tính chất và thuật toán tính toán vector thông thường

## Nội dung

##### <b> Định nghĩa </b>
___


Ta sẽ sử dụng định nghĩa này xuyên xuốt 

```cpp
struct Vec2D 
{
    float x;
    float y;

    Vec2D(const float _x, const float _y):
        x(_x), y(_y) { }
};
```

> Dưới đây sẽ trình bày theo phong cách C, Ngoài ra có thể định nghĩa lại thành lớn phù hợp cho C++


Note: Ta có thể sử dụng loại vòng lặp dưới đây để tiến hành lặp cạnh cho polygon 
nó không sử dụng phép chia lấy dư vì thế sẽ nhanh hơn một chút.

```cpp
int i, j;
for(i = nCnt - 1, j = 0; j < nCnt;  i = j, j++)
{
    // i first vertex, j next vertex
}

```


##### <b>Đường thẳng, đoạn thẳng</b>
___

1. Kiểm tra điểm nằm trên đoạn thẳng <a id="IsPointInLineSegment"></a> 


    ```cpp
    bool IsPointInLineSegment(const Point2D& pt1, const Point2D& pt2, const Point2D& pt)
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
    
    Ngoài ra ta có thể lấy chính xác vị trí theo hàm dưới.

    Giả sử có 3 điểm $A$, $B$ và $C$. Muốn biết điểm $C$ nằm giữa $A$ và $B$. Ta có thể xác định bằng việc kiểm tra dotproduct của $AB$ và $AC$ là dương và nhỏ hơn dot product của $AB$ và $AB$. Tính toán Kac và Kab theo công thức dưới:


    [Thuật toán]
    - Kiểm tra nằm trên cùng đường thẳng AB, AC
    - Kiểm tra dot AB và AC điểm xác định nằm trên đầu mút hoặc trong

    </br>

    [Trả về]
    - 0: Không thuộc
    - 1: Thuộc
    - 2: Trùng với điểm p1 
    - 3: Trùng với điểm p2

    </br>

    ```cpp
    int RelationPoint2LineSegment(const Point2D& pt1, const Point2D& pt2, const Point2D& pt)
    {
        Vec2D vp1p  = pt  - pt1; // Vector vp1p ;
        Vec2D vp1p2 = pt2 - pt1; // Vector vp2p ;

        float fCrs = Cross(vp1p, vp2p);

        // Điểm không nằm trên đường thẳng
        if(!IsEqual(fCrs, 0.f, 0.01f))
            return 0;

        float fDot_p1p_p1p2 = Dot(vp1p2, vp1p);

        // Điểm p gần điểm p1
        if(fDot_p1p_p1p2 < 0) return 0;
        if(IsEqual(fDot_p1p_p1p2, 0, 0.01f) == true) return 2;
        
        // Điểm p gần điểm p2
        float fDot_p1p2_p1p2 = Dot(vp1p2, vp1p2);

        if(fDot_p1p_p1p2 > fDot_p1p2_p1p2) return 0;
        if(IsEqual(fDot_p1p_p1p2, fDot_p1p2_p1p2, 0.01f) == true) return 2;

        return 1;
    }
    ```

1. Kiểm tra điểm nằm trên đường thẳng <a id="IsPointInLine"></a> 

    Dưới đây sẽ trình bày điểm thuộc đường thẳng cho bởi 2 điểm hoặc 1 điểm và một vector đơn vị

    ```cpp
    // Line created by point and normalize vector
    bool IsPointInLine2(const Point2D& pt, const Vec2D& vn, const Point2D& ptc)
    {
        Point2D ptpc = ptc - pt;

        float fCross = Cross(vn, ptpc);

        // 3 collinear point if cross product isqual 0
        if (true == IsEqual(fCross, 0.f, 0.01f))
        {
            return true;
        }

        return false;
    }

    // Line created by two by
    bool IsPointInLine(const Point2D& pt1, const Point2D& pt2, const Point2D& ptc)
    {
        Vec2D vuint_line = Normalize(pt1 - pt2);

        return IsPointInLine2(pt1, vuint_line, ptc);
    }
    ```

2. Giao điểm hai đường thẳng <a id="Intersect2Line"></a> 

    [Thuật toán]
    - Viết phương trình 2 đường thẳng đi qua 4 điểm (ax + by + c = 0)
    - Tồn tại giao điểm khi phương trình 2 ẩn x, y có định thức khác không (không song song)
    - Tìm (xi, yi) bằng cách giải phương trình 

    </br>

    <p class="img-post">
        <img src="./image/inter_line.png" />
    </p>

    Hàm dưới tìm giao điểm giữa 2 đường thẳng cho bởi 4 điểm

    - Tọa độ điểm giao sẽ trả về tham số ```pInter``` nếu có
    - Return : True (giao nhau) | False (không giao)

    </br>

    ```cpp
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

    Trong trường hợp 2 đường thẳng cho bởi một điểm và một vector đơn vị thì có thể sử dụng hàm bên dưới.

    ```cpp
    bool Intersect2Line2(const Point2D& ptLine1,   // Point on the line 1
	                     const Vec2D&   vnLine1,   // Unit vector line
	                     const Point2D& ptLine2,   // Point on the line 2
	                     const Vec2D&   vnLine2,   // Unit vector line
	                           Point2D* pInter     /*= NULL*/)
    {
        Point2D ptInter;

        Point2D ptLine12 = ptLine1 + vnLine1;
        Point2D ptLine22 = ptLine2 + vnLine2;

        if (true == Intersect2Line(ptLine1, ptLine12, ptLine2, ptLine22, &ptInter))
        {
            if (pInter)
            {
                *pInter = ptInter;
            }
            return true;
        }

        return false;
    }
    ```

3. Giao điểm hai đoạn thẳng giao nhau <a id="Intersect2Segment"></a> 

    Tương tự với giao điểm giữa 2 đường thẳng chỉ thêm kiểm tra giao điểm nằm trong khoảng của 2 đoạn thẳng là được.

    Hàm dưới xử dụng hàm [PointInLineSegment](#PointInLineSegment) đã được trình bày ở trên.

    - Tọa độ điểm giao sẽ trả về tham số ```pInter``` nếu có
    - Return : True (giao nhau) | False (không giao)

    </br>

    ```cpp
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
3. Giao điểm hai đường thẳng và đoạn thẳng <a id="IntersectLine2Segment"></a> 

    Hàm dưới xử dụng hàm [Intersect2Line](#Intersect2Line) đã được trình bày ở trên.

    - Tọa độ điểm giao sẽ trả về tham số ```pInter``` nếu có
    - Return : True (giao nhau) | False (không giao)

    </br>

    ```cpp
    bool IntersectLine2Segment( const Point2D& ptLine1,	// Point on the line
                                const Point2D& ptLine2,	// Point on the line
                                const Point2D& ptSeg1,	// Point start on line segment
                                const Point2D& ptSeg2,	// Point end on line segment
                                      Point2D* pInter	/*= NULL*/)
    {
        Point2D ptInter;

        if (true == Intersect2Line(ptLine1, ptLine2, ptSeg1, ptSeg2, &ptInter))
        {
            // Check point inside line segment
            float fp1pDistance  = Mag(ptSeg1 - ptInter);
            float fp2pDistance  = Mag(ptSeg2 - ptInter);
            float fp1p2Distance = Mag(ptSeg1 - ptSeg2);

            if (fp1pDistance <= fp1p2Distance &&
                fp2pDistance <= fp1p2Distance)
            {
                if (pInter)
                {
                    *pInter = ptInter;
                }
                return true;
            }
        }
        return false;
    }
    ```


4. Khoảng cách gần nhất điểm xuống đường thẳng<a id="PerpPoint2Line"></a>

    ```cpp
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

5. Khoảng cách gần nhất điểm xuống đoạn thẳng<a id="PerpPoint2Segment"></a> 


    </br>

    <p class="img-post">
        <img src="./image/perp_p2seg.png" />
    </p>

    Giống như hình chiếu một điểm xuống đường thẳng chỉ cần xét thêm 2 đầu mút.
    Với vị trí vượt qua đầu mút thì đầu mút gầm hơn sẽ được lấy làm hình chiếu.

    Hàm [PerpPoint2Line](#PerpPoint2Line) được định nghĩa ở trên

    ```cpp
    Point2D PerpPoint2Segment(const Point2D& ptSeg1, const Point2D& ptSeg2, const Point2D& pt)
    {
        Vec2D vp1p2 = ptSeg2 - ptSeg1;
        Vec2D vp1p  = pt - ptSeg1;
        Vec2D vp2p  = pt - ptSeg2;

        float fDot_vp1p2_vp2p = GetDotProduct(vp1p2, vp2p);
        float fDot_vp1p2_vp1p = GetDotProduct(vp1p2, vp1p);

        if (kygeo::IsEqual(fDot_vp1p2_vp2p, 0.f, GEO_EPSILON) != TRUE && fDot_vp1p2_vp2p > 0)
        {
            return ptSeg2;
        }

        if (kygeo::IsEqual(fDot_vp1p2_vp1p, 0.f, GEO_EPSILON) != TRUE && fDot_vp1p2_vp1p < 0)
        {
            return ptSeg1;
        }

        return PerpPoint2Line(ptSeg1, ptSeg2, pt);
    }
    ```


</br>

##### <b>Tia</b>
___

1. Giao điểm tia với đường thẳng <a id="IntersectRay2Line"></a> 

    Tương tự giao điểm giữa 2 đường thẳng chỉ khác biệt giới hạn của tia về một hướng cố định.

    Hàm [IsPointInLine2](#Intersect2Line) được định nghĩa ở trên

    ```cpp
    bool IntersectRay2Line( const Point2D& ptRay  , const Vec2D& vnRay,
                            const Point2D& ptLine1, const Point2D& ptLine2,
                                  Point2D* pInter/* = NULL*/)
    {
        Vec2D vnLine = Normalize(ptLine2 - ptLine1);

        Point2D ptInter;

        if (true == Intersect2Line2(ptRay, vnRay, ptLine1, vnLine, &ptInter))
        {
            Vec2D vnRayI = ptInter - ptRay;

            if (pInter)
            {
                *pInter = ptInter;
            }

            return	(vnRayI.X * vnRay.X >= 0) &&
                    (vnRayI.Y * vnRay.Y >= 0);

        }

        return false;
    }
    ```
2. Kiểm tra điểm nằm trên tia <a id="IsPointInRay"></a>

    Kiểm tra điểm nằm trên một tia tương tự kiểm tra điểm nằm trên đường thẳng bị giới hạn một đầu.

    Hàm [IsPointInLine2](#Intersect2Line) được định nghĩa ở trên

    ```cpp
    bool IsPointInRay(const Point2D& pt, const Vec2D& vn, const Point2D& ptc)
    {
        // Line created by point and normalize vector
        if (IsPointInLine2(pt, vn, ptc))
        {
            // unit vector ptpc
            Vec2D vptpc = Normalize(ptc - pt);

            return  (vptpc.X * vn.X) >= 0 &&
                    (vptpc.Y * vn.Y) >= 0;
        }

        return false;
    }
    ```

</br>

##### <b>Polygon</b>
---

1. Tìm max bounding <a id="MaxBounding"></a>

    a. Sử dụng thuật toán Gift Wrapping  <a id="Gift_wrap"></a>

    [Điều kiện]
    > Chú ý đến chiều chiều của hệ trục tọa độ Oxy (hướng xuống, hướng lên)

    [Thuật toán]
    - Mỗi lần lặp ta sẽ tìm được một điểm ở bên phải cùng của nó (Trường hợp polygon ngược chiều kim đồng hồ - CCW). 
    Đánh dấu nó là đỉnh đã đi qua
    - Lặp tương tự đến khi ta tìm được điểm đã duyệt qua

    </br>

    Tham khảo: 
    - [Gift_wrapping_algorithm](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm)

    </br>

    ```cpp
    VecPoint2D ConvexHullListPoints_GiftWrap(const VecPoint2D& vecPoints)
    {
        if (vecPoints.size() < 3)
        {
            ASSERT(0);
            return vecPoints;
        }

        int nPointCnt = static_cast<int>(vecPoints.size());

        // Find the leftmost point
        int nIdxLeftMost = 0;
        for (int i = 1; i < nPointCnt; i++)
        {
            if (vecPoints[i].X < vecPoints[nIdxLeftMost].X)
                nIdxLeftMost = i;
        }

        VecPoint2D vecHull; vecHull.reserve(nPointCnt);
        bool* arrMarkCheck = new bool[nPointCnt]{ false };

        int p = nIdxLeftMost, q;
        do
        {
            // Add current point to result
            vecHull.push_back(vecPoints[p]);
            arrMarkCheck[p] = true;

            // Search for a point 'q' such that orientation(p, q,
            // x) is counterclockwise for all points 'x'. The idea
            // is to keep track of last visited most counterclock-
            // wise point in q. If any point 'i' is more counterclock-
            // wise than q, then update q.
            q = (p + 1) % nPointCnt;
            for (int i = 0; i < nPointCnt; i++)
            {
                // If i is more counterclockwise than current q, then
                // update q

                // Note: Side base on the axis direction
                if (OrientationPoint2Vector(vecPoints[i], vecPoints[p], vecPoints[q]) == EnumOrien::RIGHT)
                    q = i;
            }

            // Now q is the most counterclockwise with respect to p
            // Set p as q for next iteration, so that q is added to
            // result 'hull'
            p = q;

            // Close or over
            if (arrMarkCheck[p] == true || vecHull.size() > nPointCnt)
            {
                break;
            }

        } while (p != nIdxLeftMost);  // While we don't come to first point

        delete[] arrMarkCheck;

        return vecHull;
    }
    ```

    b. Sử dụng thuật toán Graham_scan  <a id="Graham_scan"></a>

    [Điều kiện]
    > Chú ý đến chiều chiều của hệ trục tọa độ Oxy (hướng xuống, hướng lên)

    [Thuật toán]
    - Tìm điểm dưới cùng bên phải.
    - Sắp xếp các điểm theo chỉ số góc với điểm dưới cùng (góc tạo bởi đỉnh + điểm min và trục Ox).
    - Nó tìm đoạn ngoài nhất giữa 3 điểm liên tiếp.
    - Tiếp tục lặp đến hết điểm của polygon.

    </br>

    <p class="img-post">
        <img src="//upload.wikimedia.org/wikipedia/commons/thumb/7/71/GrahamScanDemo.gif/200px-GrahamScanDemo.gif" decoding="async" width="200" height="205" class="mw-file-element" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/7/71/GrahamScanDemo.gif/300px-GrahamScanDemo.gif 1.5x, //upload.wikimedia.org/wikipedia/commons/7/71/GrahamScanDemo.gif 2x" data-file-width="344" data-file-height="353">
    </p>

    Tham khảo: [https://en.wikipedia.org/wiki/Graham_scan](https://en.wikipedia.org/wiki/Graham_scan)


    **PS:** Đoạn code dưới là một đoạn code cũ chưa chuyển đổi tương ứng
    ```cpp
    
    Ap2D DllExport ConvexHullListPoints_GrahamScan(const Ap2D& xap)
    {
        using namespace structsp;

        Ap2D boOut; 
        // 1. Tìm điểm min trong danh sách các điểm                 
        INT indMin = V2get_minpoint_poly(xap, NULL);
        if(indMin <= -1) return boOut;

        // 2. Sắp xếp theo tứ tự góc từ các điểm còn lại đến điểm min
        CompareEx<FLT,const Vec2D* >* arcmp = new CompareEx<FLT,const Vec2D* >[xap.np];
        for (INT i = 0; i < xap.np; i++)
        {
            //↓ N.V.Thuong [Comment out] Sai thuật toán
            //if (i != indMin)
            //{
                arcmp[i].m_cp   = V2angOx(V2sub(xap[i], xap[indMin]));
                arcmp[i].m_data = &xap[i];
            //}
            //↑ N.V.Thuong [Comment out] Sai thuật toán
        }
        structsp::fox_qsort<FLT, const Vec2D* >(arcmp, xap.np);

        boOut.Add(xap[indMin]);     // giá trị đầu luôn là điểm min;
        // 3. Thực hiện thuật toán  Graham scan
        for (INT i = 0; i < xap.np; i++)
        {
            if (arcmp[i].m_data != &xap[indMin]) // Không push điểm min
            {
                if (boOut.np > 1)
                {
                    Orien ori=  V2oriex_point2line(boOut[boOut.np-2], boOut[boOut.np-1], *arcmp[i].m_data);

                    if (ori == Orien::COLLINEAR || ori == Orien::RIGHT_SIDE)
                    {
                        boOut.RemoveBack();
                    }
                }
                boOut.Add(*((const Vec2D*)arcmp[i].m_data));
            }
        }
        delete[] arcmp;

        return boOut;
    }

    ```

    C. Sử dụng thuật toán Alpha-Shapes <a id="Alpha_shapes"></a>

    <p class="img-post">
        <img src="./image/hull_alpha_shapes.png" >
    </p>

1. Thổi phồng polygon (Inflat) <a id="Inflat"></a>

    [Điều kiện]
    > Đầu vào polygon theo chiều CCW

    [Thuật toán]
    - Lặp mỗi cạnh chạy theo ngược chiều kim đồng hồ sẽ move ra một đoạn offset
    - Tìm giao điểm các đoạn mới đó chính là tọa độ polygon mới

    [Hạn chế]
    - Thuật toán này chưa xử lý trường hợp nó nhỏ hơn làm biến dạng polygon
    - Không hỗ trợ các loại bo đầu như (squared, round and mitered)

    </br>
    <p class="img-post">
        <img src="./image/maxbounding_offset_style.png" />
    </p>

    ```cpp

    VecPoint2D InflatPolygon(IN const VecPoint2D& poly, IN float fOffset)
    {
        int nPolyCnt = static_cast<int>(poly.size());
        int nNext = 0, nPre = 0;

        Line2D lnTemp;
        VecLine2D vecLineInflat; vecLineInflat.reserve(nPolyCnt);

        for (int i = 0; i < nPolyCnt; i++)
        {
            nNext = (i + 1) % nPolyCnt;

            Vec2D vNorInflat = NormalizeVector(poly[nNext] - poly[i]);

            // Note: axis direction
            vNorInflat = Rotate(vNorInflat, 90.f); 

            lnTemp.ptStart = Move(poly[i]    , vNorInflat, fOffset);
            lnTemp.ptEnd   = Move(poly[nNext], vNorInflat, fOffset);

            vecLineInflat.push_back(lnTemp);
        }

        VecPoint2D vecInflatPoly; vecInflatPoly.reserve(nPolyCnt);
        Point2D ptInter;
        int nLineCnt = static_cast<int>(vecLineInflat.size());

        for (int i = 0; i < nLineCnt; i++)
        {
            nPre = (nLineCnt + i - 1) % nLineCnt;

            if (Intersect2Line(vecLineInflat[nPre].ptStart, vecLineInflat[nPre].ptEnd,
                vecLineInflat[i].ptStart, vecLineInflat[i].ptEnd, &ptInter) == TRUE)
            {
                vecInflatPoly.push_back(ptInter);
            }
            else
            {
                vecInflatPoly.push_back(vecLineInflat[nPre].ptEnd);
            }
        }

        return vecInflatPoly;
    }

    ```

1. Giao điểm đường thẳng với polygon <a id="IntersectLine2Polygon"></a>

    Hàm [IntersectLine2Segment](#IntersectLine2Segment) đã được trình bày bên trên

    [Giá trị trả về]
    > int       : số lượng giao điểm tìm thấy
    > vecInter  : Danh sách giao điểm

    ```cpp
    int IntersectLine2Polygon(const Point2D&    ptLine1,	 //[in] Point on the line
	                          const Point2D&    ptLine2,	 //[in] Point on the line
                              const VecPoint2D& poly,	 //[in] polygon
                                    VecPoint2D* vecInter,  /*= NULL */   //[out] point list of intersections
                                    bool	    bOnlyCheck /*= FALSE*/) //[in]  only check if intersect or not
    {
        if (poly.size() < 3)
        {
            return 0;
        }

        int nNext, nInter = 0;
        int nPolyCount = static_cast<int>(poly.size());

        Point2D ptInter;
        for (int i = 0; i < nPolyCount; i++)
        {
            nNext = (i + 1) % nPolyCount; // next point index

            if (IntersectLine2Segment(ptLine1, ptLine2, poly[i], poly[nNext], &ptInter) == true)
            {
                nInter++;

                if (vecInter)
                {
                    vecInter->push_back(ptInter);
                }

                // Just intersect will return always.
                if (true == bOnlyCheck)
                {
                    break;
                }
            }
        }

        return nInter;
    }
    ```

1. Giao điểm đoạn thẳng với polygon <a id="IntersectSegment2Polygon"></a>


    Hàm [IntersectLine2Segment](#IntersectLine2Segment) đã được trình bày bên trên

    [Giá trị trả về]
    > int       : số lượng giao điểm tìm thấy
    > vecInter  : Danh sách giao điểm

    ```cpp
    int IntersectSegment2Polygon(const Point2D&     pt1,	 //[in] Point on the line
                                 const Point2D&     pt2,	 //[in] Point on the line
                                 const VecPoint2D&  poly, //[in] polygon
                                       VecPoint2D*  vecInter,  /*= NULL*/    //[out] point list of intersections
                                       bool		bOnlyCheck /*= FALSE*/) //[in]  only check if intersect or not
    {
        if (poly.size() < 3)
        {
            return 0;
        }

        int nNext, nInter = 0;
        int nPolyCount = static_cast<int>(poly.size());

        Point2D ptInter;
        for (int i = 0; i < nPolyCount; i++)
        {
            nNext = (i + 1) % nPolyCount; // next point index

            if (Intersect2Segment(pt1, pt2, poly[i], poly[nNext], &ptInter) == true)
            {
                nInter++;

                if (vecInter)
                {
                    vecInter->push_back(ptInter);
                }

                // Just intersect will return always.
                if (true == bOnlyCheck)
                {
                    break;
                }
            }
        }

        return nInter;
    }
    ```

1. Quan hệ điểm với polygon <a id="RelationPoint2Polygon"></a>

    Hàm [IsPointInLineSegment](#IsPointInLineSegment) đã được trình bày ở trên

    ```cpp
    // -1 outside | 0 on bound | 1 inside
    INT RelationPoint2Polygon(const Point2D& pt, const VecPoint2D& poly)
    {
        if (poly.size() < 3)
        {
            ASSERT(0);
            return -1;
        }

        float fMinX = poly[0].X;
        float fMaxX = poly[0].X;
        float fMinY = poly[0].Y;
        float fMaxY = poly[0].Y;

        int nPolyCount = static_cast<int>(poly.size());

        for (int i = 1; i < nPolyCount; i++)
        {
            fMinX = std::min<float>(poly[i].X, fMinX);
            fMaxX = std::max<float>(poly[i].X, fMaxX);
            fMinY = std::min<float>(poly[i].Y, fMinY);
            fMaxY = std::max<float>(poly[i].Y, fMaxY);
        }

        if (pt.X < fMinX || pt.X > fMaxX || pt.Y < fMinY || pt.Y > fMaxY)
            return -1;

        bool bInside = false;
        for (int i = 0, j = nPolyCount - 1; i < nPolyCount; j = i++)
        {
            if(RelationPoint2LineSegment(poly[i], poly[j]) <= 0>)
                return 0;

            if ((poly[i].Y > pt.Y) != (poly[j].Y > pt.Y) &&
                pt.X < (poly[j].X - poly[i].X) * (pt.Y - poly[i].Y) / (poly[j].Y - poly[i].Y) + poly[i].X)
            {
                bInside = !bInside;
            }

            // case inside edge and collinear
            else if (IsEqual(poly[i].Y, pt.Y, GEO_XY_EPSILON) &&
                     IsEqual(poly[j].Y, pt.Y, GEO_XY_EPSILON))
            {
                if ((poly[i].X > pt.X) != (poly[j].X > pt.X))
                {
                    return 0;
                }
            }
        }

        return bInside ? -1 : 1;
    }
    ```

1. Quan hệ giữa 2 polygon <a id="Relation2Polygon"></a>

    Hàm [IntersectSegment2Polygon](#IntersectSegment2Polygon) đã được trình bày ở trên.

    [Thuật toán]
    - Kiểm tra xem có điểm nào cạnh nào của polygon 1 và poly2 giao nhau hay không
    - Nếu không có giao nhau thì kiểm tra thuộc hoặc nằm ngoài
    - Nếu 1 điểm của poly1 thuộc poly2 -> poly1 nằm trong poly2
    - Nếu 1 điểm poly2 nằm trong poly1 -> poly2 nằm trong poly1
    - Còn lại là trường hợp 2 poly riêng biệt

    ```cpp
	// Enum relation two polygon
	enum EnumRel2Poly
	{
		INVALID   = -1,	// invalid param
		OUTSIDE   = 0,	// outside
		INTERSECT = 1,	// intersect
		INSIDE_1  = 2,	// poly1 inside poly2 
		INSIDE_2  = 3,	// poly2 inside poly1 
	};
    ```

    Thuật toán tìm liên hệ
    ```cpp
    EnumRel2Poly Relation2Polygon(const VecPoint2D& vecPoly1, const VecPoint2D& vecPoly2)
    {
        if (vecPoly1.size() < 3 || vecPoly2.size() < 3)
        {
            ASSERT(0);
            return EnumRel2Poly::INVALID;
        }

        int nNext;
        int nPolyCount = static_cast<int>(vecPoly1.size());

        // Case 1 : intersect - check 2 intersecting polygons
        for (int i = 0; i < nPolyCount; i++)
        {
            nNext = (i + 1) % nPolyCount; // next point index

            if (IntersectSegment2Polygon(vecPoly1[i], vecPoly1[nNext], vecPoly2, NULL, TRUE) >= 1)
                return EnumRel2Poly::INTERSECT;
        }

        // Case 2 : inside - check poly1 inside poly2 
        if (TRUE == IsPointInPolygon(vecPoly1[0], vecPoly2))
            return EnumRel2Poly::INSIDE_1;

        // Case 3 : inside - check poly2 inside poly1 
        if (TRUE == IsPointInPolygon(vecPoly2[0], vecPoly1))
            return EnumRel2Poly::INSIDE_2;

        // Case 4 (default): outside
        return EnumRel2Poly::OUTSIDE;
    }
    ```
1. Kiểm tra chiều polygon (CW, CCW) <a id="IsCCW"></a>

    Kiểm tra một polygon là ngược hay cùng chiều kim đồng hồ.

    Ở đây polygon được cho bởi danh sách các điểm.

    [Giá trị trả về]
    - true  : Ngược chiều kim đồng hồ
    - false : Cùng chiều kim đồng hồ

    <br>

    ```cpp
    bool IsCCW(IN const VecPoint2D& poly)
    {
        int nPolyCnt = static_cast<int>(poly.size());

        int nNext; float fSum = 0.f;

        for (int i = 0; i < nPolyCnt; i++)
        {
            nNext = (i + 1) % nPolyCnt;
            fSum += (poly[nNext].X - poly[i].X) * (poly[nNext].Y + poly[i].Y);
        }

        return (fSum <= 0.f) ? false : true;
    }
    ```
1. Đảo ngược polygon (CW <=> CCW) <a id="ReversePolygon"></a>

    Nó sẽ đảo ngược chiều quay hiện tại của polygon (CW-> CCW) và ngược lại 

    [Giá trị trả về]
    - Polygon mới đã bị đảo ngược (dạng tham chiếu)

    <br>

    ```cpp
    void ReversePolygon(IN VecPoint2D& poly)
    {
        int nPolyCnt = static_cast<int>(poly.size());

        int nHalf = (nPolyCnt - 1) / 2;

        for (int i = 1; i <= nHalf; i++)
        {
            std::swap(poly[i], poly[nPolyCnt - i]);
        }
    }
    ```

1. Khoảng cách gần nhất giữa 2 polygon <a id="GetClosestPolygonAndPolygon"></a>

    Tìm khoảng cách gần nhất giữa 2 polygon 

    [Trả về]
    - TRUE/ FALSE : có hoặc không.
    - Tọa độ 2 điểm gần nhất giữa 2 polygon là p1 và p2 tương ứng với POLY1 và POLY2.

    <br/>

    [Chú ý]
    - Trường hợp nằm trong hoặc giao sẽ bị bỏ qua.
    - Tự triển khai tìm quan hệ giữa 2 đường tròn.

    <br>

    ```cpp
    BOOL GetClosestPolygonAndPolygon(const VecPoint2D& poly1, const VecPoint2D& poly2, Point2D* pt1, Point2D* pt2)
    {
        EnumRel2Poly eRel = GetRelation2Polygon(poly1, poly2);

        if (eRel == EnumRel2Poly::INTERSECT ||
            eRel == EnumRel2Poly::INVALID   ||
            eRel == EnumRel2Poly::INSIDE_1  ||
            eRel == EnumRel2Poly::INSIDE_2)
            return FALSE;

        Point2D ptTemp;
        Point2D ptClosest11, ptClosest12;
        Point2D ptClosest21, ptClosest22;
        int nIdx1 = 0, nIdx2 = 0;

        auto fnFindClosest2Poly = [&](const VecPoint2D& _poly1, const VecPoint2D& _poly2,
            Point2D& _ptClosest1, Point2D& _ptClosest2, int& nIdx) ->void
        {
            float fDis, fMinDistance = -1;
            int i, nPolyCnt = static_cast<int>(_poly1.size());

            for (i = 0; i < nPolyCnt; i++)
            {
                ptTemp = GetClosestPoint2Polygon(_poly1[i], _poly2, false);

                fDis = GetMagnitude(ptTemp - _poly1[i]);

                if (fDis < fMinDistance || fMinDistance < 0)
                {
                    _ptClosest1 = _poly1[i];
                    _ptClosest2 = ptTemp;

                    nIdx = i;

                    fMinDistance = fDis;
                }
            }
        };

        /* Tìm điểm hoàn hảo hơn là điểm từ đỉnh. Nhìn trông sẽ đẹp hơn.
        * cần loại bỏ các điểm thẳng hàng trong polygon thì sẽ cho ra kết quả đẹp hơ
        * nIdx : closest index in _poly1
        * fMinDistance : min distance from _poly1 to _poly2
        */
        auto fnFindPerfectClosest = [&](int& nIdx, const float& fMinDistance,
            const VecPoint2D& _poly1, const VecPoint2D& _poly2,
            Point2D& _ptClosest1, Point2D& _ptClosest2) -> void
        {
            int nPolyCnt = static_cast<int>(_poly1.size());

            if (nIdx >= nPolyCnt)
                return;

            int nNext = (nIdx + 1) % nPolyCnt;
            int nPrev = (nPolyCnt + nIdx - 1) % nPolyCnt;

            Point2D ptPrevMid = kygeo::GetMidPoint(_poly1[nPrev], _poly1[nIdx]);
            Point2D ptNextMid = kygeo::GetMidPoint(_poly1[nNext], _poly1[nIdx]);

            Point2D ptPerfectPrev = GetClosestPoint2Polygon(ptPrevMid, _poly2, false);
            Point2D ptPerfectNext = GetClosestPoint2Polygon(ptNextMid, _poly2, false);

            float fPerfectPrevDis = kygeo::GetMagnitude(ptPerfectPrev - ptPrevMid);
            float fPerfectPNextDis = kygeo::GetMagnitude(ptPerfectNext - ptNextMid);

            if (kygeo::IsEqual(fPerfectPrevDis, fMinDistance, GEO_EPSILON))
            {
                _ptClosest1 = ptPrevMid;
                _ptClosest2 = ptPerfectPrev;
            }
            else if (kygeo::IsEqual(fPerfectPNextDis, fMinDistance, GEO_EPSILON))
            {
                _ptClosest1 = ptNextMid;
                _ptClosest2 = ptPerfectNext;
            }
        };


        fnFindClosest2Poly(poly1, poly2, ptClosest11, ptClosest12, nIdx1);
        fnFindClosest2Poly(poly2, poly1, ptClosest22, ptClosest21, nIdx2);

        float fClosestDis1 = GetMagnitude(ptClosest11 - ptClosest12);
        float fClosestDis2 = GetMagnitude(ptClosest21 - ptClosest22);

        if (fClosestDis1 <= fClosestDis2)
        {
            fnFindPerfectClosest(nIdx1, fClosestDis1, poly1, poly2, ptClosest11, ptClosest12);

            if (pt1) *pt1 = ptClosest11;
            if (pt2) *pt2 = ptClosest12;
        }
        else
        {
            fnFindPerfectClosest(nIdx2, fClosestDis2, poly2, poly1, ptClosest21, ptClosest22);

            if (pt1) *pt1 = ptClosest21;
            if (pt2) *pt2 = ptClosest22;
        }

        return TRUE;
    }
    ```

1. Khoảng cách gần nhất giữa điểm và polygon <a id="GetClosestPointAndPolygon"></a>

    Tìm khoảng cách gần nhất giữa một điểm và polygon 

    Trong hàm có sử dụng khoảng cách ngắn nhất từ một điểm xuống 1 đoạn thẳng tham khảo: [PerpPoint2Segment](#PerpPoint2Segment).
     
    [Trả về]
    - Tọa độ điểm gần nhất gần nhất. trường hợp nằm trong sẽ được kiểm tra. và trả về chính nó nếu xảy ra.

    <br/>

    [Chú ý]
    - Có thể tính luôn trường hợp nằm trong.

    <br>

    ```cpp
   Point2D GetClosestPointAndPolygon(const Point2D& pt, const VecPoint2D& poly, bool bIgnoreInside /*= true*/)
    {
        if (bIgnoreInside)
        {
            if (IsPointInPolygon(pt, poly) == TRUE)
            {
                return pt;
            }
        }

        int i, j;
        int nPolyCnt = static_cast<int>(poly.size());

        Point2D ptClosest = pt, ptTemp;
        float fMinDistance = -1, fDistance = 0;

        for (i = 0, j = nPolyCnt - 1; i < nPolyCnt; j = i++)
        {
            ptTemp = PerpPoint2Segment(pt, poly[i], poly[j]);

            fDistance = GetMagnitude(ptTemp - pt);

            if (fDistance < fMinDistance || fMinDistance < 0)
            {
                ptClosest = ptTemp;
                fMinDistance = fDistance;
            }
        }

        return ptClosest;
    }
    ```
## Tham khảo


