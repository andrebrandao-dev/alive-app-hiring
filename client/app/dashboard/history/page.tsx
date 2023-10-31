'use client'

import HeadingPage from '../../components/heading-page';
import { LuHistory } from 'react-icons/lu';
import { Symbol } from '../../store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';
import Input from '@/app/components/inputs';
import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import Button from '@/app/components/button';
import { useDispatch } from 'react-redux';
import { History, setHistory } from '@/app/store/historySlice';

interface RootState {
  search: {
    selectedSearch: Symbol | null;
  };
  history: {
    history: History[];
  };
}

export default function HistoryPage() {
  const dispatch = useDispatch();

  const selectedSearch = useSelector((state: RootState) => state.search.selectedSearch);
  const history = useSelector((state: RootState) => state.history.history);
  const [isLoading, setIsLoading] = useState(false);

  function handleTriggerSearch(e: any) {
    setIsLoading(true);
    setTimeout(() => {
      const historyFetch: History = {
        date: '2023-10-27',
        open: '180.0000',
        high: '182.3299',
        low: '179.0100',
        close: '179.6900',
        volume: '4606334',
      }

      const historyList: History[] = [ historyFetch ];
      dispatch(setHistory(historyList));
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <HeadingPage params={{ text: 'History' }}>
        <LuHistory />
      </HeadingPage>

      <div className="flex gap-4 items-end">
        <div className="w-1/4">
          <Input params={{ label: 'Start date', placeholder: 'Start date' }} />
        </div>
        <div className="w-1/4">
          <Input params={{ label: 'End date', placeholder: 'End date' }} />
        </div>
        <div className="w-2/4">
          <Button params={{ type: 'button', theme: 'primary' }} onClick={handleTriggerSearch}>
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
        selectedSearch && (
          <Card>
            <span>{ selectedSearch.name }</span>
            <span>{ selectedSearch.symbol }</span>
          </Card>
        )
      }

      {
        history.length  && (
          <div className="mt-8">
            <Card>
              <div><strong>Date</strong> { history[0].date }</div>
              <div><strong>Open</strong> { history[0].open }</div>
              <div><strong>High</strong> { history[0].high }</div>
              <div><strong>Low</strong> { history[0].low }</div>
              <div><strong>Close</strong> { history[0].close }</div>
              <div><strong>Volume</strong> { history[0].volume }</div>
            </Card>
          </div>
        ) || (
          <div className="mt-8">
            <span>No history found yet.</span>
          </div>
        )
      }
    </>
  )
}
