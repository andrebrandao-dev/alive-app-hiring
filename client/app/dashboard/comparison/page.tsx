'use client'

import HeadingPage from '../../components/heading-page';
import { LuBarChart2 } from 'react-icons/lu';
import { Symbol } from '../../store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
}

export default function ComparisonPage() {
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);

  return (
    <>
      <HeadingPage params={{ text: 'Comparison' }}>
        <LuBarChart2 />
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
