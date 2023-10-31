import { Symbol } from '@/app/store/searchSlice';

export default function HeadingData({ params }: { params: Symbol | null }) {
  return(
    <>
      {
        params && (
          <div className="max-w-sm my-4">
            <div className="text-gray-600 relative">
              <h2 className="text-2xl">{ params.symbol }</h2>
              <p className="text-sm">{ params.name }</p>
              <div className="flex gap-x-2 items-center text-sm ">
                <strong>Opens at: { params.marketOpen }</strong>
                <strong>Closes at: { params.marketClose }</strong>
                <strong className="text-xs">({ params.timezone })</strong>
              </div>
            </div>
          </div>
        ) || (
          <p className="my-4 text-gray-600 text-sm">
            Search for a stock to see more information.
          </p>  
        )
      }
    </>
  )
}