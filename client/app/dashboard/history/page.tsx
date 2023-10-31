'use client'

import HeadingPage from '@/app/components/heading-page';
import { LuHistory } from 'react-icons/lu';
import { Symbol } from '@/app/store/searchSlice';
import { useSelector } from 'react-redux';
import Card from '@/app/components/card';
import Input from '@/app/components/inputs';
import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import Button from '@/app/components/button';
import { useDispatch } from 'react-redux';
import { History, setHistory } from '@/app/store/historySlice';
import HeadingData from '@/app/components/heading-data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import axios from '@/app/axios';

import 'swiper/scss';
import 'swiper/css/pagination';
import '../../styles/swiper.scss'
import handleToast from '@/app/utils/handleToast';

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleTriggerSearch(e: any) {
    setIsLoading(true);
    axios.get(`/dashboard/history/${ selectedSearch?.symbol }`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      }
    })
    .then((response) => {
      dispatch(setHistory(response.data));
      setIsLoading(false);
    })
    .catch((error) => {
      dispatch(setHistory([]));
      setIsLoading(false);
      handleToast({ response: error.response });
    })
  }

  function setStartDateValue(e: any) {
    setStartDate(e.target.value);
  }

  function setEndDateValue(e: any) {
    setEndDate(e.target.value);
  }

  return (
    <>
      <HeadingPage params={{ text: 'History' }}>
        <LuHistory />
      </HeadingPage>

      <HeadingData params={ selectedSearch } />

      {
        selectedSearch && (
          <div className="flex gap-y-4 items-end -mx-4 flex-wrap">
            <div className="w-1/2 lg:w-1/4 px-4">
              <Input
                params={{ label: 'Start date', placeholder: 'MM-DD-YYYY' }}
                value={ startDate }
                onChange={setStartDateValue}
              />
            </div>
            <div className="w-1/2 lg:w-1/4 px-4">
              <Input
                params={{ label: 'End date', placeholder: 'MM-DD-YYYY' }}
                value={ endDate }
                onChange={setEndDateValue}
              />
            </div>
            <div className="w-full lg:w-2/4 px-4 text-right lg:text-left">
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
        )
      }

      {
        !!history.length && (
          <div className="mt-8 relative sm">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{  640: {slidesPerView: 2},  768: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
              grabCursor={true}
              pagination={{ dynamicBullets: true }}
              modules={[Pagination]}
            >
              {
                history.map((item: History, index: number) => (
                  <SwiperSlide key={index}>
                    <Card params={{ border: 'bg-cyan-500' }}>
                      <div className="text-xs text-gray-600">
                        <strong className="text-cyan-500 font-medium">{ item.date }</strong>
                        <div className="flex flex-wrap gap-y-1 mt-1">
                          <div className="w-full">
                            <strong className="mr-1 text-indigo-500">Open</strong> { item.open }
                          </div>
                          <div className="w-full">
                            <strong className="mr-1 text-emerald-500">High</strong> { item.high }
                          </div>
                          <div className="full">
                            <strong className="mr-1 text-amber-500">Low</strong> { item.low }
                          </div>
                          <div className="w-full">
                            <strong className="mr-1 text-red-500">Close</strong> { item.close }
                          </div>
                      </div>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        )
      }
    </>
  )
}
