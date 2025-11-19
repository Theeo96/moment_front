"use client"

import { useState, useEffect } from "react"
import Splash from "@/components/splash"
import TutorialModal from "@/components/tutorial-modal"
import SignupPage from "@/components/signup-page"
import PrivacyConsentPage from "@/components/privacy-consent-page"
import ImageUploadPage from "@/components/image-upload-page"
import AnalysisLoadingPage from "@/components/analysis-loading-page"
import ResultsPage from "@/components/results-page"
import ResultSupportPage from "@/components/result-support-page"
import ProfessionalSearchPage from "@/components/professional-search-page"
import MainPage from "@/components/main-page"
import ErrorPage from "@/components/error-page"
import MyPage from "@/components/my-page"
import TreatmentPage from "@/components/treatment-page"
import SharingPage from "@/components/sharing-page"
import TermsPage from "@/components/Terms-page"
import MusicPage from "@/components/music-page"
import TeaPage from "@/components/tea-page"
import TestHistoryPage from "@/components/test-history-page"
import type { TestResult } from "@/lib/test-results-storage"

type AppState = "splash" | "tutorial" | "signup" | "privacy" | "upload" | "analysis" | "results" | "professional" | "main" | "error" | "mypage" | "treatment" | "sharing" | "Terms" | "music" | "tea" | "testHistory"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("splash")
  const [userProfile, setUserProfile] = useState<any>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [uploadData, setUploadData] = useState<{ image: string; category: number } | null>(null)
  const [selectedTestResult, setSelectedTestResult] = useState<TestResult | null>(null)
  const [fromHistory, setFromHistory] = useState(false) // 추가: 검사 내역에서 왔는지 추적

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState("tutorial")
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const needsSupport = analysisResults?.personality?.type?.name === '신경성'

  return (
    <main className="min-h-screen bg-background">
      {appState === "splash" && <Splash />}
      {appState === "tutorial" && (
        <>
          <Splash />
          <TutorialModal
            onStartNow={() => setAppState("signup")}
            onLater={() => setAppState("main")}
          />
        </>
      )}
      {appState === "signup" && (
        <SignupPage
          onSignup={(profile) => {
            setUserProfile(profile)
            setAppState("privacy")
          }}
          onSkip={() => setAppState("main")}
        />
      )}
      {appState === "main" && (
        <MainPage
          userProfile={userProfile}
          onStartTest={() => setAppState("privacy")}
          onLogout={() => setAppState("mypage")}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToPrivacy={() => setAppState("privacy")}
          onNavigateToHospital={() => setAppState("treatment")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToSharing={() => setAppState("sharing")}
        />
      )}
      {appState === "mypage" && (
        <MyPage
          userProfile={userProfile}
          onBack={() => setAppState("main")}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToTerms={() => setAppState("Terms")}
          onViewTestHistory={() => setAppState("testHistory")}
        />
      )}
      {appState === "privacy" && (
        <PrivacyConsentPage
          onAgree={() => setAppState("upload")}
          onBack={() => setAppState("main")}
        />
      )}
      {appState === "upload" && (
        <ImageUploadPage
          onUpload={(data) => {
            setUploadedImage(data.image)
            setUploadData({ image: data.image, category: data.category })
            setAppState("analysis")
          }}
          onError={() => setAppState("upload")}
          onBack={() => setAppState("privacy")}
        />
      )}
      {appState === "analysis" && uploadData && (
        <AnalysisLoadingPage
          onComplete={(result) => {
            setAnalysisResults(result)
            setAppState("results")
          }}
          onError={() => setAppState("upload")}
          image={uploadData.image}
          category={uploadData.category}
        />
      )}
      {appState === "results" && !needsSupport && (
        <ResultsPage
          results={analysisResults}
          onViewProfessionals={() => setAppState("professional")}
          onBack={() => {
            if (fromHistory) {
              setFromHistory(false)
              setAppState("testHistory")
            } else {
              setAppState("upload")
            }
          }}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToMyPage={() => setAppState("mypage")}
          fromHistory={fromHistory} // 추가
        />
      )}
      {appState === "results" && needsSupport && (
        <ResultSupportPage
          results={analysisResults}
          onBack={() => {
            if (fromHistory) {
              setFromHistory(false)
              setAppState("testHistory")
            } else {
              setAppState("upload")
            }
          }}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToMyPage={() => setAppState("mypage")}
        />
      )}
      {appState === "treatment" && (
        <TreatmentPage
          onBack={() => setAppState("main")}
          onNavigateToHospital={() => setAppState("professional")}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToMyPage={() => setAppState("mypage")}
          onNavigateToMusic={() => setAppState("music")}
          onNavigateToTea={() => setAppState("tea")}
        />
      )}
      {appState === "music" && (
        <MusicPage
          onBack={() => setAppState("treatment")}
          personalityResults={analysisResults}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToMyPage={() => setAppState("mypage")}
        />
      )}
      {appState === "tea" && (
        <TeaPage
          onBack={() => setAppState("treatment")}
          personalityResults={analysisResults}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToMyPage={() => setAppState("mypage")}
        />
      )}
      {appState === "professional" && (
        <ProfessionalSearchPage
          onBack={() => setAppState("main")}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToMyPage={() => setAppState("mypage")}
        />
      )}
      {appState === "sharing" && (
        <SharingPage
          onBack={() => setAppState("main")}
          onNavigateToMain={() => setAppState("main")}
          onNavigateToUpload={() => setAppState("privacy")}
          onNavigateToTreatment={() => setAppState("treatment")}
          onNavigateToMyPage={() => setAppState("mypage")}
        />
      )}
      {appState === "Terms" && (
        <TermsPage
          onBack={() => setAppState("mypage")}
        />
      )}
      {appState === "error" && (
        <ErrorPage
          onRetry={() => setAppState("analysis")}
          onBackToHome={() => setAppState("main")}
        />
      )}
      {appState === "testHistory" && (
        <TestHistoryPage
          onBack={() => setAppState("mypage")}
          onViewResult={(result) => {
            setSelectedTestResult(result)
            setAnalysisResults(result)
            setFromHistory(true) // 검사 내역에서 왔음을 표시
            setAppState("results")
          }}
        />
      )}
    </main>
  )
}
