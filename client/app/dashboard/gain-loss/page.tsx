'use client'

import HeadingPage from '../../components/heading-page';
import { LuLoader2, LuWalletCards } from 'react-icons/lu';
import { Symbol } from '../../store/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/app/components/card';
import { GainLoss, setGainLoss } from '@/app/store/gainLossSlice';
import Input from '@/app/components/inputs';
import Button from '@/app/components/button';
import { useState } from 'react';

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
          <div className="mt-8">
            <Card>
              <div><strong>Current</strong>{ gainLoss.current }</div>
              <div><strong>Consulting</strong>{ gainLoss.consulting }</div>
              <div><strong>Gain</strong>{ gainLoss.gain ? 'Gain' : 'Loss' }</div>
            </Card>
          </div>
        )
      }

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
