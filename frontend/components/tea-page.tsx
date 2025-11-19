"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Coffee } from 'lucide-react'
import NavigationBar from "@/components/navigation-bar"

interface TeaPageProps {
  onBack: () => void
  personalityResults?: any
  onNavigateToMain?: () => void
  onNavigateToUpload?: () => void
  onNavigateToTreatment?: () => void
  onNavigateToMyPage?: () => void
}

interface Tea {
  name: string
  category: string
  description: string
  benefits: string[]
  bestTime: string
  personality: string
  color: string
}

export default function TeaPage({ 
  onBack,
  personalityResults,
  onNavigateToMain,
  onNavigateToUpload,
  onNavigateToTreatment,
  onNavigateToMyPage
}: TeaPageProps) {
  const [recommendations, setRecommendations] = useState<Tea[]>([])

  const teaPools = {
    neuroticism: [
      {
        name: "카모마일 티",
        category: "진정",
        description: "불안과 긴장을 완화하는 허브티",
        benefits: ["수면 개선", "소화 촉진", "스트레스 완화"],
        bestTime: "저녁 8-9시",
        personality: "신경증",
        color: "bg-blue-100"
      },
      {
        name: "라벤더 티",
        category: "이완",
        description: "감정 조절과 분노 완화에 도움",
        benefits: ["긴장 완화", "두통 감소", "숙면 유도"],
        bestTime: "저녁 7-8시",
        personality: "신경증",
        color: "bg-blue-100"
      },
      {
        name: "레몬밤 티",
        category: "안정",
        description: "마음을 차분하게 하는 허브티",
        benefits: ["불안 감소", "집중력 향상", "기분 전환"],
        bestTime: "오후 3-4시",
        personality: "신경증",
        color: "bg-blue-100"
      }
    ],
    extraversion: [
      {
        name: "페퍼민트 티",
        category: "활력",
        description: "정신을 맑게 하고 활력을 주는 차",
        benefits: ["집중력 향상", "소화 촉진", "피로 해소"],
        bestTime: "오전 10-11시",
        personality: "외향성",
        color: "bg-yellow-100"
      },
      {
        name: "예르바 마테",
        category: "에너지",
        description: "사회적 에너지를 증진시키는 차",
        benefits: ["활력 증진", "집중력 강화", "기분 고양"],
        bestTime: "오전 9-10시",
        personality: "외향성",
        color: "bg-yellow-100"
      },
      {
        name: "생강차",
        category: "자극",
        description: "자신감과 활력을 부여하는 차",
        benefits: ["면역력 강화", "혈액순환", "소화 개선"],
        bestTime: "아침 8-9시",
        personality: "외향성",
        color: "bg-yellow-100"
      }
    ],
    openness: [
      {
        name: "얼그레이",
        category: "우아함",
        description: "향긋하고 예술적인 향미의 차",
        benefits: ["기분 전환", "집중력 향상", "소화 촉진"],
        bestTime: "오후 2-3시",
        personality: "개방성",
        color: "bg-purple-100"
      },
      {
        name: "히비스커스 티",
        category: "창의성",
        description: "상상력을 자극하는 새콤한 차",
        benefits: ["혈압 조절", "비타민C 보충", "피로 해소"],
        bestTime: "오후 3-4시",
        personality: "개방성",
        color: "bg-purple-100"
      },
      {
        name: "자스민 티",
        category: "감성",
        description: "감수성을 높이는 향긋한 차",
        benefits: ["스트레스 감소", "기분 개선", "항산화"],
        bestTime: "오후 4-5시",
        personality: "개방성",
        color: "bg-purple-100"
      }
    ],
    agreeableness: [
      {
        name: "로즈 티",
        category: "따뜻함",
        description: "마음을 따뜻하게 하는 꽃차",
        benefits: ["감정 안정", "피부 개선", "소화 촉진"],
        bestTime: "오후 2-3시",
        personality: "친화성",
        color: "bg-pink-100"
      },
      {
        name: "로즈힙 티",
        category: "연민",
        description: "타인에 대한 배려를 높이는 차",
        benefits: ["비타민C 보충", "면역력 강화", "피로 회복"],
        bestTime: "오전 10-11시",
        personality: "친화성",
        color: "bg-pink-100"
      },
      {
        name: "카밀레 티",
        category: "공감",
        description: "공감 능력을 높이는 부드러운 차",
        benefits: ["진정 효과", "소화 개선", "숙면 유도"],
        bestTime: "저녁 7-8시",
        personality: "친화성",
        color: "bg-pink-100"
      }
    ],
    conscientiousness: [
      {
        name: "녹차",
        category: "집중",
        description: "집중력과 자제력을 높이는 차",
        benefits: ["집중력 향상", "항산화", "신진대사 촉진"],
        bestTime: "오전 9-10시",
        personality: "성실성",
        color: "bg-green-100"
      },
      {
        name: "로즈마리 티",
        category: "명료함",
        description: "기억력과 인지 기능을 돕는 차",
        benefits: ["기억력 강화", "집중력 향상", "두통 완화"],
        bestTime: "오전 10-11시",
        personality: "성실성",
        color: "bg-green-100"
      },
      {
        name: "우롱차",
        category: "균형",
        description: "신중한 판단을 돕는 균형잡힌 차",
        benefits: ["신진대사", "집중력", "스트레스 완화"],
        bestTime: "오후 2-3시",
        personality: "성실성",
        color: "bg-green-100"
      }
    ]
  }

  useEffect(() => {
    const selectedTeas: Tea[] = []
    
    // 각 성격 5요인에서 랜덤으로 하나씩 선택
    Object.values(teaPools).forEach((pool) => {
      const randomIndex = Math.floor(Math.random() * pool.length)
      selectedTeas.push(pool[randomIndex])
    })
    
    setRecommendations(selectedTeas)
  }, [])

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="flex items-center px-4 py-2">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-chart-4">오늘의 차 추천</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        {/* Title Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-3">
            <Coffee className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            오늘의 차 추천
          </h2>
          <p className="text-sm text-muted-foreground">
            성격 5요인별로 엄선한 차를 마셔보세요
          </p>
        </div>

        {/* Recommended Teas */}
        <div className="space-y-3">
          {recommendations.map((tea, idx) => (
            <Card 
              key={idx} 
              className="border-2 border-border hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-16 h-16 ${tea.color} rounded-lg flex items-center justify-center`}>
                    <Coffee className="w-8 h-8 text-foreground/70" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-foreground">
                        {tea.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {tea.description}
                    </p>
                    <div className="space-y-1 mb-2">
                      <p className="text-xs text-foreground/80 font-medium">효능:</p>
                      <div className="flex flex-wrap gap-1">
                        {tea.benefits.map((benefit, i) => (
                          <span 
                            key={i}
                            className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-foreground/60">
                      ⏰ 추천 시간: {tea.bestTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            따뜻한 차 한 잔으로 하루를 시작해보세요<br />
            차를 마시며 심호흡하면 마음이 더 편안해집니다
          </p>
        </div>
      </main>

      <NavigationBar
        currentPage="treatment"
        onNavigateToMain={onNavigateToMain}
        onNavigateToUpload={onNavigateToUpload}
        onNavigateToTreatment={onNavigateToTreatment}
        onNavigateToMyPage={onNavigateToMyPage}
      />
    </div>
  )
}
