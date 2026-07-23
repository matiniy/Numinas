import { Analytics } from '@vercel/analytics/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { ThankYouPage } from '@/pages/ThankYouPage'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/work/:slug', element: <CaseStudyPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/thank-you', element: <ThankYouPage /> },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}
