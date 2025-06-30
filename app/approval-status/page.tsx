"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  User,
  Building,
  Shield,
  Crown,
  Bell,
  MessageSquare,
  Eye,
  Mail,
} from "lucide-react"

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

export default function ApprovalStatusPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(20)

  // 승인 단계 정의 (실제로는 서버에서 가져올 데이터)
  const [approvalSteps, setApprovalSteps] = useState<ApprovalStep[]>([
    {
      id: "step1",
      title: "담당자 검토",
      name: "김담당",
      email: "kim.manager@company.com",
      role: "자재 담당자",
      icon: <User className="w-5 h-5" />,
      status: "approved",
      approvedAt: "2024-06-30 09:15",
      comment: "자재 명세서 확인 완료. 승인합니다.",
    },
    {
      id: "step2",
      title: "공무팀 검토",
      name: "이공무",
      email: "lee.admin@company.com",
      role: "공무팀장",
      icon: <Building className="w-5 h-5" />,
      status: "current",
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
  ])

  // 진행률 계산
  useEffect(() => {
    const approvedCount = approvalSteps.filter((step) => step.status === "approved").length
    const newProgress = (approvedCount / approvalSteps.length) * 100
    setProgress(newProgress)
    setCurrentStep(approvedCount)
  }, [approvalSteps])

  const handleGoBack = () => {
    window.history.back()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "current":
        return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />
      case "rejected":
        return <AlertTriangle className="w-6 h-6 text-red-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-400" />
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
              <h1 className="text-2xl font-bold text-gray-900">📋 승인 진행 상황</h1>
              <p className="text-gray-600">발주서 승인이 진행 중입니다</p>
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
                <span className="text-gray-600">요청일:</span>
                <div className="font-medium">{new Date().toLocaleDateString("ko-KR")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 진행률 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">승인 진행률</h3>
              <span className="text-sm text-gray-600">
                {currentStep}/{approvalSteps.length} 단계 완료
              </span>
            </div>
            <Progress value={progress} className="h-3 mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>시작</span>
              <span>{Math.round(progress)}% 완료</span>
              <span>완료</span>
            </div>
          </CardContent>
        </Card>

        {/* 승인 단계 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>승인 단계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvalSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 ${
                    step.status === "current"
                      ? "border-blue-200 bg-blue-50"
                      : step.status === "approved"
                        ? "border-green-200 bg-green-50"
                        : step.status === "rejected"
                          ? "border-red-200 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {/* 단계 번호와 아이콘 */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                        step.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : step.status === "current"
                            ? "bg-blue-100 text-blue-600"
                            : step.status === "rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`p-2 rounded-lg ${
                        step.status === "approved"
                          ? "bg-green-100"
                          : step.status === "current"
                            ? "bg-blue-100"
                            : step.status === "rejected"
                              ? "bg-red-100"
                              : "bg-gray-200"
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* 승인자 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{step.title}</h4>
                      {getStatusBadge(step.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {step.name} ({step.role})
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{step.email}</p>

                    {step.approvedAt && <p className="text-xs text-gray-500 mb-2">승인일시: {step.approvedAt}</p>}

                    {step.comment && (
                      <div className="bg-white rounded p-2 border text-sm">
                        <div className="flex items-center gap-1 mb-1">
                          <MessageSquare className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">승인 의견</span>
                        </div>
                        <p className="text-gray-700">{step.comment}</p>
                      </div>
                    )}
                  </div>

                  {/* 상태 아이콘 */}
                  <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 알림 설정 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              알림 설정
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">이메일 알림</h4>
                  <p className="text-xs text-gray-600">승인 완료 시 이메일로 알림을 받습니다</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">활성화</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">SMS 알림</h4>
                  <p className="text-xs text-gray-600">긴급한 승인 요청 시 SMS로 알림을 받습니다</p>
                </div>
                <Badge variant="secondary">비활성화</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Eye className="w-4 h-4" />
            발주서 보기
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <MessageSquare className="w-4 h-4" />
            승인자에게 메시지
          </Button>
          {progress === 100 && (
            <Button className="gap-2 ml-auto">
              <Mail className="w-4 h-4" />
              이메일 발송하기
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
