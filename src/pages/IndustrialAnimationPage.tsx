import { KeywordLandingPage } from '@/pages/KeywordLandingPage'
import { getKeywordLandingById } from '@/lib/keyword-landings'

export function IndustrialAnimationPage() {
  const config = getKeywordLandingById('industrial-animation-vancouver')
  if (!config) return null
  return <KeywordLandingPage config={config} />
}
