'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Share2, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'
import NavigationBar from '@/components/navigation-bar'

export default function ResultsPage({ 
  results, 
  onViewProfessionals, 
  onBack,
  onNavigateToMain,
  onNavigateToUpload,
  onNavigateToTreatment,
  onNavigateToMyPage
}: {
  results: any
  onViewProfessionals: () => void
  onBack: () => void
  onNavigateToMain: () => void
  onNavigateToUpload: () => void
  onNavigateToTreatment: () => void
  onNavigateToMyPage: () => void
}) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-chart-4">결과</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="text-center space-y-4 animate-in fade-in duration-700">
            <div className="inline-block px-5 py-2.5 bg-primary/10 rounded-full">
              <span className="text-2xl">😊</span>
            </div>
            <h2 className="text-2xl font-bold text-balance leading-relaxed px-4 text-card-foreground">
              마음이 평온하고<br />안정적인 상태네요
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              당신의 마음은 <br />지금 편안한 쉼터에 있습니다
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center h-12 bg-[rgba(253,232,210,1)]"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="font-semibold">더 자세히 보기</span>
            {showDetails ? (
              <ChevronUp className="h-5 w-5 ml-2" />
            ) : (
              <ChevronDown className="h-5 w-5 ml-2" />
            )}
          </Button>

          {showDetails && (
            <Card className="p-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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
              
              <div className="mt-5 p-4 rounded-lg border-accent/20 bg-[rgba(255,250,245,1)]">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  추천 활동
                </h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>규칙적인 운동과 취미 활동을 통해 현재의 긍정적인 상태를 유지하세요</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>충분한 수면과 균형 잡힌 식사로 신체와 정신 건강을 관리하세요</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>주변 사람들과의 긍정적인 관계를 지속적으로 발전시켜 나가세요</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>명상이나 요가 같은 마음챙김 활동으로 내면의 평화를 더욱 깊게 경험해보세요</span>
                  </li>
                </ul>
              </div>
            </Card>
          )}


          <div className="space-y-2.5 mt-6">
            <Button
              size="lg"
              className="w-full h-12 text-sm font-semibold"
              onClick={onNavigateToMain}
            >
              <Home className="mr-2 h-4 w-4" />
              홈
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-sm"
            >
              <Share2 className="mr-2 h-4 w-4" />
              결과 저장
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            ※ 본 검사 결과는 참고 자료이며, <br />전문적인 의료 진단을 대체하지 않습니다.<br />
            지속적인 불편감이 있다면 <br />전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </main>
      
      <NavigationBar 
        currentPage="none"
        onNavigateHome={onNavigateToMain}
        onNavigateCamera={onNavigateToUpload}
        onNavigateFavorites={onNavigateToTreatment}
        onNavigateProfile={onNavigateToMyPage}
      />
    </div>
  )
}
