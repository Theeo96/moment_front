'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Share2, ChevronDown } from 'lucide-react'
import Image from 'next/image'

const animalIllustrations = [
  { id: 1, src: '/animals/happy-bunny.svg', mood: 'excellent' },
  { id: 2, src: '/animals/peaceful-cat.svg', mood: 'great' },
  { id: 3, src: '/animals/cheerful-dog.svg', mood: 'good' },
  { id: 4, src: '/animals/content-bear.svg', mood: 'stable' },
  { id: 5, src: '/animals/calm-fox.svg', mood: 'calm' },
  { id: 6, src: '/animals/gentle-deer.svg', mood: 'gentle' },
  { id: 7, src: '/animals/bright-bird.svg', mood: 'bright' },
  { id: 8, src: '/animals/cozy-koala.svg', mood: 'cozy' },
]

export default function ResultGoodPage() {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)

  const selectedAnimal = animalIllustrations[0]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50/40 via-white to-emerald-50/40">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">검사 결과</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 pb-24">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
              <span className="text-lg font-bold text-green-700">마음 건강 검사 완료</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-balance leading-relaxed px-4">
              마음이 평온하고<br />안정적인 상태네요
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              당신의 마음은 지금 편안한 쉼터에 있습니다
            </p>
          </div>

          <div className="flex justify-center my-8">
            <div className="relative w-72 h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-2xl">
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                {/* Happy Bunny Illustration */}
                <ellipse cx="100" cy="120" rx="50" ry="55" fill="#86efac" />
                <ellipse cx="80" cy="75" rx="12" ry="25" fill="#86efac" />
                <ellipse cx="120" cy="75" rx="12" ry="25" fill="#86efac" />
                <circle cx="88" cy="110" r="5" fill="#166534" />
                <circle cx="112" cy="110" r="5" fill="#166534" />
                <path d="M 85 125 Q 100 135 115 125" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="100" cy="130" r="4" fill="#f472b6" />
                <ellipse cx="70" cy="130" rx="8" ry="6" fill="#fca5a5" opacity="0.6" />
                <ellipse cx="130" cy="130" rx="8" ry="6" fill="#fca5a5" opacity="0.6" />
                <path d="M 95 115 L 75 120" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
                <path d="M 105 115 L 125 120" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="w-full max-w-xs h-12"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? '접기' : '더 자세히 보기'}
              <ChevronDown className={`ml-2 h-5 w-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {showDetails && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <Card className="p-6 shadow-lg border-2 border-green-100">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  세부 분석
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">정서 안정성</span>
                      <span className="font-semibold text-green-600">안정적</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full w-[85%] transition-all duration-1000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">스트레스 수준</span>
                      <span className="font-semibold text-green-600">낮음</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full w-[30%] transition-all duration-1000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">자아존중감</span>
                      <span className="font-semibold text-green-600">높음</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full w-[80%] transition-all duration-1000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">대인관계</span>
                      <span className="font-semibold text-green-600">원만함</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full w-[75%] transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  상세 내용
                </h3>
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    그림에서 나타난 선의 강도와 구도를 분석한 결과, 전반적으로 안정적이고 균형 잡힌 심리 상태를 보이고 있습니다.
                  </p>
                  <p>
                    자신감 있는 표현과 적절한 공간 활용이 눈에 띄며, 이는 건강한 자아상과 긍정적인 대인관계를 나타냅니다.
                  </p>
                  <p>
                    선의 흐름과 압력 분포를 통해 내면의 평화로움과 심리적 안정감이 느껴집니다. 자신의 감정을 잘 조절하고 있으며, 스트레스 대처 능력도 우수한 편입니다.
                  </p>
                  <p>
                    그림 속 요소들의 배치와 크기는 현실에 대한 균형잡힌 인식을 보여주며, 자기 자신과 주변 환경에 대한 긍정적인 태도를 나타냅니다.
                  </p>
                  <p>
                    현재의 심리 상태를 잘 유지하시되, 지속적인 자기 관리와 스트레스 해소를 위한 여가 활동을 권장합니다. 규칙적인 운동, 충분한 수면, 그리고 가까운 사람들과의 긍정적인 소통을 이어가세요.
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-green-50/50 border-green-200">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  추천 활동
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>규칙적인 운동과 취미 활동을 통해 현재의 긍정적인 상태를 유지하세요</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>충분한 수면과 균형 잡힌 식사로 신체와 정신 건강을 관리하세요</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>주변 사람들과의 긍정적인 관계를 지속적으로 발전시켜 나가세요</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>명상이나 요가 같은 마음챙김 활동으로 내면의 평화를 더욱 깊게 경험해보세요</span>
                  </li>
                </ul>
              </Card>
            </div>
          )}

          <div className="space-y-3 mt-8">
            <Button
              size="lg"
              className="w-full h-14 text-base font-semibold"
              onClick={() => router.push('/main')}
            >
              <Home className="mr-2 h-5 w-5" />
              홈으로 돌아가기
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 text-base"
            >
              <Share2 className="mr-2 h-5 w-5" />
              결과 저장하기
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            본 검사 결과는 참고 자료이며, 전문적인 의료 진단을 대체하지 않습니다.
            지속적인 불편감이 있다면 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </main>
    </div>
  )
}
