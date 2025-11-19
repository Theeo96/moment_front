"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, X, MusicIcon } from 'lucide-react'
import NavigationBar from "@/components/navigation-bar"

interface MusicPageProps {
  onBack: () => void
  personalityResults?: any
  onNavigateToMain?: () => void
  onNavigateToUpload?: () => void
  onNavigateToTreatment?: () => void
  onNavigateToMyPage?: () => void
}

interface Playlist {
  title: string
  description: string
  youtubeId: string
  color: string
  category: string
}

export default function MusicPage({ 
  onBack,
  personalityResults,
  onNavigateToMain,
  onNavigateToUpload,
  onNavigateToTreatment,
  onNavigateToMyPage
}: MusicPageProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

  const playlists: Playlist[] = [
      {
        title: "마음에 평화",
        description: "깊은 명상과 이완을 위한 평화로운 음악",
        youtubeId: "PLq6TxL0HXwBA98t015xs63r9_y6rEZ6MZ",
        color: "bg-blue-100",
        category: "마음의 평화"
      },
      {
        title: "일상에 리듬 더하기",
        description: "활기찬 하루를 위한 경쾌한 음악",
        youtubeId: "PLq6TxL0HXwBAk81Us8Ut2ldFTJ4syvXD7",
        color: "bg-orange-100",
        category: "일상의 리듬"
      },
      {
        title: "4차원 여행",
        description: "몽환적이고 신비로운 사운드 여행",
        youtubeId: "PLq6TxL0HXwBDmGKSofu-vOtiLHGUJQ4-c",
        color: "bg-purple-100",
        category: "4차원 여행"
      },
      {
        title: "감성 더하기",
        description: "마음을 울리는 감성적인 멜로디",
        youtubeId: "PLq6TxL0HXwBB8Xi4SevnxerN-ErpdBatT",
        color: "bg-pink-100",
        category: "감성 플러스"
      },
      {
        title: "자연의 소리",
      description: "집중과 수면을 돕는 자연의 소리",
        youtubeId: "PLq6TxL0HXwBDYaTCyNG98n-i3-i_p6DWp",
      color: "bg-gray-100",
        category: "자연의 소리"
      }
    ]

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist)
  }

  const closePlayer = () => {
    setSelectedPlaylist(null)
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="flex items-center px-4 py-2">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-chart-4">나를 위한 음악</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        {/* Title Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
            <MusicIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            오늘의 음악 추천
          </h2>
          <p className="text-sm text-muted-foreground">
            당신의 마음을 위한 특별한 플레이리스트
          </p>
        </div>

        {/* Recommended Playlists */}
        <div className="space-y-3">
          {playlists.map((playlist, idx) => (
            <Card 
              key={idx} 
              className="border-2 border-border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePlaylistClick(playlist)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-16 h-16 ${playlist.color} rounded-lg flex items-center justify-center`}>
                    <MusicIcon className="w-8 h-8 text-foreground/70" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground mb-1">
                      {playlist.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {playlist.description}
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      {playlist.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            음악을 들으며 깊은 호흡을 해보세요<br />
            하루 10분 음악 감상으로 스트레스를 줄일 수 있습니다
          </p>
        </div>
      </main>

      {/* Full Screen Player */}
      {selectedPlaylist && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          {/* YouTube Player - Full screen */}
          <div className="flex-1 bg-black relative">
              <button 
                onClick={closePlayer}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
              <X className="w-6 h-6 text-white" />
              </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/videoseries?list=${selectedPlaylist.youtubeId}&autoplay=1`}
              title={selectedPlaylist.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

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
