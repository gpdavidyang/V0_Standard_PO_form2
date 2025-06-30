"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, Download, Mail, Plus, FileText, ImageIcon, CheckCircle, AlertTriangle, X } from "lucide-react"

interface Recipient {
  id: string
  name: string
  email: string
  role: string
  checked: boolean
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: string
}

export default function SendEmailPage() {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [customEmail, setCustomEmail] = useState("")
  const [customName, setCustomName] = useState("")
  const [subject, setSubject] = useState("PO_12층_콘크리트_2024-06-30")
  const [emailBody, setEmailBody] = useState(`안녕하세요,

첨부된 발주서를 확인해 주시기 바랍니다.

발주서 번호: PO-2024-001
현장: 12층 건설현장
납품희망일: 2024-07-05

문의사항이 있으시면 연락 주시기 바랍니다.

감사합니다.`)

  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "1", name: "김본부", email: "kim@company.com", role: "본사 관리자", checked: true },
    { id: "2", name: "이현장", email: "lee@site.com", role: "현장 자재 담당자", checked: true },
    { id: "3", name: "박철강", email: "park@steel.com", role: "철강 업체", checked: false },
    { id: "4", name: "최콘크리트", email: "choi@concrete.com", role: "콘크리트 업체", checked: true },
    { id: "5", name: "정목재", email: "jung@wood.com", role: "목재 업체", checked: false },
  ])

  const [uploadedFiles] = useState<UploadedFile[]>([
    { id: "1", name: "구조도면_12층.dwg", type: "drawing", size: "2.3MB" },
    { id: "2", name: "자재명세서.xlsx", type: "document", size: "156KB" },
    { id: "3", name: "현장사진.jpg", type: "image", size: "4.1MB" },
  ])

  const approvalStatus = "approved" // "approved" | "skipped" | "pending"

  const handleRecipientToggle = (id: string) => {
    setRecipients((prev) =>
      prev.map((recipient) => (recipient.id === id ? { ...recipient, checked: !recipient.checked } : recipient)),
    )
  }

  const addCustomRecipient = () => {
    if (customName && customEmail) {
      const newRecipient: Recipient = {
        id: Date.now().toString(),
        name: customName,
        email: customEmail,
        role: "사용자 추가",
        checked: true,
      }
      setRecipients((prev) => [...prev, newRecipient])
      setCustomName("")
      setCustomEmail("")
    }
  }

  const removeRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((recipient) => recipient.id !== id))
  }

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50))

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

  const selectedCount = recipients.filter((r) => r.checked).length

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">📧 발주서 이메일 발송</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              발주서 번호: PO-2024-001
            </Badge>
            {approvalStatus === "approved" && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                승인 완료
              </Badge>
            )}
            {approvalStatus === "skipped" && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                승인 생략됨
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - PDF Preview */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">발주서 미리보기</CardTitle>
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
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              {/* PDF Preview Area */}
              <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg bg-white overflow-auto">
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
                  <div className="p-8 text-xs leading-tight">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold mb-2">표준 발주서</h2>
                      <p className="text-sm text-gray-600">Purchase Order</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                      <div>
                        <p>
                          <strong>발주서 번호:</strong> PO-2024-001
                        </p>
                        <p>
                          <strong>현장:</strong> 12층 건설현장
                        </p>
                        <p>
                          <strong>납품희망일:</strong> 2024-07-05
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>자재 인수자:</strong> 이현장
                        </p>
                        <p>
                          <strong>본사 담당자:</strong> 김본부
                        </p>
                        <p>
                          <strong>작성일:</strong> 2024-06-30
                        </p>
                      </div>
                    </div>

                    <table className="w-full border-collapse border border-gray-300 text-xs">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2">대분류</th>
                          <th className="border border-gray-300 p-2">중분류</th>
                          <th className="border border-gray-300 p-2">소분류</th>
                          <th className="border border-gray-300 p-2">품목</th>
                          <th className="border border-gray-300 p-2">수량</th>
                          <th className="border border-gray-300 p-2">단위</th>
                          <th className="border border-gray-300 p-2">단가</th>
                          <th className="border border-gray-300 p-2">금액</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2">건축자재</td>
                          <td className="border border-gray-300 p-2">철근</td>
                          <td className="border border-gray-300 p-2">D16</td>
                          <td className="border border-gray-300 p-2">철근 D16</td>
                          <td className="border border-gray-300 p-2">1,000</td>
                          <td className="border border-gray-300 p-2">kg</td>
                          <td className="border border-gray-300 p-2">₩1,200</td>
                          <td className="border border-gray-300 p-2">₩1,200,000</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">건축자재</td>
                          <td className="border border-gray-300 p-2">콘크리트</td>
                          <td className="border border-gray-300 p-2">-</td>
                          <td className="border border-gray-300 p-2">레미콘 25-24-150</td>
                          <td className="border border-gray-300 p-2">50</td>
                          <td className="border border-gray-300 p-2">m³</td>
                          <td className="border border-gray-300 p-2">₩120,000</td>
                          <td className="border border-gray-300 p-2">₩6,000,000</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-6 text-right">
                      <p className="text-lg font-bold">총 금액: ₩7,200,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded Files */}
              <div className="border rounded-lg p-3 bg-gray-50">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  첨부 파일 ({uploadedFiles.length})
                </h4>
                <div className="space-y-1">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-2 text-xs text-gray-600">
                      {getFileIcon(file.type)}
                      <span className="flex-1">{file.name}</span>
                      <span className="text-gray-400">{file.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Email Configuration */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">이메일 발송 설정</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-4">
              {/* Recipients Section */}
              <div>
                <Label className="text-sm font-medium mb-3 block">수신자 선택 ({selectedCount}명 선택됨)</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                  {recipients.map((recipient) => (
                    <div key={recipient.id} className="flex items-center gap-3 p-2 bg-white rounded border">
                      <Checkbox
                        id={recipient.id}
                        checked={recipient.checked}
                        onCheckedChange={() => handleRecipientToggle(recipient.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={recipient.id} className="text-sm font-medium cursor-pointer">
                            {recipient.name}
                          </Label>
                          <Badge variant="secondary" className="text-xs">
                            {recipient.role}
                          </Badge>
                          {recipient.role === "사용자 추가" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRecipient(recipient.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{recipient.email}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Recipient */}
                <div className="mt-3 p-3 border rounded-lg bg-blue-50">
                  <Label className="text-sm font-medium mb-2 block">사용자 추가</Label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input
                      placeholder="이름"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="이메일"
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addCustomRecipient}
                    disabled={!customName || !customEmail}
                    className="w-full bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    수신자 추가
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Email Subject */}
              <div>
                <Label htmlFor="subject" className="text-sm font-medium mb-2 block">
                  제목
                </Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="text-sm" />
              </div>

              {/* Email Body */}
              <div className="flex-1">
                <Label htmlFor="body" className="text-sm font-medium mb-2 block">
                  내용
                </Label>
                <Textarea
                  id="body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="text-sm min-h-[200px] resize-none"
                />
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    PDF 다운로드
                  </Button>
                  <Button className="w-full" disabled={selectedCount === 0}>
                    <Mail className="w-4 h-4 mr-2" />
                    이메일 발송
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {selectedCount > 0 ? `${selectedCount}명에게 발주서가 발송됩니다.` : "수신자를 선택해주세요."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
