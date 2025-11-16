'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ConsentPage() {
  const [agreed, setAgreed] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    if (agreed && confirmed) {
      router.push('/upload')
    }
  }

  const canProceed = agreed && confirmed

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">개인정보 동의</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground text-balance">
              테스트를 시작하기 전에
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              아래 내용을 확인하고 동의해주세요
            </p>
          </div>

          {/* Consent Content Card */}
          <Card className="p-6 shadow-lg">
            <ScrollArea className="h-80 pr-4">
              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    1. 개인정보 수집 및 이용 목적
                  </h3>
                  <p className="text-muted-foreground">
                    본 심리 검사는 사용자의 현재 심리 상태를 파악하고, 필요한 경우 적절한 상담 기관을 추천하기 위한 목적으로 수행됩니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    2. 수집하는 개인정보 항목
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>업로드하는 그림 이미지</li>
                    <li>검사 일시 및 결과</li>
                    <li>선택적으로 제공하는 연락처 정보</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    3. 개인정보의 보유 및 이용 기간
                  </h3>
                  <p className="text-muted-foreground">
                    수집된 개인정보는 검사 완료 후 1년간 보관되며, 기간 만료 시 자동으로 파기됩니다. 사용자가 직접 삭제를 요청할 경우 즉시 삭제 처리됩니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    4. 개인정보의 제3자 제공
                  </h3>
                  <p className="text-muted-foreground">
                    본 서비스는 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 법률에 의해 요구되는 경우는 예외로 합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    5. 동의 거부 권리
                  </h3>
                  <p className="text-muted-foreground">
                    개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 심리 검사 서비스 이용이 제한될 수 있습니다.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-muted-foreground">
                    본 검사는 전문적인 의료 진단을 대체하지 않으며, 참고 자료로만 활용되어야 합니다. 정확한 진단을 위해서는 반드시 전문가와 상담하시기 바랍니다.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </Card>

          {/* Consent Checkboxes */}
          <Card className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-1"
              />
              <label
                htmlFor="agree"
                className="text-sm leading-relaxed cursor-pointer"
              >
                위 개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                className="mt-1"
              />
              <label
                htmlFor="confirm"
                className="text-sm leading-relaxed cursor-pointer"
              >
                위 내용을 확인한 후 테스트를 시작합니다.
              </label>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-14"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              size="lg"
              className={`flex-1 h-14 text-base font-semibold transition-all ${
                canProceed
                  ? 'bg-primary hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              onClick={handleNext}
              disabled={!canProceed}
            >
              네, 알겠어요
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
