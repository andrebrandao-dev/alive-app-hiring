import styles from '@/app/styles/heading-page.module.scss'

export default function HeadingPage({ params, children }: { 
    params: { text: string },
    children?: React.ReactNode
}) {
  return (
    <h1 className={ styles.text }>
      { children }
      <span className="ml-2">{ params.text }</span>
    </h1>
  )
}