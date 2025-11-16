'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Home, Heart, MessageCircle, User, MapPin, Phone, Star, Sparkles, Music, BookOpen, Coffee } from 'lucide-react'

const hospitals = [
  {
    id: 1,
    name: '서울 마음 클리닉',
    specialty: '정신건강의학과 전문의',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    distance: '0.8km',
    rating: 4.8,
    reviews: 127,
  },
  {
    id: 2,
    name: '힐링 정신건강의학과',
    specialty: '심리상담 전문',
    address: '서울시 강남구 역삼로 456',
    phone: '02-9876-5432',
    distance: '1.2km',
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: '마인드케어 의원',
    specialty: '우울증, 불안장애 치료',
    address: '서울시 강남구 선릉로 789',
    phone: '02-5555-6666',
    distance: '1.5km',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: '평온한마음 정신과',
    specialty: '심리검사 및 상담',
    address: '서울시 강남구 봉은사로 321',
    phone: '02-7777-8888',
    distance: '2.1km',
    rating: 4.5,
    reviews: 94,
  },
]

const relaxationActivities = [
  {
    id: 1,
    icon: Music,
    title: '마음을 편안하게 하는 음악',
    description: '자연의 소리와 함께하는 명상 음악',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    action: 'music',
  },
  {
    id: 2,
    icon: BookOpen,
    title: '따뜻한 이야기 읽기',
    description: '힐링이 되는 짧은 글귀와 명언',
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    action: 'reading',
  },
  {
    id: 3,
    icon: Sparkles,
    title: '호흡 명상 가이드',
    description: '5분으로 마음의 평화 찾기',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    action: 'meditation',
  },
  {
    id: 4,
    icon: Coffee,
    title: '오늘의 따뜻한 차 추천',
    description: '기분에 맞는 차와 함께 휴식',
    color: 'bg-amber-100',
    iconColor: 'text-amber-600',
    action: 'tea',
  },
]

export default function TreatmentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showHospitals, setShowHospitals] = useState(false)
  const router = useRouter()

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">트리트먼트</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          {!showHospitals ? (
            <>
              {/* Welcome Message */}
              <div className="text-center space-y-2 py-4">
                <h2 className="text-2xl font-bold text-foreground text-balance">
                  잠시 쉬어가세요
                </h2>
                <p className="text-muted-foreground leading-relaxed text-balance">
                  마음이 편안해지는 시간을 가져보세요
                </p>
              </div>

              {/* Relaxation Activities Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {relaxationActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <Card
                      key={activity.id}
                      className="p-6 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className={`h-16 w-16 rounded-2xl ${activity.color} flex items-center justify-center`}>
                          <Icon className={`h-8 w-8 ${activity.iconColor}`} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Professional Support CTA */}
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200 mt-8">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-primary fill-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">
                      전문가의 도움이 필요하신가요?
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      마음이 피곤하시거나 다소 힘드신 분들을 위해<br />
                      주변 상담센터나 커뮤니티, 병원 등을<br />
                      매칭해드리는 모멘트만의 서비스입니다
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowHospitals(true)}
                    size="lg"
                    className="w-full mt-4"
                  >
                    전문가 매칭 보기
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* Search Bar */}
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="상담센터 이름 또는 전문 분야 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Info Card */}
              <Card className="p-4 bg-orange-50 border-orange-200">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      현재 위치 기준
                    </p>
                    <p className="text-xs text-muted-foreground">
                      가까운 순서로 상담센터를 추천해드립니다
                    </p>
                  </div>
                </div>
              </Card>

              {/* Hospital List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    총 {filteredHospitals.length}개의 상담센터
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHospitals(false)}
                  >
                    이전으로
                  </Button>
                </div>

                {filteredHospitals.map((hospital) => (
                  <Card
                    key={hospital.id}
                    className="p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {hospital.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {hospital.specialty}
                          </p>
                        </div>
                        <span className="text-xs bg-orange-100 text-primary px-3 py-1 rounded-full font-medium whitespace-nowrap ml-2">
                          {hospital.distance}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">
                            {hospital.rating}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({hospital.reviews}개 리뷰)
                        </span>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span>{hospital.address}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <a
                            href={`tel:${hospital.phone}`}
                            className="hover:text-primary"
                          >
                            {hospital.phone}
                          </a>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          예약하기
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => window.open(`tel:${hospital.phone}`)}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          전화하기
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {filteredHospitals.length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      검색 결과가 없습니다
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex items-center justify-around px-6 py-3">
          <button
            onClick={() => router.push('/main')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">홈</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <Heart className="h-6 w-6" />
            <span className="text-xs font-medium">트리트먼트</span>
          </button>
          <button
            onClick={() => router.push('/community')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs font-medium">커뮤니티</span>
          </button>
          <button
            onClick={() => router.push('/mypage')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">마이페이지</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
