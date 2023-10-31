'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import styles from '@/app/styles/sidebar.module.scss'
import Logo from './logo';
import { LuBadgeDollarSign, LuHistory, LuBarChart2, LuWalletCards } from 'react-icons/lu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { toggleMenuStatus } from '../store/appSlice';

export interface RootState {
  app: {
    menuActived: boolean;
  }
}


export default function SideBar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const menuItems = [ 
    { text: 'Quote', icon: <LuBadgeDollarSign className={ styles.navIcon } />, to: '/dashboard/quote' }, 
    { text: 'History', icon: <LuHistory className={ styles.navIcon } />, to: '/dashboard/history' }, 
    { text: 'Comparison', icon: <LuBarChart2 className={ styles.navIcon } />, to: '/dashboard/comparison' }, 
    { text: 'Gain/Loss', icon: <LuWalletCards className={ styles.navIcon } />, to: '/dashboard/gain-loss' },
  ]

  const menuActived = useSelector((state: RootState) => state.app.menuActived);
  
  const handleChangeView = (view: string):void =>  {
    router.push(view);
    dispatch(toggleMenuStatus(!menuActived))
  }

  return (
    <aside className={ `${ menuActived ? 'translate-x-0' : '-translate-x-full' } ${ styles.sidebar }` }>

      <Link href="/dashboard" className="hidden md:block">
        <h1>
          <Logo />
        </h1>
      </Link>

      <button type="button" className={ styles.toggleButton } onClick={ () => dispatch(toggleMenuStatus(!menuActived)) }>
        <IoClose />
      </button>

      <nav className="mt-4 lg:block">
        <ul className="flex gap-y-8 flex-wrap">
          { menuItems.map((item, index) => (
            <li className="w-9/12" key={ index }>
              <button 
                type="button"
                className={ `${ styles.navLink } ${ pathname === item.to ? styles.navLinkActive : '' } }` }
                onClick={ () => handleChangeView(item.to) }
              >
                { item.icon }
                <span>{ item.text }</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}