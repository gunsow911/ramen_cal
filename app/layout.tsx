import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ラーメン食べても罪滅ぼしウォーキング',
  description: 'ラーメン食べても目指せ0キロカロリー！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
