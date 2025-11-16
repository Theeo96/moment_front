'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Image, Search, User, Calendar, ChevronRight, LogOut, Settings, Bell, HelpCircle } from 'lucide-react'

const testHistory = [
  {
    id: 1,
    date: '2025.01.10',
    result: '양호',
    status: 'good',
  },
  {
    id: 2,
    date: '2024.12.15',
    result: '상담 권장',
    status: 'support',
  },
  {
    id: 3,
    date: '2024.11.20',
    result: '양호',
    status: 'good',
  },
]

export default function MyPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">마이페이지</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Profile Section */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  사용자님
                </h2>
                <p className="text-sm text-muted-foreground">
                  example@email.com
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          {/* Stats Card */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">
                {testHistory.length}
              </p>
              <p className="text-sm text-muted-foreground">총 검사 횟수</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">30</p>
              <p className="text-sm text-muted-foreground">연속 방문일</p>
            </Card>
          </div>

          {/* Test History */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              검사 기록
            </h3>

            {testHistory.map((test) => (
              <Card
                key={test.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(test.status === 'good' ? '/result-good' : '/result-support')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        심리 검사
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {test.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        test.status === 'good'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {test.result}
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">설정</h3>

            <Card>
              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">알림 설정</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="border-t" />

              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">도움말</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="border-t" />

              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">개인정보 설정</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="border-t" />

              <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-destructive">
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5" />
                  <span>로그아웃</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
            </Card>
          </div>

          {/* App Info */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>moment v1.0.0</p>
            <p className="mt-1">© 2025 moment. All rights reserved.</p>
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
          <button
            onClick={() => router.push('/hospital-search')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="h-6 w-6" />
            <span className="text-xs font-medium">병원찾기</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">마이페이지</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
