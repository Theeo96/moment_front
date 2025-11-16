'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Share2, ChevronDown, X, Heart } from 'lucide-react'

const supportAnimalIllustrations = [
  { id: 9, src: '/animals/gentle-panda.svg', mood: 'tired' },
  { id: 10, src: '/animals/soft-lamb.svg', mood: 'need-rest' },
  { id: 11, src: '/animals/calm-elephant.svg', mood: 'overwhelmed' },
  { id: 12, src: '/animals/quiet-owl.svg', mood: 'thoughtful' },
  { id: 13, src: '/animals/tender-rabbit.svg', mood: 'sensitive' },
  { id: 14, src: '/animals/warm-hedgehog.svg', mood: 'protective' },
  { id: 15, src: '/animals/sleepy-sloth.svg', mood: 'exhausted' },
  { id: 16, src: '/animals/caring-penguin.svg', mood: 'need-support' },
]

export default function ResultSupportPage() {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)
  const [showTreatmentPopup, setShowTreatmentPopup] = useState(false)

  const selectedAnimal = supportAnimalIllustrations[0]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">검사 결과</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 pb-24">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full">
              <span className="text-lg font-bold text-orange-700">마음 건강 검사 완료</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent text-balance leading-relaxed px-4">
              요즘 조금 힘든 시간을<br />보내고 계시는군요
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              괜찮아요, 당신은 충분히 잘하고 있어요
            </p>
          </div>

          <div className="flex justify-center my-8">
            <div className="relative w-72 h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shadow-2xl">
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                {/* Gentle Panda Illustration */}
                <ellipse cx="100" cy="110" rx="55" ry="60" fill="#fed7aa" />
                <circle cx="75" cy="65" r="18" fill="#292524" />
                <circle cx="125" cy="65" r="18" fill="#292524" />
                <circle cx="75" cy="65" r="13" fill="#fef3c7" />
                <circle cx="125" cy="65" r="13" fill="#fef3c7" />
                <ellipse cx="75" cy="68" rx="8" ry="10" fill="#292524" />
                <ellipse cx="125" cy="68" rx="8" ry="10" fill="#292524" />
                <circle cx="78" cy="106" r="4" fill="#292524" />
                <circle cx="122" cy="106" r="4" fill="#292524" />
                <ellipse cx="100" cy="120" rx="8" ry="10" fill="#292524" />
                <path d="M 85 128 Q 100 133 115 128" stroke="#292524" strokeWidth="2" fill="none" strokeLinecap="round" />
                <ellipse cx="60" cy="120" rx="10" ry="8" fill="#fca5a5" opacity="0.5" />
                <ellipse cx="140" cy="120" rx="10" ry="8" fill="#fca5a5" opacity="0.5" />
                <path d="M 70 100 Q 65 95 70 90" stroke="#292524" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 130 100 Q 135 95 130 90" stroke="#292524" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="90" cy="155" r="15" fill="#292524" />
                <circle cx="110" cy="155" r="15" fill="#292524" />
              </svg>
            </div>
          </div>

          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-foreground text-balance leading-relaxed">
              요즘 조금 힘든 시간을 보내고 계시는군요
            </h2>
          </div>

          <div className="flex justify-center my-8">
            <div className="relative w-64 h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
              {/* Image component is replaced with SVG illustration */}
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
              <Card className="p-6 shadow-lg border-2 border-orange-100">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  세부 분석
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">정서 안정성</span>
                      <span className="font-semibold text-orange-600">주의 필요</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full w-[45%] transition-all duration-1000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">스트레스 수준</span>
                      <span className="font-semibold text-orange-600">다소 높음</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full w-[70%] transition-all duration-1000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">심리적 여유</span>
                      <span className="font-semibold text-orange-600">부족</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full w-[35%] transition-all duration-1000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">긴장도</span>
                      <span className="font-semibold text-orange-600">높음</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full w-[68%] transition-all duration-1000" />
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
                    그림을 통해 표현된 내면의 상태를 살펴보면, 현재 일상에서 느끼는 부담감과 긴장이 조금씩 쌓여있는 것으로 보입니다.
                  </p>
                  <p>
                    선의 흐름과 강도를 보면 마음속 깊은 곳에 표현하기 어려운 감정들이 자리잡고 있으며, 이는 자연스러운 반응입니다. 누구나 삶의 여정에서 이런 순간들을 경험합니다.
                  </p>
                  <p>
                    공간 활용과 요소 배치를 통해 현재 자신을 돌볼 여유가 부족하고, 주변의 기대나 책임감으로 인한 압박을 느끼고 계신 것으로 나타났습니다.
                  </p>
                  <p>
                    그림 속 세밀한 표현들은 내면의 섬세함과 감수성을 보여주는 동시에, 작은 일에도 쉽게 마음이 흔들리고 있음을 나타냅니다. 이런 감정들을 혼자 감당하시기보다는, 전문가의 따뜻한 도움을 받아보시는 것을 권해드립니다.
                  </p>
                  <p>
                    마음의 피로는 충분한 휴식과 적절한 지원을 통해 회복될 수 있습니다. 지금 이 순간, 자신을 돌보는 시간이 필요한 시기입니다.
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-orange-50/50 border-orange-200">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      따뜻한 조언
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      힘든 감정을 느끼는 것은 약함이 아니라 용기입니다. 
                      전문가와 함께 나누는 대화는 마음의 짐을 덜어내고 더 나은 내일을 준비하는 첫걸음이 될 수 있습니다.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="space-y-3 mt-8">
            <Button
              size="lg"
              className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90"
              onClick={() => setShowTreatmentPopup(true)}
            >
              <Heart className="mr-2 h-5 w-5" />
              트리트먼트
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 text-base"
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

          {/* Note */}
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            본 검사 결과는 참고 자료이며, 전문적인 의료 진단을 대체하지 않습니다.
          </p>
        </div>
      </main>

      {showTreatmentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">트리트먼트</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    모멘트의 특별한 케어 서비스
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTreatmentPopup(false)}
                  className="h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Description */}
              <div className="space-y-4 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    마음이 힘드신가요?
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  트리트먼트는 마음이 피곤하시거나 다소 힘드신 분들을 위해 
                  주변 상담센터, 따뜻한 커뮤니티, 전문 병원 등을 
                  매칭해드리는 모멘트만의 특별한 케어 서비스입니다.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  혼자 고민하지 마시고, 전문가의 따뜻한 손길과 
                  함께 회복의 여정을 시작해보세요. 모멘트가 함께합니다.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full h-12"
                  onClick={() => {
                    setShowTreatmentPopup(false)
                    router.push('/treatment')
                  }}
                >
                  주변 상담센터 및 병원 찾기
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12"
                  onClick={() => setShowTreatmentPopup(false)}
                >
                  나중에 살펴볼게요
                </Button>
              </div>

              {/* Emergency Contact */}
              <Card className="p-4 bg-red-50 border-red-200">
                <h4 className="font-semibold text-foreground mb-3 text-sm">
                  긴급 상담이 필요하신가요?
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">정신건강 위기상담</span>
                    <a href="tel:1577-0199" className="font-semibold text-primary underline">
                      1577-0199
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">자살 예방 상담</span>
                    <a href="tel:1393" className="font-semibold text-primary underline">
                      1393
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
