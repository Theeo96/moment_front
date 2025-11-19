'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Share2, X, Heart, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'
import NavigationBar from '@/components/navigation-bar'
import { saveTestResult, isTestResultSaved } from '@/lib/test-results-storage'

export default function ResultSupportPage({
  results,
  onBack,
  onNavigateToMain,
  onNavigateToUpload,
  onNavigateToTreatment,
  onNavigateToMyPage,
  fromHistory = false // 추가: 검사 내역에서 왔는지 구분
}: {
  results: any
  onBack: () => void
  onNavigateToMain: () => void
  onNavigateToUpload: () => void
  onNavigateToTreatment: () => void
  onNavigateToMyPage: () => void
  fromHistory?: boolean // 추가
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [showTreatmentPopup, setShowTreatmentPopup] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const alreadySaved = isTestResultSaved(results)

  // personality 데이터에서 정보 추출 (실제 JSON 구조에 맞게)
  const personality = results?.personality || {}
  const personalityType = personality?.type || {}
  const personalityIcon = personalityType?.icon || "😔"
  const personalitySummary = personality?.summary || "괜찮아요, 당신은 충분히 잘하고 있어요"
  const personalityDetails = personality?.details || "" // 문자열 (줄바꿈 포함)
  const personalityAdvices = personality?.advices || [] // 배열
  const personalityWarning = personality?.warning || "" // 문자열

  const handleSaveResults = () => {
      if (alreadySaved) return

      const saved = saveTestResult(results)
      if (saved) {
        setIsSaved(true)
        // setTimeout(() => setIsSaved(false), 2000)
      }
    }


  // personality.type을 f-string 형식으로 변환: '{description} {name}({key})'
  const title = personalityType?.description && personalityType?.name && personalityType?.key
    ? `${personalityType.description} ${personalityType.name}(${personalityType.key})`
    : "요즘 조금 힘든 시간을\n보내고 계시는군요"

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
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            className="w-full flex items-center justify-center h-12 bg-[rgba(252,232,210,1)]"
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
                        그림을 살펴보면, 현재 일상에서 느끼는 부담감과 긴장이 조금씩 쌓여있는 것으로 보입니다.
                      </p>
                      <p>
                        선의 흐름과 강도를 보면 마음속 깊은 곳에 표현하기 어려운 감정들이 자리잡고 있으며, 이는 자연스러운 반응입니다. 누구나 삶의 여정에서 이런 순간들을 경험합니다.
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

              {/* personality-warning 영역 (동일한 형태) */}
              {personalityWarning && (
                <Card className="p-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <p>{personalityWarning}</p>
                  </div>
                </Card>
              )}
            </>
          )}

          <div className="space-y-2.5 mt-6">
            <Button
              size="lg"
              className="w-full h-12 text-sm font-semibold"
              onClick={() => setShowTreatmentPopup(true)}
            >
              <Heart className="mr-2 h-4 w-4" />
              트리트먼트
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full h-12 text-sm"
              onClick={onNavigateToMain}
            >
              <Home className="mr-2 h-4 w-4" />
              홈
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-sm"
              onClick={handleSaveResults}
              disabled={isSaved || alreadySaved}
            >
              <Share2 className="mr-2 h-4 w-4" />
              {alreadySaved ? '저장 완료' : isSaved ? '저장 완료' : '결과 저장'}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground leading-relaxed whitespace-pre-line">
            ※ 본 검사 결과는 참고 자료이며, 전문적인 의료 진단을 대체하지 않습니다.
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

      {showTreatmentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in duration-300">
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-chart-4">💖 트리트먼트</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTreatmentPopup(false)}
                  className="h-8 w-8 flex-shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-3.5 p-5 bg-accent/10 rounded-xl">
                <div className="flex items-center gap-3">
                  
                  <h3 className="text-base font-semibold text-foreground">
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

              <div className="space-y-2.5">
                <Button
                  size="lg"
                  className="w-full h-11 text-sm font-semibold"
                  onClick={() => {
                    setShowTreatmentPopup(false)
                    onNavigateToTreatment()
                  }}
                >
                  주변 상담센터 및 병원 찾기
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-11 text-sm"
                  onClick={() => setShowTreatmentPopup(false)}
                >
                  나중에 살펴볼게요
                </Button>
              </div>

              <Card className="p-4 bg-red-50 border-red-200">
                <h4 className="font-semibold text-foreground mb-2.5 text-sm">
                  긴급 상담이 필요하신가요?
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">정신건강 위기상담</div>
                    <a href="tel:1577-0199" className="font-semibold text-primary block">
                      1577-0199
                    </a>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">자살 예방 상담</div>
                    <a href="tel:1393" className="font-semibold text-primary block">
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