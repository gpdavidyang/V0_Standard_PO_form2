"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, Download, Mail, ArrowLeft, FileText, ImageIcon } from "lucide-react"
import Image from "next/image"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: string
}

export default function PreviewPDFPage() {
  const [zoomLevel, setZoomLevel] = useState(100)

  const [uploadedFiles] = useState<UploadedFile[]>([
    { id: "1", name: "구조도면_12층.dwg", type: "drawing", size: "2.3MB" },
    { id: "2", name: "자재명세서.xlsx", type: "document", size: "156KB" },
    { id: "3", name: "현장사진.jpg", type: "image", size: "4.1MB" },
  ])

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50))

  const handleDownloadPDF = () => {
    // PDF 다운로드 로직
    console.log("PDF 다운로드")
  }

  const handleSendEmail = () => {
    // 같은 창에서 이메일 발송 페이지로 이동
    window.location.href = "/send-email"
  }

  const handleGoBack = () => {
    window.history.back()
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "drawing":
        return <FileText className="w-4 h-4 text-blue-500" />
      case "image":
        return <ImageIcon className="w-4 h-4 text-green-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleGoBack} className="gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                돌아가기
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">📄 발주서 PDF 미리보기</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-sm">
                    PO-2024-001
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-200">승인 완료</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">{zoomLevel}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* PDF Preview - Main Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)]">
              <CardContent className="p-4 h-full">
                <div className="h-full border-2 border-dashed border-gray-200 rounded-lg bg-white overflow-auto">
                  <div
                    className="mx-auto bg-white shadow-lg"
                    style={{
                      width: `${(210 * zoomLevel) / 100}mm`,
                      minHeight: `${(297 * zoomLevel) / 100}mm`,
                      transform: `scale(${Math.min(1, zoomLevel / 100)})`,
                      transformOrigin: "top center",
                    }}
                  >
                    {/* Mock PDF Content */}
                    <div className="p-8 text-xs leading-tight relative">
                      {/* Header with Title and Approval Table */}
                      <div className="flex items-start justify-between mb-6 border-b-2 border-gray-300 pb-4">
                        {/* Title - Left aligned */}
                        <div className="flex-shrink-0">
                          <h2 className="text-3xl font-bold">표준 발주서</h2>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Approval Table */}
                        <div className="flex-shrink-0">
                          <table className="border-collapse border border-gray-400 text-xs">
                            <thead>
                              <tr>
                                <th className="border border-gray-400 p-1 bg-gray-100 text-xs">담당</th>
                                <th className="border border-gray-400 p-1 bg-gray-100 text-xs">승인</th>
                                <th className="border border-gray-400 p-1 bg-gray-100 text-xs">팀장</th>
                                <th className="border border-gray-400 p-1 bg-gray-100 text-xs">임원</th>
                                <th className="border border-gray-400 p-1 bg-gray-100 text-xs">사장</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-400 p-2 w-12 h-12"></td>
                                <td className="border border-gray-400 p-2 w-12 h-12"></td>
                                <td className="border border-gray-400 p-2 w-12 h-12"></td>
                                <td className="border border-gray-400 p-2 w-12 h-12"></td>
                                <td className="border border-gray-400 p-2 w-12 h-12"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-2 gap-6 mb-6 text-xs">
                        <div className="space-y-1">
                          <p>
                            <strong>발주서 번호:</strong> PO-2024-001
                          </p>
                          <p>
                            <strong>현장:</strong> 12층 건설현장
                          </p>
                          <p>
                            <strong>납품희망일:</strong> 2024-07-05
                          </p>
                          <p>
                            <strong>작성일:</strong> 2024-06-30
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p>
                            <strong>자재 인수자:</strong> 이현장 (lee@site.com)
                          </p>
                          <p>
                            <strong>본사 담당자:</strong> 김본부 (kim@company.com)
                          </p>
                          <p>
                            <strong>승인 상태:</strong> 승인 완료
                          </p>
                          <p>
                            <strong>승인일:</strong> 2024-06-30
                          </p>
                        </div>
                      </div>

                      {/* Vendor and Delivery Location Information */}
                      <div className="mb-6">
                        <h4 className="font-bold mb-3 border-b border-gray-300 pb-1">거래처 및 납품처 정보</h4>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          {/* 거래처 정보 */}
                          <div>
                            <h5 className="font-medium mb-2 text-gray-700">거래처</h5>
                            <div className="space-y-2">
                              <div className="border rounded p-2 bg-gray-50">
                                <p className="font-medium">한국철강</p>
                                <p>주소: 경기도 안산시 단원구 성곡동 685-1</p>
                                <p>전화: 031-123-4567 | 이메일: info@koreasteel.co.kr</p>
                              </div>
                              <div className="border rounded p-2 bg-gray-50">
                                <p className="font-medium">대한건설자재</p>
                                <p>주소: 서울특별시 강서구 화곡동 1234-5</p>
                                <p>전화: 02-987-6543 | 이메일: sales@daehanmat.com</p>
                              </div>
                              <div className="border rounded p-2 bg-gray-50">
                                <p className="font-medium">삼성물산</p>
                                <p>주소: 서울특별시 서초구 서초대로 74길 11</p>
                                <p>전화: 02-555-0123 | 이메일: contact@samsungct.com</p>
                              </div>
                            </div>
                          </div>

                          {/* 납품처 정보 */}
                          <div>
                            <h5 className="font-medium mb-2 text-gray-700">납품처</h5>
                            <div className="space-y-2">
                              <div className="border rounded p-2 bg-blue-50">
                                <p className="font-medium">현장A 창고</p>
                                <p>주소: 서울특별시 강남구 역삼동 123-45</p>
                                <p>전화: 02-111-2222 | 담당자: 이현장</p>
                              </div>
                              <div className="border rounded p-2 bg-blue-50">
                                <p className="font-medium">현장B 창고</p>
                                <p>주소: 서울특별시 서초구 서초동 678-90</p>
                                <p>전화: 02-333-4444 | 담당자: 박현장</p>
                              </div>
                              <div className="border rounded p-2 bg-blue-50">
                                <p className="font-medium">본사 창고</p>
                                <p>주소: 서울특별시 강남구 테헤란로 124</p>
                                <p>전화: 02-557-9043 | 담당자: 김본부</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Items Table */}
                      <table className="w-full border-collapse border border-gray-400 text-xs mb-6">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-400 p-2 text-left">No</th>
                            <th className="border border-gray-400 p-2 text-left">대분류</th>
                            <th className="border border-gray-400 p-2 text-left">중분류</th>
                            <th className="border border-gray-400 p-2 text-left">소분류</th>
                            <th className="border border-gray-400 p-2 text-left">품목명</th>
                            <th className="border border-gray-400 p-2 text-center">수량</th>
                            <th className="border border-gray-400 p-2 text-center">단위</th>
                            <th className="border border-gray-400 p-2 text-right">단가</th>
                            <th className="border border-gray-400 p-2 text-right">금액</th>
                            <th className="border border-gray-400 p-2 text-left">거래처</th>
                            <th className="border border-gray-400 p-2 text-left">납품처</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-400 p-2">1</td>
                            <td className="border border-gray-400 p-2">건축자재</td>
                            <td className="border border-gray-400 p-2">철근</td>
                            <td className="border border-gray-400 p-2">D16</td>
                            <td className="border border-gray-400 p-2">철근 D16</td>
                            <td className="border border-gray-400 p-2 text-center">1,000</td>
                            <td className="border border-gray-400 p-2 text-center">kg</td>
                            <td className="border border-gray-400 p-2 text-right">₩1,200</td>
                            <td className="border border-gray-400 p-2 text-right">₩1,200,000</td>
                            <td className="border border-gray-400 p-2">한국철강</td>
                            <td className="border border-gray-400 p-2">현장A 창고</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 p-2">2</td>
                            <td className="border border-gray-400 p-2">건축자재</td>
                            <td className="border border-gray-400 p-2">콘크리트</td>
                            <td className="border border-gray-400 p-2">-</td>
                            <td className="border border-gray-400 p-2">레미콘 25-24-150</td>
                            <td className="border border-gray-400 p-2 text-center">50</td>
                            <td className="border border-gray-400 p-2 text-center">m³</td>
                            <td className="border border-gray-400 p-2 text-right">₩120,000</td>
                            <td className="border border-gray-400 p-2 text-right">₩6,000,000</td>
                            <td className="border border-gray-400 p-2">대한건설자재</td>
                            <td className="border border-gray-400 p-2">현장A 창고</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 p-2">3</td>
                            <td className="border border-gray-400 p-2">마감자재</td>
                            <td className="border border-gray-400 p-2">타일</td>
                            <td className="border border-gray-400 p-2">-</td>
                            <td className="border border-gray-400 p-2">바닥타일 600x600</td>
                            <td className="border border-gray-400 p-2 text-center">200</td>
                            <td className="border border-gray-400 p-2 text-center">m²</td>
                            <td className="border border-gray-400 p-2 text-right">₩25,000</td>
                            <td className="border border-gray-400 p-2 text-right">₩5,000,000</td>
                            <td className="border border-gray-400 p-2">삼성물산</td>
                            <td className="border border-gray-400 p-2">현장B 창고</td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Total - Compact */}
                      <div className="flex justify-end mb-4">
                        <div className="border border-gray-400 p-2 bg-gray-100">
                          <p className="text-xs font-bold">총 금액: ₩12,200,000</p>
                          <p className="text-xs text-gray-600">(부가세 별도)</p>
                        </div>
                      </div>

                      {/* Attached Files */}
                      <div className="mb-6">
                        <h4 className="font-bold mb-2 border-b border-gray-300 pb-1">첨부 파일</h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {uploadedFiles.map((file) => (
                            <div key={file.id} className="flex items-center gap-1 p-1 border rounded">
                              {getFileIcon(file.type)}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate text-xs">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Special Notes */}
                      <div className="mb-6">
                        <h4 className="font-bold mb-2 border-b border-gray-300 pb-1">특이사항</h4>
                        <p className="text-xs">
                          • 납품 시 품질 검사 필수
                          <br />• 우천 시 납품 연기 가능
                          <br />• 현장 안전 수칙 준수 필수
                        </p>
                      </div>

                      {/* Company Footer with Logo */}
                      <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <Image
                            src="/ikjin-logo.png"
                            alt="익진엔지니어링 로고"
                            width={120}
                            height={40}
                            className="object-contain"
                          />
                          <div className="space-y-1 text-xs text-gray-600">
                            <p>서울특별시 강남구 테헤란로 124 삼원타워 9층</p>
                            <p>대표전화: 02-557-9043 | 이메일: ikjin100@ikjin.co.kr</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Attached Files */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">첨부 파일</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-2 p-2 border rounded text-sm">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">작업</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleDownloadPDF} className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  PDF 다운로드
                </Button>
                <Button onClick={handleSendEmail} variant="outline" className="w-full gap-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                  이메일 발송
                </Button>
              </CardContent>
            </Card>

            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">문서 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">생성일:</span>
                  <span>2024-06-30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">페이지:</span>
                  <span>1 / 1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">파일 크기:</span>
                  <span>245KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">형식:</span>
                  <span>PDF</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
