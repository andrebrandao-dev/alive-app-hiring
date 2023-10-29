'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import styles from '../styles/sidebar.module.scss'
import Logo from './logo';

import { LuBadgeDollarSign } from "react-icons/lu";
import { LuHistory } from "react-icons/lu";
import { LuBarChart2 } from "react-icons/lu";
import { LuWalletCards } from "react-icons/lu";


export default function SideBar() {
  const pathname = usePathname()
  const menuItems = [ 
    { text: 'Quote', icon: <LuBadgeDollarSign className={ styles.navIcon } />, to: '/dashboard/quote' }, 
    { text: 'History', icon: <LuHistory className={ styles.navIcon } />, to: '/dashboard/history' }, 
    { text: 'Comparison', icon: <LuBarChart2 className={ styles.navIcon } />, to: '/dashboard/comparison' }, 
    { text: 'Gain/Loss', icon: <LuWalletCards className={ styles.navIcon } />, to: '/dashboard/gain-loss' },
  ]

  return (
    <aside className={ styles.sidebar }>
      <Link href="/dashboard">
        <h1>
          <Logo />
        </h1>
      </Link>

      <nav className="mt-8">
        <ul className="flex gap-y-8 flex-wrap">
          { menuItems.map((item, index) => (
            <li className="w-9/12" key={ index }>
              <Link href={ item.to } className={ `${ styles.navLink } ${ pathname === item.to ? styles.navLinkActive : '' } }` }>
                { item.icon }
                <span>{ item.text }</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}