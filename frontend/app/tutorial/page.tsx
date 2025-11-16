'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const tutorialSlides = [
  {
    title: '간편한 심리 검사',
    description: '그림을 통해 당신의 마음 상태를 쉽고 빠르게 확인하세요',
    image: '/person-drawing-on-paper-peaceful.jpg',
  },
  {
    title: '전문적인 분석',
    description: 'AI 기반 분석으로 정확한 심리 상태를 파악합니다',
    image: '/brain-with-connections-analysis.jpg',
  },
  {
    title: '맞춤 병원 추천',
    description: '필요시 가까운 전문 상담 병원을 추천해드립니다',
    image: '/hospital-building-healthcare.jpg',
  },
]

export default function TutorialPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentSlide < tutorialSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push('/auth')
    }
  }

  const handleSkip = () => {
    router.push('/auth')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          건너뛰기
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-12 flex justify-center">
            <img
              src={tutorialSlides[currentSlide].image || "/placeholder.svg"}
              alt={tutorialSlides[currentSlide].title}
              className="h-64 w-64 object-contain"
            />
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground text-balance">
            {tutorialSlides[currentSlide].title}
          </h2>

          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            {tutorialSlides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Bottom section with indicators and button */}
      <div className="pb-10 px-6">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Page indicators */}
          <div className="flex justify-center gap-2">
            {tutorialSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {currentSlide < tutorialSlides.length - 1 ? '다음' : '시작하기'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
