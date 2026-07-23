import { Analytics } from '@vercel/analytics/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'
import { PrivacyPage } from '@/pages/PrivacyPage'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/work/:slug', element: <CaseStudyPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}
