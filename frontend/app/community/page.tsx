'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Home, Heart, MessageCircle, User, Smile, Frown, Meh, HeartIcon } from 'lucide-react'

const moodIcons = [
  { id: 'happy', icon: Smile, label: '기쁨', color: 'text-yellow-500', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500' },
  { id: 'sad', icon: Frown, label: '슬픔', color: 'text-blue-500', bgColor: 'bg-blue-100', borderColor: 'border-blue-500' },
  { id: 'neutral', icon: Meh, label: '평온', color: 'text-gray-500', bgColor: 'bg-gray-100', borderColor: 'border-gray-500' },
  { id: 'love', icon: HeartIcon, label: '사랑', color: 'text-pink-500', bgColor: 'bg-pink-100', borderColor: 'border-pink-500' },
]

const initialPosts = [
  { id: 1, mood: 'happy', text: '오늘 날씨가 너무 좋아서 기분이 좋아요!', time: '5분 전', isMine: false },
  { id: 2, mood: 'neutral', text: '평온한 하루를 보내고 있어요. 다들 좋은 하루 보내세요.', time: '15분 전', isMine: false },
  { id: 3, mood: 'love', text: '가족들과 함께한 저녁 시간이 너무 행복했어요.', time: '1시간 전', isMine: false },
  { id: 4, mood: 'sad', text: '요즘 조금 힘들지만 이겨낼 수 있을 거예요.', time: '2시간 전', isMine: false },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [postText, setPostText] = useState('')
  const [showPostForm, setShowPostForm] = useState(false)
  const router = useRouter()

  const handleSubmitPost = () => {
    if (!selectedMood || !postText.trim()) return

    const newPost = {
      id: Date.now(),
      mood: selectedMood,
      text: postText,
      time: '방금 전',
      isMine: true,
    }

    setPosts([newPost, ...posts])
    setPostText('')
    setSelectedMood(null)
    setShowPostForm(false)
  }

  const getMoodIcon = (moodId: string) => {
    return moodIcons.find((m) => m.id === moodId)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">커뮤니티</h1>
          <Button
            size="sm"
            onClick={() => setShowPostForm(!showPostForm)}
          >
            {showPostForm ? '취소' : '글쓰기'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Post Form */}
          {showPostForm && (
            <Card className="p-6 bg-white shadow-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    지금 기분을 선택해주세요
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {moodIcons.map((mood) => {
                      const Icon = mood.icon
                      return (
                        <button
                          key={mood.id}
                          onClick={() => setSelectedMood(mood.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            selectedMood === mood.id
                              ? `${mood.borderColor} ${mood.bgColor}`
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <Icon className={`h-8 w-8 ${selectedMood === mood.id ? mood.color : 'text-gray-400'}`} />
                          <span className="text-xs font-medium">{mood.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <Textarea
                    placeholder="오늘의 마음을 나눠주세요... (이미지는 업로드할 수 없습니다)"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    maxLength={200}
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    {postText.length}/200
                  </p>
                </div>

                <Button
                  onClick={handleSubmitPost}
                  disabled={!selectedMood || !postText.trim()}
                  className="w-full"
                  size="lg"
                >
                  공유하기
                </Button>
              </div>
            </Card>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              다른 사람들의 마음
            </h2>

            {posts.map((post) => {
              const moodConfig = getMoodIcon(post.mood)
              if (!moodConfig) return null

              const MoodIcon = moodConfig.icon

              return (
                <div
                  key={post.id}
                  className={`flex ${post.isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <Card
                    className={`max-w-[85%] p-4 ${
                      post.isMine
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!post.isMine && (
                        <div className={`h-10 w-10 rounded-full ${moodConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <MoodIcon className={`h-5 w-5 ${moodConfig.color}`} />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className={`text-sm leading-relaxed mb-2 ${post.isMine ? 'text-primary-foreground' : 'text-foreground'}`}>
                          {post.text}
                        </p>
                        <div className="flex items-center gap-2">
                          {!post.isMine && (
                            <span className={`text-xs px-2 py-1 rounded ${moodConfig.bgColor} ${moodConfig.color} font-medium`}>
                              {moodConfig.label}
                            </span>
                          )}
                          <span className={`text-xs ${post.isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {post.time}
                          </span>
                        </div>
                      </div>
                      {post.isMine && (
                        <div className={`h-10 w-10 rounded-full ${moodConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <MoodIcon className={`h-5 w-5 ${moodConfig.color}`} />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                첫 번째 이야기를 나눠보세요
              </p>
            </div>
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
          <button
            onClick={() => router.push('/treatment')}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Heart className="h-6 w-6" />
            <span className="text-xs font-medium">트리트먼트</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
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
