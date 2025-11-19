"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import { getApiUrl } from "@/lib/api"
import { AlertCircle } from "lucide-react"

interface AnalysisLoadingPageProps {
  onComplete: (result: any) => void
  onError: () => void
  image: string
  category: number
}

export default function AnalysisLoadingPage({ onComplete, onError, image, category }: AnalysisLoadingPageProps) {
  const [dots, setDots] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const hasCalledApi = useRef(false)

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((prev) => (prev + 1) % 4)
    }, 500)

    // API 호출이 이미 실행되었는지 확인
    if (!hasCalledApi.current) {
      hasCalledApi.current = true

      // API 호출 시작
      const callApi = async () => {
        try {
          const formData = new FormData()
          
          // Convert base64 to blob
          const base64Response = await fetch(image)
          const blob = await base64Response.blob()
          
          formData.append('image', blob, 'drawing.jpg')
          formData.append('category', category.toString())

          console.log('[v0] Sending to backend - category:', category)

          const response = await fetch(getApiUrl('/'), {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            throw new Error('Backend request failed')
          }

          const result = await response.json()
          console.log('[v0] Backend response:', result)

          // 응답 도착 시 버튼 활성화
          setIsReady(true)
          // 결과를 저장해두고 버튼 클릭 시 전달
          setAnalysisResult(result)
        } catch (error) {
          console.error('[v0] Error sending to backend:', error)
          setHasError(true)
          setErrorMessage('요청 처리 중 오류가 발생했습니다.')
        }
      }

      callApi()
    }

    return () => {
      clearInterval(dotTimer)
    }
  }, [image, category])

  const dotString = ".".repeat(dots)

  const handleComplete = () => {
    if (analysisResult) {
      onComplete(analysisResult)
    }
  }

  const handleErrorConfirm = () => {
    onError()
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-destructive">오류가 발생했습니다</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              {errorMessage || '요청 처리 중 오류가 발생했습니다.'}
            </p>
            <Button
              onClick={handleErrorConfirm}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              확인
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6">
      {/* Top Section - Logo and Title */}
      <div className="flex flex-col items-center justify-start pt-20">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Outer glow layers */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B8D4B8]/30 to-[#E8A590]/30 blur-2xl scale-110"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B8D4B8]/20 to-[#E8A590]/20 blur-xl scale-105"></div>
            
            {/* Main logo circle with refined gradient */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#B8D4B8] via-[#D4C4A8] to-[#E8A590] shadow-2xl">
              {/* Inner highlight for depth */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
              
              {/* Letter M with refined styling */}
              <div className="relative text-white text-5xl font-bold tracking-tight drop-shadow-md" style={{ fontFamily: 'Georgia, serif' }}>
                M
              </div>
            </div>
            
            {/* Subtle bottom shadow for lift effect */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-24 rounded-full bg-primary/10 blur-xl"></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-[rgba(220,147,108,1)] font-serif">moment</h1>
      </div>

      {/* Center Section - Message and Loading */}
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-2">
          <p className="text-foreground italic font-serif text-lg">"Everyone 
deserves <br />mental health treatment.<br />
Now is your time."</p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
          <div className="w-8 h-3 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-4 h-4 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>

        {!isReady ? (
          <p className="text-base text-muted-foreground">분석 중{dotString}</p>
        ) : (
          <p className="text-base text-primary font-semibold">분석 완료!</p>
        )}
      </div>

      <div className="w-full max-w-sm">
        {isReady && (
          <Button
            onClick={handleComplete}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg rounded-full"
          >
            결과 확인하기
          </Button>
        )}
      </div>
    </div>
  )
}
