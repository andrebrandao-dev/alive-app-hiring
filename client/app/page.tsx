'use client'

import Link from 'next/link';
import Avatar from '@/app/components/avatar';
import Card from '@/app/components/card';
import { LuSmile } from 'react-icons/lu'
import Button from '@/app/components/button';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  function handleLoginClick() {
    router.push('/dashboard');
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <Card>
          <div>
            <div className='flex justify-center'>
              <Avatar size={ 80 } />
            </div>

            <h1 className="text-gray-800 text-2xl mt-8">Welcome back <strong>Amy</strong></h1>

            <p className="mt-2 mb-8 text-gray-700 text-lg">
              We are happy to see you again
              <LuSmile className="inline-block text-cyan-600 ml-2" />
            </p>
            <Button params={{ theme: 'primary', type: 'button' }} onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
