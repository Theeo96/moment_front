export interface TestResult {
  id: string
  date: string
  timestamp: number
  type: 'good' | 'support'
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
  descriptions: {
    openness: string
    conscientiousness: string
    extraversion: string
    agreeableness: string
    neuroticism: string
  }
  personality?: any // 추가: personality 객체 포함
}

const STORAGE_KEY = 'moment_test_results'

export const saveTestResult = (results: any) => {
  try {
    if (results.id) {
      const existing = getTestById(results.id)
      if (existing) {
        console.log('[v0] Test result already saved, skipping')
        return existing
      }
    }

    const history = getTestHistory()
    const newResult: TestResult = {
      ...results,
      id: results.id || `test_${Date.now()}`,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace('.', ''),
      timestamp: Date.now()
    }
    
    history.unshift(newResult)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    
    console.log('[v0] Test result saved to localStorage:', newResult)
    return newResult
  } catch (error) {
    console.error('[v0] Error saving test result:', error)
    return null
  }
}

export const isTestResultSaved = (results: any): boolean => {
  try {
    if (!results) return false
    
    // id가 있으면 해당 id로 검색
    if (results.id) {
      const existing = getTestById(results.id)
      return !!existing
    }
    
    // id가 없으면 timestamp로 검색 (최근 5초 이내 동일한 결과)
    if (results.timestamp) {
      const history = getTestHistory()
      const match = history.find(test => 
        Math.abs(test.timestamp - results.timestamp) < 5000
      )
      return !!match
    }
    
    return false
  } catch (error) {
    console.error('[v0] Error checking if test result is saved:', error)
    return false
  }
}

export const getTestHistory = (): TestResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('[v0] Error loading test history:', error)
    return []
  }
}

export const getTestById = (id: string): TestResult | null => {
  const history = getTestHistory()
  return history.find(test => test.id === id) || null
}

export const deleteTestResult = (id: string) => {
  try {
    const history = getTestHistory()
    const filtered = history.filter(test => test.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('[v0] Error deleting test result:', error)
    return false
  }
}
