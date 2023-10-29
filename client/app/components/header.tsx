import Avatar from './avatar';
import { LuSearch } from "react-icons/lu";
import styles from '../styles/header.module.scss';

export default function Header() {
  return (
    <header className={ styles.wrap }>
      <div>
        <label className="relative block">
          <LuSearch
            className={ styles.searchIcon }
            size={ 20 }
          />
          <input
            type="search"
            placeholder='Stock name'
            className={ styles.searchInput }
          />
        </label>
      </div>

      <Avatar />
    </header>
  )
}