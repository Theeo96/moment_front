'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual authentication
    router.push('/main')
  }

  const handleSkip = () => {
    router.push('/main')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-2">moment</h1>
          <p className="text-muted-foreground">마음 건강 관리의 시작</p>
        </div>

        <Card className="p-8 shadow-lg">
          <div className="flex gap-2 mb-6">
            <Button
              variant={isLogin ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setIsLogin(true)}
            >
              로그인
            </Button>
            <Button
              variant={!isLogin ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setIsLogin(false)}
            >
              회원가입
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              {isLogin ? '로그인' : '회원가입'}
            </Button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-muted-foreground hover:text-foreground">
                비밀번호를 잊으셨나요?
              </button>
            </div>
          )}
        </Card>

        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={handleSkip}
        >
          로그인 없이 둘러보기
        </Button>
      </div>
    </div>
  )
}
