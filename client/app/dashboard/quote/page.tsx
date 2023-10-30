'use client'

import HeadingPage from '../../components/heading-page';
import { LuBadgeDollarSign } from 'react-icons/lu';
import { Symbol } from '../../store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
}

export default function QuotePage() {
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);

  return (
    <>
      <HeadingPage params={{ text: 'Quote' }}>
        <LuBadgeDollarSign />
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
