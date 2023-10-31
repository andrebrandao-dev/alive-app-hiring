'use client'

import HeadingPage from '@/app/components/heading-page';
import { LuLoader2, LuWalletCards } from 'react-icons/lu';
import { Symbol } from '@/app/store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/app/components/card';
import { GainLoss, setGainLoss } from '@/app/store/gainLossSlice';
import Input from '@/app/components/inputs';
import Button from '@/app/components/button';
import { useState } from 'react';
import HeadingData from '@/app/components/heading-data';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
  gainLoss: {
    gainLoss: GainLoss | null;
  };
}

export default function GainLossPage() {
  const dispatch = useDispatch();
  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);
  const gainLoss = useSelector((state: RootState) => state.gainLoss.gainLoss);
  const [isLoading, setIsLoading] = useState(false);

  function handleTriggerGetGainLoss() {
    setIsLoading(true);
    setTimeout(() => {
      const gainLossFetch: GainLoss = {
        current: '1000',
        consulting: '1500',
        gain: false,
      }
      dispatch(setGainLoss(gainLossFetch));
      setIsLoading(false);
    }, 1000)
  }

  return (
    <>
      <HeadingPage params={{ text: 'Gain/Loss' }}>
        <LuWalletCards />
      </HeadingPage>

      <HeadingData params={ selectedSearch } />

      {
        selectedSearch && (
          <>
            <div className="flex gap-y-4 text-xs -mx-4 flex-wrap items-end">
              <div className="w-full md:w-1/4 px-4">
                <Input params={{ label: 'Date', placeholder: 'MM-DD-YYYY' }} />
              </div>
              <div className="w-full md:w-2/3 px-4 text-right md:text-left">
                <Button params={{ type: 'button', theme: 'primary' }} onClick={handleTriggerGetGainLoss}>
                  {
                    isLoading && (
                      <LuLoader2 className="animate-spin inline-block" />
                    ) || (
                      <span>Search</span>
                    )
                  }
                </Button>
              </div>
            </div>
      
            {
              gainLoss && (
                <div className="mt-8 text-sm text-gray-700">
                  <Card params={{ border: gainLoss.gain ? 'bg-emerald-500' :'bg-red-500' }}>
                    <div className="flex flex-wrap gap-y-1 relative">
                      <div className="w-full"><strong className="mr-1">You paid</strong>{ gainLoss.consulting }</div>
                      <div className="w-full"><strong className="mr-1">Now</strong>{ gainLoss.current }</div>
                      {
                        gainLoss.gain && (
                          <div className="w-full"><strong className="text-emerald-400">Gain</strong></div>
                        ) || (
                          <div className="w-full"><strong className="text-red-400">Loss</strong></div>
                        )
                      }
                    </div>
                  </Card>
                </div>
              )
            }
          </>
        )
      }
    </>
  )
}
