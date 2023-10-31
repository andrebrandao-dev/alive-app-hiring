'use client'

import HeadingPage from '@/app/components/heading-page';
import { LuBadgeDollarSign } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { Symbol } from '@/app/store/searchSlice';
import { Quote, setQuote } from '@/app/store/quoteSlice';
import Card from '@/app/components/card';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import HeadingData from '@/app/components/heading-data';
import * as moment from 'moment';

export interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
  quote: {
    quote: Quote | null;
  };
}

export default function QuotePage() {
  const dispatch = useDispatch();
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);
  const quote = useSelector((state: RootState) => state.quote.quote);

  useEffect(() => {
    if(!quote) {
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

      saveQuote(newQuote);
    }
  });

  function saveQuote(quote: Quote) {
    dispatch(setQuote(quote));
  }

  return (
    <>
      <HeadingPage params={{ text: 'Quote' }}>
        <LuBadgeDollarSign />
      </HeadingPage>

      <HeadingData params={ selectedSearch } />

      {
        quote && (
          <div className="flex gap-y-4 text-xs -mx-4 flex-wrap text-gray-600">
            <div className="w-full md:w-1/3 px-4">
              <Card params={{ border: 'bg-cyan-500' }}>
                <div className="flex flex-wrap gap-y-1 relative">
                  <div className="w-full"><strong className="mr-1 text-indigo-500">Open</strong> { quote.open }</div>
                  <div className="w-full"><strong className="mr-1 text-emerald-500">High</strong> { quote.high }</div>
                  <div className="w-full"><strong className="mr-1 text-amber-500">Low</strong> { quote.low }</div>
                </div>
              </Card>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <Card params={{ border: 'bg-cyan-500' }}>
                <div className="flex flex-wrap gap-y-1 relative">
                  <div className="w-full"><strong className="mr-1 text-indigo-500">Previous Close</strong> { quote.previousClose }</div>
                  <div className="w-full"><strong className="mr-1 text-emerald-500">Change</strong> { quote.change }</div>
                  <div className="w-full"><strong className="mr-1 text-amber-500">Change Percent</strong> { quote.changePercent }</div>
                </div>
              </Card>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <Card params={{ border: 'bg-cyan-500' }}>
                <div className="flex flex-wrap gap-y-1 relative">
                  <div className="w-full"><strong className="mr-1 text-indigo-500">Price</strong> { quote.price }</div>
                  <div className="w-full"><strong className="mr-1 text-emerald-500">Volume</strong> { quote.volume }</div>
                  <div className="w-full"><strong className="mr-1 text-amber-500">Lastest Trading Day</strong> { quote.latestTradingDay }</div>
                </div>
              </Card>
            </div>
          </div>
        )
      }
    </>
  )
}