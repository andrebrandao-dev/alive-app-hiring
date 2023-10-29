import Image from 'next/image'
import avatar from '../images/avatar.png'
import styles from '../styles/avatar.module.scss'

export default function Avatar({ size = 40 }: { size?: number }) {
  const styleFifgureFromProp = {
    width: `${size}px`,
    height: `${ size }px`
  }

  return (
    <figure className={ styles.figure } style={ styleFifgureFromProp }>
      <Image
        src={ avatar }
        alt="Avatar User"
        width={size}
        height={size}
        className="rounded-full"
      />
      <figcaption className="sr-only">User Name</figcaption>
    </figure>
  )
}