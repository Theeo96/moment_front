"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, MapPin, Loader2, Hospital, MessageSquare, Users, X } from 'lucide-react'
import { useState } from "react"
import NavigationBar from "@/components/navigation-bar"

interface ProfessionalSearchPageProps {
  onBack: () => void
  onNavigateToMain?: () => void
  onNavigateToUpload?: () => void
  onNavigateToTreatment?: () => void
  onNavigateToMyPage?: () => void
}

export default function ProfessionalSearchPage({ 
  onBack,
  onNavigateToMain,
  onNavigateToUpload,
  onNavigateToTreatment,
  onNavigateToMyPage
}: ProfessionalSearchPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [locationError, setLocationError] = useState("")
  const [mapUrl, setMapUrl] = useState<string | null>(null)

  const searchCategories = [
    { name: "정신건강의학과", query: "정신건강의학과", icon: Hospital },
    { name: "심리상담센터", query: "심리상담센터", icon: MessageSquare },
    { name: "정신건강복지센터", query: "정신건강복지센터", icon: Users },
  ]

  const openKakaoMap = (query: string) => {
    setIsLoading(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError("브라우저가 위치 정보를 지원하지 않습니다.")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        
        // Using Kakao Map link/search format
        const webUrl = `https://map.kakao.com/link/search/${encodeURIComponent(query)}`
        
        setMapUrl(webUrl)
        setIsLoading(false)
      },
      (error) => {
        setLocationError("위치 정보를 가져올 수 없습니다. 위치 권한을 허용해주세요.")
        setIsLoading(false)
      }
    )
  }

  const closeMap = () => {
    setMapUrl(null)
  }

  if (mapUrl) {
    return (
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Map Header */}
        <header className="border-b border-border bg-card flex-shrink-0">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">전문기관 검색</h1>
            <button
              onClick={closeMap}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Kakao Map iframe */}
        <div className="flex-1 w-full">
          <iframe
            src={mapUrl}
            className="w-full h-full border-0"
            title="카카오맵 검색"
            allow="geolocation"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-foreground">전문기관 찾기</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 overflow-y-auto">
        <Card className="border-0 shadow-md bg-primary/5 mb-6">
          <CardContent className="py-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-foreground mb-2">주변 전문기관 찾기</h2>
                <p className="text-sm text-muted-foreground">
                  현재 위치를 기반으로 카카오맵에서 가까운 전문기관을 찾아드립니다.
                  원하는 카테고리를 선택하세요.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {locationError && (
          <Card className="border-0 shadow-md bg-destructive/10 mb-6">
            <CardContent className="py-4">
              <p className="text-sm text-destructive">{locationError}</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4 mb-6">
          {searchCategories.map((category, idx) => (
            <Card key={idx} className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <Button
                  onClick={() => openKakaoMap(category.query)}
                  disabled={isLoading}
                  className="w-full h-auto p-6 bg-card hover:bg-muted text-foreground flex items-center justify-between rounded-lg"
                  variant="ghost"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">카카오맵에서 검색</p>
                    </div>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="border-0 shadow-md bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">이용 안내</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 위치 권한을 허용해주시면 더 정확한 검색이 가능합니다.</li>
              <li>• 카카오맵이 앱 내에서 표시됩니다.</li>
              <li>• 실제 진료 가능 여부는 각 기관에 문의하시기 바랍니다.</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Navigation Bar */}
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
