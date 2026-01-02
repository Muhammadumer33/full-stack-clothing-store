import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Raja's Collection",
  description: 'Discover premium ethnic wear and traditional clothing for men and women',
  icons: {
    icon: '/logo.png',
  },
}

import { Suspense } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div className="h-24 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}