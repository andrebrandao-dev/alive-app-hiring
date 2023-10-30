'use client'
import layout from '../styles/layout.module.scss'
import SideBar from '../components/sidebar'
import Header from '../components/header'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Provider store={ store }>
        <SideBar />
        <div className={ layout.layout }>
          <Header />
          <main className={ layout.main }>
            {children}
          </main>
        </div>
      </Provider>
    </>
  )
}
