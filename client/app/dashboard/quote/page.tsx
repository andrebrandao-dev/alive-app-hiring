'use client'

import HeadingPage from '@/app/components/heading-page';
import { LuBadgeDollarSign } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { Symbol } from '@/app/store/searchSlice';
import { Quote, setQuote } from '@/app/store/quoteSlice';
import Card from '@/app/components/card';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

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

      {
        selectedSearch && (
          <Card>
            <span>{ selectedSearch.name }</span>
            <span>{ selectedSearch.symbol }</span>
          </Card>
        )
      }

      {
        quote && (
          <Card>
            <div><strong>Symbol</strong> { quote.symbol }</div>
            <div><strong>Open</strong> { quote.open }</div>
            <div><strong>Hiht</strong> { quote.high }</div>
            <div><strong>Low</strong> { quote.low }</div>
            <div><strong>Price</strong> { quote.price }</div>
            <div><strong>Volume</strong> { quote.volume }</div>
            <div><strong>Lastest Trading Day</strong> { quote.latestTradingDay }</div>
            <div><strong>Previous Close</strong> { quote.previousClose }</div>
            <div><strong>Change</strong> { quote.change }</div>
            <div><strong>Change Percent</strong> { quote.changePercent }</div>
          </Card>
        )
      }
    </>
  )
}