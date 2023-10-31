'use client'

import HeadingPage from '@/app/components/heading-page';
import { LuLoader2, LuWalletCards, LuArrowBigUp, LuArrowBigDown } from 'react-icons/lu';
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
            <div className="flex gap-4 items-end">
              <div className="w-1/4">
                <Input params={{ label: 'Date', placeholder: 'Date' }} />
              </div>
              <div className="w-2/4">
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
                  <Card>
                    <div className="flex flex-wrap gap-y-1 relative">
                      <div className="w-full"><strong className="mr-1">You paid</strong>{ gainLoss.consulting }</div>
                      <div className="w-full"><strong className="mr-1">Now</strong>{ gainLoss.current }</div>
                      {
                        gainLoss.gain && (
                          <>
                            <div className="w-full"><strong className="text-emerald-400">Gain</strong></div>
                            <LuArrowBigUp className="absolute bottom-0 right-0 text-4xl opacity-25 text-emerald-400" />
                          </>
                        ) || (
                          <>
                            <div className="w-full"><strong className="text-red-400">Loss</strong></div>
                            <LuArrowBigDown className="absolute bottom-0 right-0 text-4xl opacity-25 text-red-400"/>
                          </>
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
