import { LuLayoutDashboard } from "react-icons/lu";
import styles from '../styles/logo.module.scss'

export default function Logo() {
  const isAnimated = false

  return (
    <div 
      className={ `flex items-center text-xl py-4 px-3 ${ isAnimated ? 'animate-pulse' : '' }` }
    >
      <LuLayoutDashboard className="text-cyan-600 text-3xl" />
      <span className={ `${ styles.logoText }` }>
        Dashboard.
      </span>
    </div>
  )
}