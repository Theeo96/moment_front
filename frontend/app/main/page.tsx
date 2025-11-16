'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Heart, MessageCircle, User } from 'lucide-react'

export default function MainPage() {
  const router = useRouter()

  const handleStartTest = () => {
    router.push('/consent')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">moment</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              안녕하세요,
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              오늘 당신의 마음은 어떤가요?
            </p>
          </div>

          {/* Main CTA Card */}
          <Card className="p-8 shadow-lg bg-gradient-to-br from-orange-100 to-white border-orange-200">
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-primary fill-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                심리 테스트 시작하기
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                간단한 그림 검사로 당신의 현재 심리 상태를 확인해보세요
              </p>
              <Button
                onClick={handleStartTest}
                size="lg"
                className="w-full h-14 text-lg font-semibold mt-4"
              >
                테스트 시작
              </Button>
            </div>
          </Card>

          {/* Info Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card 
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push('/treatment')}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    트리트먼트
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    당신을 위한 상담사를 매칭해보세요
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push('/mypage')}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    나의 기록
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    지금까지의 검사 기록을 확인하세요
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex items-center justify-around px-6 py-3">
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">홈</span>
          </button>
          <button
            onClick={() => router.push('/treatment')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
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
