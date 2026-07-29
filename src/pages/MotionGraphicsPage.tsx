import { KeywordLandingPage } from '@/pages/KeywordLandingPage'
import { getKeywordLandingById } from '@/lib/keyword-landings'

export function MotionGraphicsPage() {
  const config = getKeywordLandingById('motion-graphics')
  if (!config) return null
  return <KeywordLandingPage config={config} />
}
