import React from 'react'
import clsx from 'clsx'

import { ICity } from 'models/weather'
import styles from './index.module.scss'

interface Props {
  className?: string
  loading: boolean
  values?: ICity[]
  onClick: (city: string) => void
}

export const DropDown:React.FC<Props> = ({ className, onClick, loading, values }) => {
  if (loading) return <div className={styles.root}><ul><li>Loading...</li></ul></div>
  
  if (!Array.isArray(values) || values.length === 0) return (
    <div className={styles.root}>...</div>
  )
  return (
    <div className={clsx(className, styles.root)}>
      <ul>
        {
          values?.map((city) => (
            <li
              key={city.id}
              onClick={() => onClick(city.name)}
            >
              {city.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
