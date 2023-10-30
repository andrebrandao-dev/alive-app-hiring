'use client'

import Avatar from './avatar';
import { LuSearch, LuLoader2 } from 'react-icons/lu';
import { Symbol, setSelectedSearch } from '../store/searchSlice';
import { useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import styles from '../styles/header.module.scss';

export default function Header() {
  const dispatch = useDispatch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Symbol[]>([]);

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

  const handleClickSearchItem = (item: Symbol): void => {
    dispatch(setSelectedSearch(item));
    setIsSearchOpen(false);
  }

  const data_search: Symbol[] = [
    {
      symbol: 'BA',
      name: 'Boeing Co.',
      type: 'string',
      region: 'string',
      marketOpen: 'string',
      marketClose: 'string',
      timezone: 'string',
      currency: 'string',
      matchScore: 'string',
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