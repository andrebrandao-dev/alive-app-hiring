'use client'

import Avatar from './avatar';
import { LuSearch, LuLoader2, LuCheckCircle, LuCircle } from "react-icons/lu";
import styles from '../styles/header.module.scss';
import { useState } from 'react';
import { debounce, set } from 'lodash';

type Search = {
  symbol: string,
  name: string,
}

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Search[]>([]);
  const [selectedSearch, setSelectedSearch] = useState<Search | null>(null);

  const handleSearch = (e: any): void => {
    if(e.target.value.length > 1) {
      debounce(() => {
        setSearchLoading(true);
        setIsSearchOpen(true);
        setTimeout(() => {
          setSearchLoading(false);
          setSearchResult(data_search);
        }, 1000);
      }, 500)();
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

  const handleClickSearchItem = (item: Search): void => {
    console.log(item);
    setSelectedSearch(item);
    setIsSearchOpen(false);
  }

  const data_search = [
    {
      symbol: 'BA',
      name: 'Boeing Co.',
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
    }
  ]

  return (
    <header className={ styles.wrap }>
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
                          <strong>
                            { item.symbol }
                          </strong>
                          <span>{ item.name }</span>
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

      <Avatar />
    </header>
  )
}