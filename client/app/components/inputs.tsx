import styles from '../styles/input.module.scss'

type InputParams = {
  label: string;
  value?: string | '';
  placeholder?: string | '';
  type?: string | 'text';
}

export default function Input ({params}: {params: InputParams}) {
  return (
    <>
      <label>
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
          value={ params.value }
          className={ styles.input }
        />
      </label>
    </>
  )
}