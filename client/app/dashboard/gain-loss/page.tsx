'use client'

import HeadingPage from '../../components/heading-page';
import { LuWalletCards } from 'react-icons/lu';
import { Symbol } from '../../store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
}

export default function GainLossPage() {
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);
  
  return (
    <>
      <HeadingPage params={{ text: 'Gain/Loss' }}>
        <LuWalletCards />
      </HeadingPage>

      {
        selectedSearch && (
          <Card>
            <span>{ selectedSearch.name }</span>
            <span>{ selectedSearch.symbol }</span>
          </Card>
        )
      }
    </>
  )
}
