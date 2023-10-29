import Link from 'next/link';
import Avatar from './components/avatar';
import Card from './components/card';
import { LuSmile } from 'react-icons/lu'

export default function Home() {
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

            <Link
              href="/dashboard"
              className="bg-cyan-600 p-3 px-6 rounded-lg text-white font-semibold cursor-pointer"
            >
              Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
