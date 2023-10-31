'use client'

import HeadingPage from '@/app/components/heading-page';
import { LuBarChart2, LuLoader2 } from 'react-icons/lu';
import { Symbol } from '@/app/store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';
import Input from '@/app/components/inputs';
import Button from '@/app/components/button';
import { Quote, setQuoteCompare } from '@/app/store/quoteSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import HeadingData from '@/app/components/heading-data';
import axios from '@/app/axios';

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
  const [isLoadingCompare, setIsLoadingCompare] = useState(false);
  const [symbolCompare, setSymbolCompare] = useState('');

  function handleTriggerCompare() {
    setIsLoadingCompare(true);
    axios.get(`/dashboard/quote/${ symbolCompare.toUpperCase() }`)
      .then((response) => {
        dispatch(setQuoteCompare(response.data));
        setIsLoadingCompare(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingCompare(false);
      })
  }

  function handleSetSymbolCompare(e: any) {
    setSymbolCompare(e.target.value)
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
            <div className="flex gap-y-4 text-xs -mx-4 flex-wrap items-end">
              <div className="w-full md:w-1/2 px-4">
                <Input
                  params={{ label: 'Quote', placeholder: 'Search to compare' }}
                  value={ symbolCompare }
                  onChange={ handleSetSymbolCompare}
                />
              </div>
                <div className="w-full md:w-1/2 px-4 text-right md:text-left">
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
              quoteCompare && quote && (
                <div className="flex gap-y-4 text-xs -mx-4 flex-wrap text-gray-600 mt-4">
                  <div className="w-1/2 px-4">
                    <Card params={{ border: 'bg-cyan-500' }}>
                      <strong className="text-cyan-500 text-lg">{ quote.symbol }</strong>

                      <div className="flex flex-wrap gap-y-1 relative mt-2">
                        <div className="w-full"><strong className="mr-1">Price</strong>{ quote.price }</div>
                        <div className="w-full"><strong className="mr-1 text-indigo-500">Open</strong> { quote.open }</div>
                        <div className="w-full"><strong className="mr-1 text-emerald-500">High</strong> { quote.high }</div>
                        <div className="w-full"><strong className="mr-1 text-amber-500">Low</strong> { quote.low }</div>
                      </div>
                    </Card>
                  </div>
                  <div className="w-1/2 px-4 scale-90">
                    <Card params={{ border: 'bg-amber-500' }}>
                      <strong className="text-cyan-500 text-lg">{ quoteCompare.symbol }</strong>

                      <div className="flex flex-wrap gap-y-1 relative mt-2">
                        <div className="w-full"><strong className="mr-1">Price</strong>{ quoteCompare.price }</div>
                        <div className="w-full"><strong className="mr-1 text-indigo-500">Open</strong> { quoteCompare.open }</div>
                        <div className="w-full"><strong className="mr-1 text-emerald-500">High</strong> { quoteCompare.high }</div>
                        <div className="w-full"><strong className="mr-1 text-amber-500">Low</strong> { quoteCompare.low }</div>
                      </div>
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
