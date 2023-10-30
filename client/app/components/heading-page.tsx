export default function HeadingPage({ params, children }: { 
    params: { text: string },
    children?: React.ReactNode
}) {
  return (
    <h1 className="text-cyan-700 text-4xl font-bold flex items-center mb-8">
      { children }
      <span className="ml-2">{ params.text }</span>
    </h1>
  )
}