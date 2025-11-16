'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, FileImage, Download, Home } from 'lucide-react'

interface ResultData {
  success: boolean
  message: string
  file_id: string
  file_name: string
  file_size: number
  file_extension: string
  original_filename: string
  content_type: string
}

export default function ResultPage() {
  const router = useRouter()
  const [resultData, setResultData] = useState<ResultData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // sessionStorage에서 결과 데이터 가져오기
    const storedData = sessionStorage.getItem('resultData')
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData) as ResultData
        setResultData(data)
      } catch (error) {
        console.error('결과 데이터 파싱 오류:', error)
      }
    }
    
    setIsLoading(false)
  }, [])

  // 데이터가 없으면 업로드 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoading && !resultData) {
      router.push('/upload')
    }
  }, [isLoading, resultData, router])

  if (isLoading || !resultData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  const success = resultData.success
  const message = resultData.message || ''
  const fileId = resultData.file_id || ''
  const fileName = resultData.file_name || ''
  const fileSize = resultData.file_size || 0
  const fileExtension = resultData.file_extension || ''
  const originalFilename = resultData.original_filename || ''
  const contentType = resultData.content_type || ''

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleLeave = () => {
    // 페이지를 떠날 때 sessionStorage 정리
    sessionStorage.removeItem('resultData')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">분석 결과</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Status Card */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              {success ? (
                <>
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">저장 성공</h2>
                    <p className="text-muted-foreground">{message}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">저장 실패</h2>
                    <p className="text-muted-foreground">{message}</p>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* File Information Card */}
          {success && (
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <FileImage className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">파일 정보</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-muted-foreground">파일 ID</span>
                  <span className="text-sm text-foreground font-mono">{fileId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-muted-foreground">저장된 파일명</span>
                  <span className="text-sm text-foreground">{fileName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-muted-foreground">원본 파일명</span>
                  <span className="text-sm text-foreground">{originalFilename || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-muted-foreground">파일 크기</span>
                  <span className="text-sm text-foreground">{formatFileSize(fileSize)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-muted-foreground">파일 확장자</span>
                  <span className="text-sm text-foreground uppercase">{fileExtension}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-muted-foreground">Content Type</span>
                  <span className="text-sm text-foreground">{contentType || 'N/A'}</span>
                </div>
              </div>
            </Card>
          )}

          {/* JSON Data Card */}
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">JSON 응답 데이터</h3>
            <div className="bg-muted p-4 rounded-lg overflow-auto">
              <pre className="text-xs text-foreground whitespace-pre-wrap">
                {JSON.stringify(resultData, null, 2)}
              </pre>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-14"
              onClick={() => {
                handleLeave()
                router.push('/upload')
              }}
            >
              다시 업로드
            </Button>
            <Button
              size="lg"
              className="flex-1 h-14"
              onClick={() => {
                handleLeave()
                router.push('/main')
              }}
            >
              <Home className="h-5 w-5 mr-2" />
              홈으로
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

