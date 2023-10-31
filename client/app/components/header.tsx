'use client'

import Avatar from './avatar';
import { LuSearch, LuLoader2 } from 'react-icons/lu';
import { Symbol, setSelectedSearch } from '@/app/store/searchSlice';
import { useState } from 'react';
import { debounce, set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/app/styles/header.module.scss';
import Logo from './logo';
import { IoMenu } from 'react-icons/io5';
import { toggleMenuStatus } from '@/app/store/appSlice';
import Link from 'next/link';

export interface RootState {
  app: {
    menuActived: boolean;
  }
}
export default function Header() {
  const dispatch = useDispatch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Symbol[]>([]);
  const menuActived = useSelector((state: RootState) => state.app.menuActived);

  const handleSearch = (e: any): void => {
    if(e.target.value.length > 1) {
      debounce(() => {
        setSearchLoading(true);
        setIsSearchOpen(true);
        setTimeout(() => {
          setSearchLoading(false);
          setSearchResult(data_search);
        }, 1000);
      }, 300)();
    } else {
      setSearchResult([]);
      setIsSearchOpen(false);
    }
  }

  const handleSearchBlur = (e: any): void => {
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 300);
  }

  const handleClickSearchItem = (item: Symbol): void => {
    dispatch(setSelectedSearch(item));
    setIsSearchOpen(false);
  }

  const handleToggleMenu = (): void => {
    dispatch(toggleMenuStatus(!menuActived));
  }

  const data_search: Symbol[] = [
    {
      symbol: 'IBM',
      name: 'International Business Machines Corp',
      type: 'Equity',
      region: 'United States',
      marketOpen: '09:30',
      marketClose: '16:00',
      timezone: 'UTC-04',
      currency: 'USD',
      matchScore: '1.0000'
    }
  ]

  return (
    <>
      <div className="flex justify-center md:hidden">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>

      <header className={ styles.wrap }>
        <button type="button" className={ styles.toggleButton } onClick={ handleToggleMenu }>
            <IoMenu />
        </button>

        <div className="relative">
          <label className="relative block">
            <LuSearch
              className={ styles.searchIcon }
              size={ 20 }
            />
            <input
              type="text"
              placeholder='Stock name'
              onBlur={ handleSearchBlur }
              onKeyUp={ (e) => handleSearch(e) }
              className={ `${ isSearchOpen ? styles.searchInput : styles.searchInputFullRounded }` }
            />
          </label>
          {
            isSearchOpen && (
              <div className={ styles.searchOptions }>
                {
                  searchLoading && (
                    <span className={ styles.searchLoading }>
                      Loading <LuLoader2 className="animate-spin ml-2" />
                    </span>
                  ) || (
                    <ul className={ styles.searchResult }>
                      {
                        searchResult.map((item, index) => (
                          <li
                            key={ index }
                            className={ `${ styles.searchItem } }` }
                            onClick={ () => handleClickSearchItem(item) }
                          >
                            <strong className={styles.searchItemSymbol}>
                              { item.symbol }
                            </strong>
                            <span className={ styles.searchItemName }>{ item.name }</span>
                          </li>
                        ))
                      }
                    </ul>
                  )
                }
              </div>
            )
          }
        </div>
        
        <div style={{ height: '40px' } }>
          <Avatar />
        </div>
      </header>
    </>
  )
}