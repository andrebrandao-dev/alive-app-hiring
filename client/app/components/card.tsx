export default function Card({ children }: { children?: React.ReactNode}) {
  return (
    <div className="w-full max-w-md h-auto p-8 bg-white bg-opacity-40 rounded-lg">
      { children }
    </div>
  )
}