import type { Metadata } from 'next'
import layout from '../styles/layout.module.scss'
import SideBar from '../components/sidebar'
import Header from '../components/header'


export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dasshboard for the application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SideBar />
      <div className={ layout.layout }>
        <Header />
        <main className={ layout.main }>
          {children}
        </main>
      </div>
    </div>
  )
}
