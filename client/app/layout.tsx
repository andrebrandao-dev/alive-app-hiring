import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import layout from './styles/layout.module.scss'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Application',
  description: 'Application description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ `bg-slate-100 h-screen w-full ${ manrope.className }` }>
        <div className={ layout.background }></div>
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  )
}
