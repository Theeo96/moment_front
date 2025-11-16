'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function AnalyzingPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('=== AnalyzingPage useEffect 실행됨 ===')
    
    // sessionStorage에서 이미지 데이터 가져오기
    const imageData = sessionStorage.getItem('uploadImage')
    const fileName = sessionStorage.getItem('uploadFileName') || 'image.jpg'
    
    console.log('sessionStorage에서 가져온 데이터:', {
      imageData: imageData ? `있음 (길이: ${imageData.length})` : '없음',
      fileName: fileName
    })
    
    if (!imageData) {
      console.error('이미지 데이터가 없습니다!')
      setError('이미지 파일이 없습니다')
      setStatus('error')
      return
    }

    // 이미지 파일을 다시 FormData로 변환하여 전송
    const sendImage = async () => {
      try {
        console.log('Base64를 Blob으로 변환 시작...')
        // Base64 데이터를 Blob으로 변환
        const base64Response = await fetch(imageData)
        const blob = await base64Response.blob()
        console.log('Blob 변환 완료:', { size: blob.size, type: blob.type })
        
        const formData = new FormData()
        formData.append('file', blob, fileName)
        console.log('FormData 생성 완료, 백엔드로 전송 시작...')

        const apiResponse = await fetch('http://localhost:8000/analyze', {
          method: 'POST',
          body: formData,
        })

        console.log('백엔드 응답 상태:', apiResponse.status, apiResponse.statusText)

        if (!apiResponse.ok) {
          const errorText = await apiResponse.text()
          console.error('백엔드 에러 응답:', errorText)
          throw new Error(`분석 실패: ${apiResponse.status} ${apiResponse.statusText}`)
        }

        const data = await apiResponse.json()
        console.log('백엔드 응답 데이터:', data)
        setResult(data)
        setStatus('success')
        
        // 결과 데이터를 sessionStorage에 저장 (보안을 위해 URL에 노출하지 않음)
        sessionStorage.setItem('resultData', JSON.stringify(data))
        
        // sessionStorage 정리 (이미지 데이터는 더 이상 필요 없음)
        sessionStorage.removeItem('uploadImage')
        sessionStorage.removeItem('uploadFileName')
        
        // 결과 페이지로 이동 (URL에는 데이터 없이 이동)
        console.log('결과 페이지로 이동: /result')
        router.push('/result')
      } catch (err) {
        console.error('에러 발생:', err)
        setError(err instanceof Error ? err.message : '분석 중 오류가 발생했습니다')
        setStatus('error')
        // 에러 발생 시 sessionStorage 정리
        sessionStorage.removeItem('uploadImage')
        sessionStorage.removeItem('uploadFileName')
      }
    }

    sendImage()
  }, [router])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">분석 중</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <Card className="p-12 shadow-lg">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              {status === 'loading' && (
                <>
                  <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      이미지 분석 중...
                    </h2>
                    <p className="text-muted-foreground">
                      잠시만 기다려주세요
                    </p>
                  </div>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      오류 발생
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {error}
                    </p>
                    <button
                      onClick={() => router.push('/upload')}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                      다시 시도
                    </button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

