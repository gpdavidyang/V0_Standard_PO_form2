"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, AlertTriangle, ArrowLeft, User, Building, Shield, Crown, Send } from "lucide-react"

type ApprovalStep = {
  id: string
  title: string
  name: string
  email: string
  role: string
  icon: React.ReactNode
  status: "pending" | "approved" | "rejected" | "current"
  approvedAt?: string
  comment?: string
}

export default function ApprovalProcessPage() {
  const [selectedProcess, setSelectedProcess] = useState<"approval" | "skip" | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 승인 단계 정의
  const approvalSteps: ApprovalStep[] = [
    {
      id: "step1",
      title: "담당자 검토",
      name: "김담당",
      email: "kim.manager@company.com",
      role: "자재 담당자",
      icon: <User className="w-5 h-5" />,
      status: "current",
    },
    {
      id: "step2",
      title: "공무팀 검토",
      name: "이공무",
      email: "lee.admin@company.com",
      role: "공무팀장",
      icon: <Building className="w-5 h-5" />,
      status: "pending",
    },
    {
      id: "step3",
      title: "팀장 승인",
      name: "박팀장",
      email: "park.team@company.com",
      role: "건설팀장",
      icon: <Shield className="w-5 h-5" />,
      status: "pending",
    },
    {
      id: "step4",
      title: "임원 승인",
      name: "최임원",
      email: "choi.exec@company.com",
      role: "건설본부장",
      icon: <Crown className="w-5 h-5" />,
      status: "pending",
    },
    {
      id: "step5",
      title: "최종 승인",
      name: "정사장",
      email: "jung.ceo@company.com",
      role: "대표이사",
      icon: <Crown className="w-5 h-5" />,
      status: "pending",
    },
  ]

  const handleGoBack = () => {
    window.history.back()
  }

  const handleSubmitApproval = async () => {
    setIsSubmitting(true)
    // 승인 요청 로직
    setTimeout(() => {
      setIsSubmitting(false)
      // 같은 창에서 승인 진행 상황 페이지로 이동
      window.location.href = "/approval-status"
    }, 2000)
  }

  const handleSkipApproval = async () => {
    setIsSubmitting(true)
    // 승인 생략 로직
    setTimeout(() => {
      setIsSubmitting(false)
      // 같은 창에서 이메일 발송 페이지로 이동
      window.location.href = "/send-email"
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "current":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "rejected":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">승인 완료</Badge>
      case "current":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">검토중</Badge>
      case "rejected":
        return <Badge variant="destructive">반려</Badge>
      default:
        return <Badge variant="secondary">대기중</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={handleGoBack} className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              돌아가기
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🔄 승인 프로세스</h1>
              <p className="text-gray-600">발주서 처리 방식을 선택해주세요</p>
            </div>
          </div>

          {/* 발주서 정보 */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">발주서 번호:</span>
                <div className="font-medium">PO-2024-001</div>
              </div>
              <div>
                <span className="text-gray-600">현장:</span>
                <div className="font-medium">12층 건설현장</div>
              </div>
              <div>
                <span className="text-gray-600">총 금액:</span>
                <div className="font-medium text-blue-600">₩12,200,000</div>
              </div>
              <div>
                <span className="text-gray-600">작성일:</span>
                <div className="font-medium">{new Date().toLocaleDateString("ko-KR")}</div>
              </div>
            </div>
          </div>
        </div>

        {!selectedProcess ? (
          /* 프로세스 선택 화면 */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">처리 방식을 선택해주세요</h2>
              <p className="text-gray-600">발주서의 긴급도와 금액을 고려하여 적절한 방식을 선택하세요</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 정식 승인 프로세스 */}
              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-300"
                onClick={() => setSelectedProcess("approval")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">정식 승인 프로세스</CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto">
                    권장
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">회사 규정에 따른 단계별 승인을 거쳐 안전하게 처리합니다</p>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">승인 단계 (5단계)</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      {approvalSteps.map((step, index) => (
                        <div key={step.id} className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          <span>{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <Clock className="w-4 h-4" />
                      <span>예상 소요시간: 1-3일</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 승인 생략 (긴급) */}
              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-300"
                onClick={() => setSelectedProcess("skip")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">승인 생략 (긴급)</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto bg-orange-100 text-orange-800">
                    긴급용
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">긴급한 상황에서 승인 과정을 생략하고 즉시 처리합니다</p>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">적용 조건</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 공사 일정상 긴급한 자재 필요</li>
                      <li>• 안전상 즉시 조치가 필요한 경우</li>
                      <li>• 기타 불가피한 사유</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center gap-2 text-sm text-orange-800 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span>주의사항</span>
                    </div>
                    <ul className="text-xs text-orange-700 space-y-1">
                      <li>• 사후 승인 절차 필요</li>
                      <li>• 100만원 이상 시 별도 보고</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : selectedProcess === "approval" ? (
          /* 정식 승인 요청 화면 */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  정식 승인 프로세스
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 승인 단계 시각화 */}
                <div>
                  <h3 className="font-medium mb-4">승인 단계</h3>
                  <div className="space-y-4">
                    {approvalSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.status === "current" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                          >
                            {step.status === "current" ? (
                              <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                            ) : (
                              <span className="text-gray-500 font-medium text-sm">{index + 1}</span>
                            )}
                          </div>
                          <div
                            className={`p-2 rounded-lg ${step.status === "current" ? "bg-blue-100" : "bg-gray-200"}`}
                          >
                            {step.icon}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{step.title}</h4>
                            {getStatusBadge(step.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {step.name} ({step.role})
                          </p>
                          <p className="text-xs text-gray-500">{step.email}</p>
                        </div>

                        {getStatusIcon(step.status)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 승인 요청 메시지 */}
                <div>
                  <Label htmlFor="comment" className="text-sm font-medium mb-2 block">
                    승인 요청 메시지 (선택사항)
                  </Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="승인자에게 전달할 메시지를 입력하세요..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSelectedProcess(null)} className="bg-transparent">
                    이전
                  </Button>
                  <Button onClick={handleSubmitApproval} disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        승인 요청 중...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        승인 요청하기
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* 승인 생략 화면 */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  승인 생략 (긴급 처리)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-medium text-orange-800 mb-2">⚠️ 승인 생략 시 주의사항</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 긴급한 상황에서만 사용해주세요</li>
                    <li>• 발주 완료 후 사후 승인 절차가 진행됩니다</li>
                    <li>• 발주 금액이 100만원 이상인 경우 별도 보고가 필요합니다</li>
                    <li>• 모든 책임은 발주 요청자에게 있습니다</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="skip-reason" className="text-sm font-medium mb-2 block">
                    승인 생략 사유 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="skip-reason"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="승인을 생략하는 구체적인 사유를 입력해주세요..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSelectedProcess(null)} className="bg-transparent">
                    이전
                  </Button>
                  <Button
                    onClick={handleSkipApproval}
                    disabled={isSubmitting || !comment.trim()}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        승인 생략하고 진행
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 하단 정보 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 참고사항</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• 승인 완료 후 PDF 생성 및 이메일 발송이 가능합니다</li>
            <li>• 승인 진행 상황은 실시간으로 알림을 받을 수 있습니다</li>
            <li>• 승인자가 부재 시 대리 승인자가 자동으로 지정됩니다</li>
            <li>• 발주서는 언제든지 수정하거나 취소할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
