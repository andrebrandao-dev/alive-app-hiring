'use client'

import HeadingPage from '../../components/heading-page';
import { LuBarChart2, LuLoader2 } from 'react-icons/lu';
import { Symbol } from '../../store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';
import Input from '@/app/components/inputs';
import Button from '@/app/components/button';
import { Quote, setQuote, setQuoteCompare } from '@/app/store/quoteSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

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
  const quote = useSelector((state: RootState) => state.quote.quote);
  const quoteCompare = useSelector((state: RootState) => state.quote.quoteCompare);
  const [isLoading, setIsLoading] = useState(false);
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

  function handleTriggerSelectQuote() {
    setIsLoading(true);

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
  
      dispatch(setQuote(newQuote));

      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <HeadingPage params={{ text: 'Comparison' }}>
        <LuBarChart2 />
      </HeadingPage>

      <div className="flex gap-4 items-start">

        <div className="w-1/2">
          <div className="w-full">
            <Input params={{ label: 'Select a quote', placeholder: 'Select a quote' }} />
            <div className="w-full text-right mt-2">
              <Button params={{ type: 'button', theme: 'primary' }} onClick={handleTriggerSelectQuote}>
                {
                  isLoading ? (
                    <LuLoader2 className="animate-spin" />
                  ) : (
                    'Select'
                  )
                }
              </Button>
            </div>
          </div>

          {
            quote && (
              <div className="mt-4">
                <Card>
                  <span>{ quote.symbol }</span>
                  <span>{ quote.price }</span>
                </Card>
              </div>
            )
          }
        </div>

        <div className="w-1/2">
          <div className="w-full">
            <Input params={{ label: 'Quote to compare', placeholder: 'Quote to compare' }} />
            <div className="w-full text-right mt-2">
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
              <div className="mt-4">
                <Card>
                  <span>{ quoteCompare.symbol }</span>
                  <span>{ quoteCompare.price }</span>
                </Card>
              </div>
            )
          }
        </div>
      </div>

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
