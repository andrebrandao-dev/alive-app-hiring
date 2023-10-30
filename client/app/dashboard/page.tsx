'use client'

import { useSelector } from 'react-redux';
import HeadingPage from '../components/heading-page';
import { Symbol } from '../store/searchSlice';
import { LuHome } from 'react-icons/lu';
import Card from '../components/card';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
}

export default function Home() {
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);
  console.log(selectedSearch);
  return (
    <>
      <HeadingPage params={{ text: 'Home Dashboard' }}>
        <LuHome />
      </HeadingPage>
      <div className="mt-8 border w-full">
        {
          selectedSearch && (
            <Card>
              <span>{ selectedSearch.name }</span>
              <span>{ selectedSearch.symbol }</span>
            </Card>
          )
        }
      </div>
    </>
  )
}
