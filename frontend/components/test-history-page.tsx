"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Calendar } from 'lucide-react'
import { getTestHistory, type TestResult } from '@/lib/test-results-storage'

interface TestHistoryPageProps {
  onBack: () => void
  onViewResult: (result: TestResult) => void
}

export default function TestHistoryPage({ onBack, onViewResult }: TestHistoryPageProps) {
  const [history, setHistory] = useState<TestResult[]>([])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  useEffect(() => {
    const loadHistory = () => {
      const data = getTestHistory()
      setHistory(data)
    }
    
    loadHistory()
  }, [])

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-chart-4">심리 검사 내역</h1>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto pb-6">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">
              아직 검사 내역이 없습니다
            </h2>
            <p className="text-sm text-muted-foreground">
              첫 검사를 시작해보세요
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((test) => {
              const needsSupport = test.personality?.type?.name === '신경성'
              
              return (
              <Card
                key={test.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onViewResult(test)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm text-foreground">HTP 심리 검사</h3>
                        {needsSupport && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            상담 권장
                          </span>
                        )}
                    </div>
                      <p className="text-xs text-muted-foreground mb-2">{formatDate(test.date)}</p>
                    
                  </div>
                </div>
              </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
