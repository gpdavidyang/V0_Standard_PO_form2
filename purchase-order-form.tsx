"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Trash2, Upload, Copy } from "lucide-react"

interface PurchaseItem {
  category: string
  subCategory1: string
  subCategory2: string
  item: string
  quantity: string
  unit: string
  unitPrice: string
  price: number
  vendor: string
  deliveryLocation: string
  note: string
}

// Helper functions for number formatting
function formatNumberWithCommas(value: string | number): string {
  if (!value) return ""
  const numValue = typeof value === "string" ? value.replace(/,/g, "") : value.toString()
  return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function removeCommas(value: string): string {
  return value.replace(/,/g, "")
}

export default function PurchaseOrderForm() {
  const [items, setItems] = useState<PurchaseItem[]>([createEmptyItem()])
  const [isNegotiable, setIsNegotiable] = useState(false)

  function createEmptyItem(): PurchaseItem {
    return {
      category: "",
      subCategory1: "",
      subCategory2: "",
      item: "",
      quantity: "",
      unit: "",
      unitPrice: "",
      price: 0,
      vendor: "",
      deliveryLocation: "",
      note: "",
    }
  }

  function handleItemChange(index: number, field: keyof PurchaseItem, value: string) {
    const newItems = [...items]

    // Remove commas for calculation
    if (field === "quantity" || field === "unitPrice") {
      const cleanValue = removeCommas(value)
      newItems[index] = { ...newItems[index], [field]: cleanValue }

      const quantity = Number.parseFloat(removeCommas(newItems[index].quantity) || "0")
      const unitPrice = Number.parseFloat(removeCommas(newItems[index].unitPrice) || "0")
      newItems[index].price = quantity * unitPrice
    } else {
      newItems[index] = { ...newItems[index], [field]: value }
    }

    setItems(newItems)
  }

  function addItem() {
    setItems([...items, createEmptyItem()])
  }

  function removeItem(index: number) {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index)
      setItems(newItems)
    }
  }

  function copyItem(index: number) {
    const itemToCopy = { ...items[index] }
    const newItems = [...items]
    newItems.splice(index + 1, 0, itemToCopy)
    setItems(newItems)
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">📋 표준 발주서 작성</h1>
        </div>

        {/* 기본 정보 입력 */}
        <Card className="shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg text-gray-800">기본 정보 입력</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="site">현장 선택</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="현장을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site-a">현장 A</SelectItem>
                    <SelectItem value="site-b">현장 B</SelectItem>
                    <SelectItem value="site-c">현장 C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>납품희망일</Label>
                <div className="flex gap-3 items-center">
                  <Input type="date" className="flex-1" disabled={isNegotiable} />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="negotiable"
                      checked={isNegotiable}
                      onCheckedChange={(checked) => setIsNegotiable(checked as boolean)}
                    />
                    <Label htmlFor="negotiable" className="text-sm">
                      협의
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiver">자재 인수자</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="인수자를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hong">홍길동 - a@aaa.com</SelectItem>
                    <SelectItem value="lee">이철수 - b@bbb.com</SelectItem>
                    <SelectItem value="kim">김영희 - e@eee.com</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager">본사 담당자</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="담당자를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="park">박사원 - c@ccc.com</SelectItem>
                    <SelectItem value="choi">최주임 - d@ddd.com</SelectItem>
                    <SelectItem value="jung">정대리 - f@fff.com</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="files">첨부파일</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <Input type="file" multiple className="hidden" id="file-upload" />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm text-gray-600">파일을 선택하거나 여기에 드래그하세요</span>
                  </Label>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">특이사항</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="특별한 요청사항이나 주의사항을 입력하세요"
                  className="resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 품목 입력 */}
        <Card className="shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-gray-800">품목 입력</CardTitle>
              <Button onClick={addItem} variant="outline" size="sm" className="gap-2 bg-transparent">
                <PlusCircle className="w-4 h-4" /> 행 추가
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {items.map((item, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* 분류 정보 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700 border-b pb-1">분류 정보</h4>
                      <div className="space-y-2">
                        <Select
                          value={item.category}
                          onValueChange={(value) => handleItemChange(index, "category", value)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="대분류" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="건축자재">건축자재</SelectItem>
                            <SelectItem value="전기자재">전기자재</SelectItem>
                            <SelectItem value="배관자재">배관자재</SelectItem>
                            <SelectItem value="마감자재">마감자재</SelectItem>
                            <SelectItem value="기계설비">기계설비</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={item.subCategory1}
                          onValueChange={(value) => handleItemChange(index, "subCategory1", value)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="중분류" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="철근">철근</SelectItem>
                            <SelectItem value="콘크리트">콘크리트</SelectItem>
                            <SelectItem value="목재">목재</SelectItem>
                            <SelectItem value="타일">타일</SelectItem>
                            <SelectItem value="페인트">페인트</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={item.subCategory2}
                          onValueChange={(value) => handleItemChange(index, "subCategory2", value)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="소분류" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="D10">D10</SelectItem>
                            <SelectItem value="D13">D13</SelectItem>
                            <SelectItem value="D16">D16</SelectItem>
                            <SelectItem value="D19">D19</SelectItem>
                            <SelectItem value="D22">D22</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* 품목 및 수량 정보 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700 border-b pb-1">품목 및 수량</h4>
                      <div className="space-y-2">
                        <Input
                          value={item.item}
                          onChange={(e) => handleItemChange(index, "item", e.target.value)}
                          className="text-sm"
                          placeholder="품목명"
                        />
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={formatNumberWithCommas(item.quantity)}
                            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                            className="text-sm flex-1"
                            placeholder="수량"
                          />
                          <Select value={item.unit} onValueChange={(value) => handleItemChange(index, "unit", value)}>
                            <SelectTrigger className="text-sm w-24">
                              <SelectValue placeholder="단위" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ea">ea</SelectItem>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="m2">m²</SelectItem>
                              <SelectItem value="m3">m³</SelectItem>
                              <SelectItem value="m">m</SelectItem>
                              <SelectItem value="ton">ton</SelectItem>
                              <SelectItem value="box">box</SelectItem>
                              <SelectItem value="roll">roll</SelectItem>
                              <SelectItem value="bag">bag</SelectItem>
                              <SelectItem value="sheet">sheet</SelectItem>
                              <SelectItem value="set">set</SelectItem>
                              <SelectItem value="L">L</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                            ₩
                          </span>
                          <Input
                            type="text"
                            value={formatNumberWithCommas(item.unitPrice)}
                            onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                            className="text-sm pl-6"
                            placeholder="단가"
                          />
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">금액: </span>
                          <span className="text-sm font-medium text-gray-900">₩{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* 거래처 및 납품 정보 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700 border-b pb-1">거래처 및 납품</h4>
                      <div className="space-y-2">
                        <Select value={item.vendor} onValueChange={(value) => handleItemChange(index, "vendor", value)}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="거래처" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="대한건설자재">대한건설자재</SelectItem>
                            <SelectItem value="한국철강">한국철강</SelectItem>
                            <SelectItem value="삼성물산">삼성물산</SelectItem>
                            <SelectItem value="현대건설자재">현대건설자재</SelectItem>
                            <SelectItem value="포스코">포스코</SelectItem>
                            <SelectItem value="LG화학">LG화학</SelectItem>
                            <SelectItem value="동부건설자재">동부건설자재</SelectItem>
                            <SelectItem value="태영건설">태영건설</SelectItem>
                            <SelectItem value="금강건재">금강건재</SelectItem>
                            <SelectItem value="한화건설">한화건설</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={item.deliveryLocation}
                          onValueChange={(value) => handleItemChange(index, "deliveryLocation", value)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="납품처" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="현장A창고">현장A 창고</SelectItem>
                            <SelectItem value="현장B창고">현장B 창고</SelectItem>
                            <SelectItem value="현장C창고">현장C 창고</SelectItem>
                            <SelectItem value="본사창고">본사 창고</SelectItem>
                            <SelectItem value="임시보관소">임시 보관소</SelectItem>
                            <SelectItem value="협력업체창고">협력업체 창고</SelectItem>
                            <SelectItem value="직접납품">직접 납품</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={item.note}
                          onChange={(e) => handleItemChange(index, "note", e.target.value)}
                          className="text-sm"
                          placeholder="비고"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyItem(index)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 gap-1"
                    >
                      <Copy className="w-4 h-4" />
                      복사
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      삭제
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* 합계 */}
            <div className="border-t bg-gray-50 px-6 py-4 rounded-lg">
              <div className="flex justify-end">
                <div className="text-lg font-semibold text-gray-900">총 금액: ₩{totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button variant="outline" className="sm:w-auto w-full bg-transparent">
            이전
          </Button>
          <Button variant="secondary" className="sm:w-auto w-full">
            {"임시저장"}
          </Button>
          <Button className="sm:w-auto w-full bg-blue-600 hover:bg-blue-700">승인요청</Button>
        </div>
      </div>
    </div>
  )
}
