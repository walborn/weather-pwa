import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

import { IForecastday } from 'models/weather'
import windIcon from 'icons/wind.svg'
import styles from './index.module.scss'

interface Props {
  value: IForecastday
}

const signed = (value: number) => value > 0 ? `+${value}` : value

export const ForecastDay:React.FC<Props> = ({ value }) => (
  <div className={styles.root}>
    <div className={styles.date}>
      <div className={styles.day}>{format(new Date(value.date), 'eeee')}</div>
      <time>{format(new Date(value.date), 'dd MMM')}</time>
    </div>
    <div className={styles.forecast}>
      <Image
        className={styles.condition}
        src={`https:${value.day.condition.icon}`}
        alt={value.day.condition.text}
        width={64}
        height={64}
      />
      <div className={styles.temperature}>
        <div>{signed(value.day.maxtemp_c)}˚</div>
        <div>{signed(value.day.mintemp_c)}˚</div>
      </div>
    </div>
    <div className={styles.wind}>
      <Image className={styles.icon} src={windIcon} alt="wind speed"/>
      <div>{value.day.maxwind_kph} km/h</div>
    </div>
  </div>
)
