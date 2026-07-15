import { Analytics } from '@vercel/analytics/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/work/:slug', element: <CaseStudyPage /> },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}
