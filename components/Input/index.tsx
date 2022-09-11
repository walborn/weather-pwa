import React from 'react'
import clsx from 'clsx'

import styles from './index.module.scss'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
  className?: string
  icon?: React.ReactNode
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}
export const Input: React.FC<Props> = ({ className, onChange, onSubmit, icon, ...props }) => {
  const [ value, setValue ] = React.useState('')
  
  React.useEffect(() => {
    onChange?.(value)
  }, [ onChange, value ])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit?.(value)
  }
  const handleClear = () => {
    setValue('')
  }
  return (
    <div className={clsx(className, styles.root)}>
      <input {...props} onChange={handleChange} onKeyDown={handleKeyDown} />
      {icon && !value && <div className={styles.icon}>{icon}</div>}
      {value && <div className={styles.clear} onClick={handleClear}>&times;</div>}
    </div>
  )
}
