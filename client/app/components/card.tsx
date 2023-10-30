export default function Card({ children }: { children?: React.ReactNode}) {
  return (
    <div className="w-full h-auto p-8 bg-white bg-opacity-40 rounded-lg">
      { children }
    </div>
  )
}