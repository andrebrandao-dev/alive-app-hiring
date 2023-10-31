import styles from '../styles/input.module.scss'

type InputParams = {
  label: string;
  value?: string | '';
  placeholder?: string | '';
  type?: string | 'text';
}

import { ChangeEvent } from 'react';

export default function Input ({params, value, onChange}: {
  params: InputParams,
  value?: string | '',
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label className="block relative">
        {
          params.label && (
            <span className={ styles.labelText }>
              { params.label }
            </span>
          )
        }
        <input
          type={ params.type }
          placeholder={ params.placeholder }
          value={ value }
          className={ styles.input }
          onChange={ onChange }
        />
      </label>
    </>
  )
}