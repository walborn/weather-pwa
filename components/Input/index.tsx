import React from 'react'
import clsx from 'clsx'

import styles from './index.module.scss'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string
  icon?: React.ReactNode
  onChange?: (value: string) => void
}
export const Input: React.FC<Props> = ({ className, onChange, icon, ...props }) => {
  const [ value, setValue ] = React.useState('')
  
  React.useEffect(() => {
    onChange?.(value)
  }, [ onChange, value ])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleClear = () => {
    setValue('')
  }
  return (
    <div className={clsx(className, styles.root)}>
      <input onChange={handleChange} {...props} />
      {icon && !value && <div className={styles.icon}>{icon}</div>}
      {value && <div className={styles.clear} onClick={handleClear}>&times;</div>}
    </div>
  )
}
