import { LuLayoutDashboard } from "react-icons/lu";
import styles from '../styles/logo.module.scss'

export default function Logo() {
  return (
    <div className={ styles.logoWrap }>
      <LuLayoutDashboard className={ styles.logoIcon } />
      <span className={ `${ styles.logoText }` }>
        Dashboard.
      </span>
    </div>
  )
}