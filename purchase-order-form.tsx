"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Copy, Trash2, Mail, Eye, Upload, CheckCircle, Clock, AlertTriangle } from "lucide-react"

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

type ApprovalStatus = "draft" | "pending" | "approved" | "rejected" | "skipped"

export default function PurchaseOrderForm() {
  const [items, setItems] = useState<PurchaseItem[]>([createEmptyItem()])
  const [isNegotiable, setIsNegotiable] = useState(false)
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>("draft")
  const [poNumber, setPoNumber] = useState("PO-2024-001")
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [allowSkipApproval, setAllowSkipApproval] = useState(true) // 시스템 설정

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

  // Helper functions for number formatting
  const formatNumber = (value: string): string => {
    const number = value.replace(/,/g, "")
    if (isNaN(Number(number))) return value
    return Number(number).toLocaleString()
  }

  const parseNumber = (value: string): number => {
    return Number(value.replace(/,/g, "")) || 0
  }

  function handleItemChange(index: number, field: keyof PurchaseItem, value: string) {
    const newItems = [...items]
    newItems[index][field] = value as never

    if (field === "quantity" || field === "unitPrice") {
      const quantity = parseNumber(newItems[index].quantity)
      const unitPrice = parseNumber(newItems[index].unitPrice)
      newItems[index].price = quantity * unitPrice
    }

    setItems(newItems)
  }

  function addItem() {
    setItems([...items, createEmptyItem()])
  }

  function copyItem(index: number) {
    const newItems = [...items]
    const copiedItem = { ...newItems[index] }
    newItems.splice(index + 1, 0, copiedItem)
    setItems(newItems)
  }

  function removeItem(index: number) {
    if (items.length > 1) {
      const newItems = [...items]
      newItems.splice(index, 1)
      setItems(newItems)
    }
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0)

  const handleSave = () => {
    // 임시저장 로직
    console.log("발주서 임시저장")
  }

  const handleRequestApproval = () => {
    setApprovalStatus("pending")
    setShowApprovalDialog(false)
    // 승인 요청 로직
    console.log("승인 요청")
  }

  const handleSkipApproval = () => {
    setApprovalStatus("skipped")
    setShowApprovalDialog(false)
    // 승인 생략 로직
    console.log("승인 생략")
  }

  const handlePreviewPDF = () => {
    // 같은 창에서 PDF 미리보기 페이지로 이동
    window.location.href = "/preview-pdf"
  }

  const handleSendEmail = () => {
    // 같은 창에서 이메일 발송 페이지로 이동
    window.location.href = "/send-email"
  }

  const handleNextStep = () => {
    // 같은 창에서 승인 프로세스 페이지로 이동
    window.location.href = "/approval-process"
  }

  const getStatusBadge = () => {
    switch (approvalStatus) {
      case "draft":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            <Clock className="w-3 h-3 mr-1" />
            작성중
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            승인 대기중
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            승인 완료
          </Badge>
        )
      case "skipped":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            승인 생략
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            승인 반려
          </Badge>
        )
      default:
        return null
    }
  }

  const canProceedToNext = approvalStatus === "approved" || approvalStatus === "skipped"

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">📋 표준 발주서 작성</h1>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {poNumber}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {new Date().toLocaleDateString("ko-KR")}
            </Badge>
          </div>
        </div>

        {/* 기본 정보 입력 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보 입력</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site">현장 선택</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="현장을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site-a">12층 건설현장</SelectItem>
                  <SelectItem value="site-b">15층 오피스텔</SelectItem>
                  <SelectItem value="site-c">아파트 단지 A동</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery-date">납품희망일</Label>
              <div className="flex gap-2 items-center">
                <Input type="date" disabled={isNegotiable} className="flex-1" />
                <div className="flex items-center gap-2">
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
                  <SelectItem value="hong">홍길동 - hong@site.com</SelectItem>
                  <SelectItem value="lee">이철수 - lee@site.com</SelectItem>
                  <SelectItem value="kim">김영희 - kim@site.com</SelectItem>
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
                  <SelectItem value="park">박사원 - park@company.com</SelectItem>
                  <SelectItem value="choi">최주임 - choi@company.com</SelectItem>
                  <SelectItem value="jung">정대리 - jung@company.com</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="files">첨부파일</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <Input type="file" multiple className="hidden" id="file-upload" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="text-gray-500">파일을 드래그하거나 클릭하여 업로드</div>
                    <div className="text-sm text-gray-400">도면, 규격서, 사진 등 (PDF, 이미지, 문서 파일 지원)</div>
                  </div>
                </Label>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">특이사항</Label>
              <Textarea id="notes" rows={3} placeholder="특별한 요청사항이나 주의사항을 입력하세요" />
            </div>
          </CardContent>
        </Card>

        {/* 품목 입력 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>품목 입력</CardTitle>
            <Button onClick={addItem} variant="outline" className="gap-2 bg-transparent">
              <PlusCircle className="w-4 h-4" />
              품목 추가
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">품목 #{index + 1}</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyItem(index)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      복사
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      삭제
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 분류 정보 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700 border-b pb-1">분류 정보</h5>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-gray-600">대분류</Label>
                        <Select
                          value={item.category}
                          onValueChange={(value) => handleItemChange(index, "category", value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="건축자재">건축자재</SelectItem>
                            <SelectItem value="전기자재">전기자재</SelectItem>
                            <SelectItem value="배관자재">배관자재</SelectItem>
                            <SelectItem value="마감자재">마감자재</SelectItem>
                            <SelectItem value="기계설비">기계설비</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">중분류</Label>
                        <Select
                          value={item.subCategory1}
                          onValueChange={(value) => handleItemChange(index, "subCategory1", value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="철근">철근</SelectItem>
                            <SelectItem value="콘크리트">콘크리트</SelectItem>
                            <SelectItem value="목재">목재</SelectItem>
                            <SelectItem value="타일">타일</SelectItem>
                            <SelectItem value="페인트">페인트</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">소분류</Label>
                        <Select
                          value={item.subCategory2}
                          onValueChange={(value) => handleItemChange(index, "subCategory2", value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="선택" />
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
                  </div>

                  {/* 품목 및 수량 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700 border-b pb-1">품목 및 수량</h5>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-gray-600">품목명</Label>
                        <Input
                          value={item.item}
                          onChange={(e) => handleItemChange(index, "item", e.target.value)}
                          placeholder="품목명 입력"
                          className="h-8"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-gray-600">수량</Label>
                          <Input
                            value={formatNumber(item.quantity)}
                            onChange={(e) => handleItemChange(index, "quantity", e.target.value.replace(/,/g, ""))}
                            placeholder="0"
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">단위</Label>
                          <Select value={item.unit} onValueChange={(value) => handleItemChange(index, "unit", value)}>
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="단위" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ea">ea (개)</SelectItem>
                              <SelectItem value="kg">kg (킬로그램)</SelectItem>
                              <SelectItem value="m2">m² (제곱미터)</SelectItem>
                              <SelectItem value="m3">m³ (세제곱미터)</SelectItem>
                              <SelectItem value="m">m (미터)</SelectItem>
                              <SelectItem value="ton">ton (톤)</SelectItem>
                              <SelectItem value="box">box (박스)</SelectItem>
                              <SelectItem value="roll">roll (롤)</SelectItem>
                              <SelectItem value="bag">bag (포)</SelectItem>
                              <SelectItem value="sheet">sheet (장)</SelectItem>
                              <SelectItem value="set">set (세트)</SelectItem>
                              <SelectItem value="L">L (리터)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-gray-600">단가</Label>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              ₩
                            </span>
                            <Input
                              value={formatNumber(item.unitPrice)}
                              onChange={(e) => handleItemChange(index, "unitPrice", e.target.value.replace(/,/g, ""))}
                              placeholder="0"
                              className="h-8 pl-6"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">금액</Label>
                          <div className="h-8 px-3 py-1 bg-gray-50 border rounded text-sm flex items-center font-medium">
                            ₩{item.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 거래처 및 납품 */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700 border-b pb-1">거래처 및 납품</h5>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-gray-600">거래처</Label>
                        <Select value={item.vendor} onValueChange={(value) => handleItemChange(index, "vendor", value)}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="선택" />
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
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">납품처</Label>
                        <Select
                          value={item.deliveryLocation}
                          onValueChange={(value) => handleItemChange(index, "deliveryLocation", value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="선택" />
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
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">비고</Label>
                        <Textarea
                          value={item.note}
                          onChange={(e) => handleItemChange(index, "note", e.target.value)}
                          placeholder="특이사항 입력"
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 총 금액 */}
            <div className="flex justify-end pt-4 border-t">
              <div className="text-right">
                <div className="text-sm text-gray-600">총 금액</div>
                <div className="text-2xl font-bold text-gray-900">₩{totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pb-8">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreviewPDF} className="gap-2 bg-transparent">
              <Eye className="w-4 h-4" />
              PDF 미리보기
            </Button>
            {canProceedToNext && (
              <Button variant="outline" onClick={handleSendEmail} className="gap-2 bg-transparent">
                <Mail className="w-4 h-4" />
                이메일 발송
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="lg">
              이전
            </Button>
            <Button variant="secondary" size="lg" onClick={handleSave}>
              임시저장
            </Button>

            {approvalStatus === "draft" && (
              <Button size="lg" onClick={handleNextStep}>
                다음 단계
              </Button>
            )}

            {approvalStatus === "pending" && (
              <Button size="lg" disabled>
                승인 대기중
              </Button>
            )}

            {canProceedToNext && (
              <Button size="lg" onClick={handleSendEmail}>
                이메일 발송
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
