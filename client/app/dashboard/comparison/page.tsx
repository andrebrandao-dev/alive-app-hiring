'use client'

import HeadingPage from '@/app/components/heading-page';
import { LuBarChart2, LuLoader2 } from 'react-icons/lu';
import { Symbol } from '@/app/store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';
import Input from '@/app/components/inputs';
import Button from '@/app/components/button';
import { Quote, setQuote, setQuoteCompare } from '@/app/store/quoteSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import HeadingData from '@/app/components/heading-data';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };

  quote: {
    quote: Quote | null;
    quoteCompare: Quote | null;
  };
}

export default function ComparisonPage() {
  const dispatch = useDispatch();
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);
  const quoteCompare = useSelector((state: RootState) => state.quote.quoteCompare);
  const [isLoadingCompare, setIsLoadingCompare] = useState(false);

  function handleTriggerCompare() {
    setIsLoadingCompare(true);

    setTimeout(() => {
      const newQuote: Quote = {
        symbol: 'BA',
        open: '179.3100',
        high: '184.1600',
        low: '179.3100',
        price: '182.3100',
        volume: '5503027',
        latestTradingDay: '2023-10-30',
        previousClose: '179.6900',
        change: '2.6200',
        changePercent: '1.4581%',
      };
  
      dispatch(setQuoteCompare(newQuote));

      setIsLoadingCompare(false);
    }, 1000);
  }

  return (
    <>
      <HeadingPage params={{ text: 'Comparison' }}>
        <LuBarChart2 />
      </HeadingPage>

      <HeadingData params={ selectedSearch } />

      {
        selectedSearch && (
          <>
            <div className="flex gap-4 items-end">
              <div className="w-1/2">
                <Input params={{ label: 'Quote', placeholder: 'Search to compare' }} />
              </div>
                <div className="w-1/2">
                  <Button params={{ type: 'button', theme: 'primary' }} onClick={handleTriggerCompare}>
                    {
                      isLoadingCompare ? (
                        <LuLoader2 className="animate-spin" />
                      ) : (
                        'Compare'
                      )
                    }
                  </Button>
                </div>

            </div>
            {
              quoteCompare && (
                <div className="flex gap-4 text-sm text-gray-700 mt-4">
                  <div className="w-1/2">
                    <Card>
                      <strong>{ quoteCompare.symbol }</strong>
                      <span className="block">{ quoteCompare.price }</span>
                    </Card>
                  </div>
                  <div className="w-1/2">
                    <Card>
                      <strong>{ quoteCompare.symbol }</strong>
                      <span className="block">{ quoteCompare.price }</span>
                    </Card>
                  </div>
                </div>
              )
            }
          </>
        )
      }

    </>
  )
}
