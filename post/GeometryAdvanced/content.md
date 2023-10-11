#  Geometry 2D Advanced 
---
<p style="text-align: right; font-size:12px;">
<b>Create date</b>: 2023.10.11 by <a href="#">thuong.nv</a>
</p>

## Mục lục

<div style="padding:20px; margin-bottom:20px; background-color: #f3f3f587;border-radius: 10px;">

* [Geometry 2D nâng cao](#geometry-2d-nâng-cao)
    * [Clip polygon](#Clip2Polygon)
        * [Sử dụng thuật toán Weiler Atherton](#Clip2PolygonUseWeilerAtherton)
        * [Sử dụng thuật toán Sutherland Hodgman](#Clip2PolygonUseSutherlandHodgman)
        <br>
    
</div>

## Giới thiệu 

Bài post này sẽ trình bày một vài thuật toán hình học 2D hay được sử dụng. Nó là nâng cao hơn và kết hợp nhiều bài toán nhỏ.


## Yêu cầu

Cần nắm vũng kiến thức hình học 2D cơ bản.

Ngoài ra trong bài post này sẽ sử dụng các thuật toán, hàm đã được trình bày ở 2 bài viết này.
Vì thế cần tìm hiểu trước khi bắt đầu.
- [Vector2D cơ bản](/post/GeometryVector/vector-2d.html)
- [Thuật toán 2D cơ bản](/post/GeometryAlgorithm/geo-algorithm-2d.html)

## Nội dung


##### <b>Geometry 2D nâng cao</b>
___

1. Clip polygon <a id="Clip2Polygon"></a>

    Clip một polygon và trả về danh sách các polygon đã được clip. Hay nói ngắn gọn phần giao giữa 2 polygon.

    Dưới đây sẽ trình bày 2 thuật toán clip polygon mỗi thuật toán sẽ cho ưu, nhược điểm khác nhau phụ thuộc vào mục đích.

    a. Sử dụng thuật toán Weiler Atherton.<a id="Clip2PolygonUseWeilerAtherton"></a>

    <p align="center">
        <img src="./image/clip_poly_weiler_atherton.png" />
    </p>

    [Thuật toán]
    - Tìm các giao điểm giữa 2 polygon
    - Sắp xếp chúng theo quy tắc mark, đánh dấu điểm vào và điểm ra
    - Sử dụng thuật toán weiler atherton để tiến hành tìm các poly clip

    <br>

    [Tham khảo]
    - https://www.geeksforgeeks.org/weiler-atherton-polygon-clipping-algorithm/

    <br>

    > Chú ý đầu vào của polyon phải quay theo ngược chiều kim đồng hồ

    ```cpp
    VecPolyList Clip2Polygon(IN const VecPoint2D& _poly, IN const VecPoint2D& _clipPoly)
    {
        typedef struct stMarkPoint
        {
            int     nIndex = -1;     // Intersection index
            bool    bEnter = false;  //  true : enter | 1: leaving
            Point2D	pt;

        } MarkPoint;

        typedef std::vector<MarkPoint> VecMarkPoint;

        if (_poly.size() < 3 || _clipPoly.size() < 3)
        {
            ASSERT(0);
            return VecPolyList();
        }

        VecPoint2D poly		= _poly;
        VecPoint2D clipPoly = _clipPoly;

        // If polygon is not counterclockwise will recalculate
        if (IsCCW(poly) == FALSE)	  ReversePolygon(poly);
        if (IsCCW(clipPoly) == FALSE) ReversePolygon(clipPoly);

        // Polygon inside clip polygon
        if (IsInsidePolygon(poly, clipPoly))
        {
            return VecPolyList({ poly });
        }

        VecMarkPoint vecMarkPoly, vecMarkClipPoly;
        std::map<int, VecMarkPoint> mapInterPoly, mapInterClipPoly;
        std::set<int> setUsedIndex;
        Point2D ptMid, ptTemp;

        int nPolyCnt     = static_cast<int>(poly.size());
        int nClipPolyCnt = static_cast<int>(clipPoly.size());

        auto funPushInterectionMarKPoint = [&](VecMarkPoint& vecPush, const Point2D& ptInter,
                                               const Point2D& ptOri, int nIndex)-> void
        {
            float fDisInter = GetMagnitude(ptInter - ptOri);

            bool bPushBack = true;

            for (int nInter = 0; nInter < vecPush.size(); nInter++)
            {
                float fDisCur = GetMagnitude(vecPush[nInter].pt - ptOri);

                if (fDisInter < fDisCur)
                {
                    vecPush.insert(vecPush.begin() + nInter, MarkPoint{ nIndex, false, ptInter });

                    bPushBack = false;
                    break;
                }
            }

            if (bPushBack)
            {
                vecPush.push_back(MarkPoint{ nIndex, false, ptInter });
            }

            return;
        };

        Point2D ptInter;
        int nIndexInter = 1; int nNextIdx, nClipNextIdx;

        // 1. Found intersection point, and push map inter
        for (int nIdx = 0; nIdx < nPolyCnt; nIdx++)
        {
            nNextIdx = (nIdx + 1) % nPolyCnt;

            for (int nClipIdx = 0; nClipIdx < nClipPolyCnt; nClipIdx++)
            {
                nClipNextIdx = (nClipIdx + 1) % nClipPolyCnt; // next point index

                if (Intersect2Segment(poly[nIdx], poly[nNextIdx], clipPoly[nClipIdx], clipPoly[nClipNextIdx], &ptInter))
                {
                    // Push to map poly intersection
                    auto itClip = mapInterPoly.insert(std::make_pair(nIdx, VecMarkPoint{{ nIndexInter, false, ptInter}}));

                    if (itClip.second == false)
                    {
                        VecMarkPoint& vecInter = itClip.first->second;
                        funPushInterectionMarKPoint(vecInter, ptInter, poly[nIdx], nIndexInter);
                    }

                    // Push map clip poly intersection
                    auto it = mapInterClipPoly.insert(std::make_pair(nClipIdx, VecMarkPoint{{ nIndexInter, false, ptInter}}));

                    if (it.second == false)
                    {
                        VecMarkPoint& vecInter = it.first->second;
                        funPushInterectionMarKPoint(vecInter, ptInter, clipPoly[nClipIdx], nIndexInter);
                    }

                    nIndexInter++;
                }
            }
        }

        vecMarkPoly.reserve(poly.size() + static_cast<size_t>(nIndexInter) * 2);
        vecMarkClipPoly.reserve(clipPoly.size() + static_cast<size_t>(nIndexInter) * 2);

        // 2. Create two mark poly and clip poly data;
        MarkPoint markPoint;
        for (int i = 0; i < nPolyCnt; i++)
        {
            markPoint.pt = poly[i];
            markPoint.nIndex = -1;
            markPoint.bEnter = false;

            vecMarkPoly.push_back(markPoint);

            auto itFound = mapInterPoly.find(i);

            if (itFound != mapInterPoly.end())
            {
                int nInterCnt = static_cast<int>(itFound->second.size());
                VecMarkPoint& vecInters = itFound->second;

                for (int ii = 0; ii < nInterCnt; ii++)
                {
                    markPoint.pt = vecInters[ii].pt;
                    markPoint.nIndex = vecInters[ii].nIndex;
                    markPoint.bEnter = false;

                    int nNextIdx = ii + 1;

                    ptTemp = (nNextIdx < nInterCnt) ? vecInters[nNextIdx].pt : poly[(i + 1) % nPolyCnt];

                    ptMid = GetMidPoint(vecInters[ii].pt, ptTemp);

                    if (IsPointInPolygon(ptMid, clipPoly) == TRUE)
                    {
                        markPoint.bEnter = true;
                    }

                    vecMarkPoly.push_back(markPoint);
                }
            }
        }

        for (int i = 0; i < nClipPolyCnt; i++)
        {
            markPoint.pt = clipPoly[i];
            markPoint.nIndex = -1;
            markPoint.bEnter = false;

            vecMarkClipPoly.push_back(markPoint);

            auto itFound = mapInterClipPoly.find(i);

            if (itFound != mapInterClipPoly.end())
            {
                int nInterCnt = static_cast<int>(itFound->second.size());
                VecMarkPoint& vecInters = itFound->second;

                for (int ii = 0; ii < nInterCnt; ii++)
                {
                    markPoint.pt = vecInters[ii].pt;
                    markPoint.nIndex = vecInters[ii].nIndex;

                    markPoint.bEnter = false;

                    int nNextIdx = ii + 1;

                    ptTemp = (nNextIdx < nInterCnt) ? vecInters[nNextIdx].pt : clipPoly[(i + 1) % nClipPolyCnt];

                    ptMid = GetMidPoint(vecInters[ii].pt, ptTemp);

                    if (IsPointInPolygon(ptMid, poly) == TRUE)
                    {
                        markPoint.bEnter = true;
                    }

                    vecMarkClipPoly.push_back(markPoint);
                }
            }
        }

        auto funIsMarkPointEnter = [&](const MarkPoint& mark_point) -> bool
        {
            return (mark_point.nIndex >= 0 && mark_point.bEnter);
        };

        auto funIsMarkPointLeave = [&](const MarkPoint& mark_point) -> bool
        {
            return (mark_point.nIndex >= 0 && !mark_point.bEnter);
        };

        auto funFindVertexEnd = [&](VecPoint2D& _vecResultClip, int _nSIndex, int _nEIndex) -> bool
        {
            bool bRet = false, bContinue = false;
            int nStartIdx = _nSIndex, nEndIdx = _nEIndex;
            int nCurIdx = -1;

            bool bUseMarkList = false; // true (mark) | false (mark clip)

            VecMarkPoint* pVecMarkFind;

            while (true)
            {
                bContinue = false;

                nCurIdx = -1;

                if (bUseMarkList)	pVecMarkFind = &vecMarkPoly;
                else				pVecMarkFind = &vecMarkClipPoly;

                bUseMarkList = !bUseMarkList;

                int nMarkPoly = static_cast<int>(pVecMarkFind->size());

                for (int i = 0; i < nMarkPoly; i++)
                {
                    if ((*pVecMarkFind)[i].nIndex == nStartIdx &&
                        (*pVecMarkFind)[i].bEnter == true) //enter
                    {

                        nCurIdx = i;
                        break;
                    }
                }

                if (nCurIdx == -1)
                    return false;

                setUsedIndex.insert(nStartIdx);

                for (int i = 1; i < nMarkPoly; i++)
                {
                    MarkPoint& markPointClip = (*pVecMarkFind)[(nCurIdx + i) % nMarkPoly];

                    // found end point -> end
                    if (markPointClip.nIndex == nEndIdx)
                    {
                        bRet = true;
                        break;
                    }

                    _vecResultClip.push_back(markPointClip.pt);

                    // found leaving point
                    if (funIsMarkPointLeave(markPointClip))
                    {
                        nStartIdx = markPointClip.nIndex;
                        bContinue = true;
                        break;
                    }
                }

                if (bContinue) continue;

                return bRet;
            }

            return false;
        };

        // 3. emplement Weiler Atherton algorithm 
        VecPolyList vecClips; VecPoint2D vecClip;

        int nMarkPolyCnt = static_cast<int>(vecMarkPoly.size());

        for (int i = 0; i < nMarkPolyCnt; i++)
        {
            MarkPoint& markpt = vecMarkPoly[i];

            if (funIsMarkPointEnter(markpt) && setUsedIndex.find(markpt.nIndex) == setUsedIndex.end())
            {
                bool bClose = false;

                vecClip.push_back(markpt.pt);

                for (int nNext = 1; nNext < vecMarkPoly.size(); nNext++)
                {
                    MarkPoint& markNextpt = vecMarkPoly[(i + nNext) % vecMarkPoly.size()];

                    vecClip.push_back(markNextpt.pt);

                    if (funIsMarkPointLeave(markNextpt))
                    {
                        bClose = funFindVertexEnd(vecClip, markNextpt.nIndex, markpt.nIndex);
                        break;
                    }
                }

                if (bClose)
                {
                    vecClips.push_back(vecClip);
                }

                vecClip.clear();
            }
        }

        return vecClips;
    }

    ```
    <br>

    b. Sử dụng thuật toán Weiler Atherton.<a id="Clip2PolygonUseSutherlandHodgman"></a>

    <p align="center">
        <img src="./image/clip_poly_weiler_atherton.png" />
    </p>

    [Ưu nhược điểm]

    | Ưu điểm                   | Nhược điểm                            | 
    | :---                      | :----                                 |
    | - Dễ triển khai           | - Chỉ sử dụng với convex polygon      | 
    |                           | - Chỉ có 1 polygon được trả về        | 

    [Thuật toán]
    - Tìm các giao điểm giữa 2 polygon
    - Sắp xếp chúng theo quy tắc mark, đánh dấu điểm vào và điểm ra
    - Sử dụng thuật toán weiler atherton để tiến hành tìm các poly clip

    <br>

    [Tham khảo]
    - https://en.wikipedia.org/wiki/Sutherland–Hodgman_algorithm

    <br>

    ```cpp
    VecPoint2D Clip2Polygon(IN const VecPoint2D& poly, IN const Rect2D& clipRect)
    {
        // Allway right (ccw)
        VecPoint2D vecClipRect = ConvertRectF2Points(clipRect);

        if (vecClipRect.size() < 3 || poly.size() < 3)
        {
            ASSERT(0);
            return VecPoint2D();
        }

        VecPoint2D vecOutPoints = poly;

        // If polygon is not counterclockwise will recalculate
        if (IsCCW(vecOutPoints) == FALSE) ReversePolygon(vecOutPoints);

        int nClipCnt = static_cast<int>(vecClipRect.size());
        int nVertexCnt = 0;

        Point2D ptInter, ptSEdge, ptEEdge;

        for (int nEdge = 0; nEdge < nClipCnt; nEdge++)
        {
            ptSEdge = vecClipRect[nEdge];
            ptEEdge = vecClipRect[(nEdge + 1) % nClipCnt];

            VecPoint2D vecInputPoints = std::move(vecOutPoints);
            nVertexCnt = static_cast<int>(vecInputPoints.size());

            vecOutPoints.clear();

            for (int nVertex = 0; nVertex < nVertexCnt; nVertex++)
            {
                Point2D ptCur = vecInputPoints[nVertex];
                Point2D ptNext = vecInputPoints[(nVertex + 1) % nVertexCnt];

                EnumOrien eRetOriCur = GetOrientationPoint2Vector(ptCur, ptSEdge, ptEEdge);
                EnumOrien eRetOriNext = GetOrientationPoint2Vector(ptNext, ptSEdge, ptEEdge);

                if (eRetOriCur == EnumOrien::LEFT) // left
                {
                    vecOutPoints.push_back(ptCur);

                    if (eRetOriNext == EnumOrien::COLLINEAR ||
                        eRetOriNext == EnumOrien::RIGHT)
                    {
                        if (Intersect2Line(ptCur, ptNext, ptSEdge, ptEEdge, &ptInter))
                        {
                            vecOutPoints.push_back(ptInter);
                        }
                    }
                }
                else if (eRetOriNext == EnumOrien::LEFT)
                {
                    if (Intersect2Line(ptCur, ptNext, ptSEdge, ptEEdge, &ptInter))
                    {
                        vecOutPoints.push_back(ptInter);
                    }
                }
            }
        }

        return vecOutPoints;
    }
    
    ```




## Tham khảo


