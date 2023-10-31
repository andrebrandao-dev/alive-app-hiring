import { MouseEvent } from 'react';
import styles from '../styles/button.module.scss';

type ButtonProps = {
  theme: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';
  type: 'button' | 'submit' | 'reset';
}

export default function Button (
  { params, children, onClick }: 
  { params: ButtonProps,
    children?: React.ReactNode,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  }) {
  return (
    <>
      <button
        type={ params.type }
        className={ styles[params.theme] }
        onClick={ onClick }
      >
        { children }
      </button>
    </>
  )
}