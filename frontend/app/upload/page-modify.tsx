'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, ImageIcon, X } from 'lucide-react'

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleRemoveImage = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  const category = sessionStorage.getItem('category')||""; // 버튼에서 저장한 카테고리 불러오기
  const handleAnalyze = () => {
    console.log('=== handleAnalyze 호출됨 ===');
    console.log('selectedImage:', selectedImage ? '있음' : '없음');
    console.log('selectedFile:', selectedFile);
    console.log('category:',category);//카테고리 정보
    
    
    if (!selectedImage || !selectedFile) {
      console.log('이미지 또는 파일이 없어서 리턴');
      alert('이미지를 선택해주세요.');
      return;
    }

    console.log('파일 정보:', { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type });

    sessionStorage.setItem('category', 'House');// 오류 없애기 위한 예시코드, 버튼에 들어갈 예정
    //<button onclick="sessionStorage.setItem('category', 'House')">House</button>
    setIsAnalyzing(true);
    
    // 이미 selectedImage가 Base64이므로 그대로 사용
    try {
      sessionStorage.setItem('uploadImage', selectedImage);
      sessionStorage.setItem('uploadFileName', selectedFile.name);
      sessionStorage.setItem('uploadCategory', category); // 파일 카테고리 정보 업로드
      console.log('sessionStorage에 저장 완료');
      console.log('페이지 이동 시도: /analyzing');
      
      // 로딩 페이지로 이동
      router.push('/analyzing');
    } catch (error) {
      console.error('에러 발생:', error);
      alert('오류가 발생했습니다: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">그림 업로드</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground text-balance">
              그림을 업로드해주세요
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              집, 나무, 사람 등을 그린 그림을 업로드하면 심리 상태를 분석합니다
            </p>
          </div>

          {/* Upload Area */}
          {!selectedImage ? (
            <Card
              className="p-12 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center">
                  <Upload className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground mb-2">
                    이미지를 업로드하세요
                  </p>
                  <p className="text-sm text-muted-foreground">
                    클릭하거나 파일을 드래그하여 업로드
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG 형식 (최대 10MB)
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </Card>
          ) : (
            <Card className="p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <span>업로드된 이미지</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Uploaded drawing"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Info Card */}
          <Card className="p-6 bg-orange-50 border-orange-200">
            <h3 className="font-semibold text-foreground mb-3">
              검사 안내
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>A4 용지에 그린 그림을 선명하게 촬영해주세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>조명이 밝은 곳에서 촬영하면 더 정확한 분석이 가능합니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>그림 전체가 프레임에 들어오도록 촬영해주세요</span>
              </li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-14"
              onClick={() => router.back()}
              disabled={isAnalyzing}
            >
              이전
            </Button>
            <Button
              size="lg"
              className={`flex-1 h-14 text-base font-semibold transition-all ${
                selectedImage && !isAnalyzing
                  ? 'bg-primary hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              onClick={() => {
                console.log('버튼 클릭됨');
                handleAnalyze();
              }}
              disabled={!selectedImage || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  분석 중...
                </>
              ) : (
                '분석 시작'
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
