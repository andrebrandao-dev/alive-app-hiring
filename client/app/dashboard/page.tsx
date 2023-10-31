'use client'

import { useSelector } from 'react-redux';
import HeadingPage from '../components/heading-page';
import { Symbol } from '../store/searchSlice';
import { LuHome } from 'react-icons/lu';
import HeadingData from '../components/heading-data';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
}

export default function Home() {
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);
  return (
    <>
      <HeadingPage params={{ text: 'Home Dashboard' }}>
        <LuHome />
      </HeadingPage>
      
      <HeadingData params={ selectedSearch } />
    </>
  )
}
