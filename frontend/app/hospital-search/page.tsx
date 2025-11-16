'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Home, Image, Search, User, MapPin, Phone, Star } from 'lucide-react'

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

export default function HospitalSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
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
        <div className="px-6 py-4 space-y-4">
          <h1 className="text-xl font-bold text-foreground">병원 찾기</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="병원 이름 또는 전문 분야 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-4">
          {/* Info Card */}
          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  현재 위치 기준
                </p>
                <p className="text-xs text-muted-foreground">
                  가까운 순서로 병원을 추천해드립니다
                </p>
              </div>
            </div>
          </Card>

          {/* Hospital List */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              총 {filteredHospitals.length}개의 병원
            </p>

            {filteredHospitals.map((hospital) => (
              <Card
                key={hospital.id}
                className="p-5 hover:shadow-md transition-shadow cursor-pointer"
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
                <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  검색 결과가 없습니다
                </p>
              </div>
            )}
          </div>
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
          <button
            onClick={() => router.push('/consent')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Image className="h-6 w-6" />
            <span className="text-xs font-medium">심리테스트</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <Search className="h-6 w-6" />
            <span className="text-xs font-medium">병원찾기</span>
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
