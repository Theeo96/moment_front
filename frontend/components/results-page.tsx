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

  // personality 데이터에서 정보 추출 (실제 JSON 구조에 맞게)
  const personality = results?.personality || {}
  const personalityType = personality?.type || {}
  const personalityIcon = personalityType?.icon || "😊"
  const personalitySummary = personality?.summary || "당신의 마음은 지금 편안한 쉼터에 있습니다"
  const personalityDetails = personality?.details || "" // 문자열 (줄바꿈 포함)
  const personalityAdvices = personality?.advices || [] // 배열
  const warning = personality?.warning || results?.warning || "※ 본 검사 결과는 참고 자료이며, 전문적인 의료 진단을 대체하지 않습니다. 지속적인 불편감이 있다면 전문가와 상담하시기 바랍니다."

  // personality.type을 f-string 형식으로 변환: '{description} {name}({key})'
  const title = personalityType?.description && personalityType?.name && personalityType?.key
    ? `${personalityType.description} ${personalityType.name}(${personalityType.key})`
    : "마음이 평온하고\n안정적인 상태네요"

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
              <span className="text-2xl">{personalityIcon}</span>
            </div>
            <h2 className="text-2xl font-bold text-balance leading-relaxed px-4 text-card-foreground whitespace-pre-line">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              {personalitySummary}
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
            <>
              {/* personality-details 영역 (문자열을 줄바꿈으로 분리) */}
              <Card className="p-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {personalityDetails ? (
                    personalityDetails.split('\n')
                      .filter((detail: string) => detail.trim())
                      .map((detail: string, index: number) => (
                        <p key={index}>{detail.trim()}</p>
                      ))
                  ) : (
                    <>
                      <p>
                        그림에서 나타난 선의 강도와 구도를 분석한 결과, 전반적으로 안정적이고 균형 잡힌 심리 상태를 보이고 있습니다.
                      </p>
                      <p>
                        자신감 있는 표현과 적절한 공간 활용이 눈에 띄며, 이는 건강한 자아상과 긍정적인 대인관계를 나타냅니다.
                      </p>
                    </>
                  )}
                </div>
              </Card>

              {/* personality-advices 영역 (동일한 형태) */}
              {personalityAdvices.length > 0 && (
                <Card className="p-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {personalityAdvices.map((advice: string, index: number) => (
                      <p key={index}>{advice}</p>
                    ))}
                  </div>
                </Card>
              )}
            </>
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

          <p className="text-xs text-center text-muted-foreground leading-relaxed whitespace-pre-line">
            {warning}
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
