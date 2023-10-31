export default function Card({ params, children }: { params?:{ border: string }, children?: React.ReactNode}) {
  return (
    <div className="relative w-full h-auto bg-white bg-opacity-40 rounded-lg p-4 lg:p-8 overflow-hidden">
      {
        params?.border && (
          <div className={ `absolute inset-y-0 left-0 w-1  ${ params.border }` }></div>
        )
      }
      { children }
    </div>
  )
}