import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import clsx from 'clsx'

import { ICurrent, IForecastday } from 'models/weather'
import windIcon from 'icons/wind.svg'
import humidityIcon from 'icons/humidity.svg'
import pressureIcon from 'icons/pressure.svg'

import styles from './index.module.scss'

interface Props {
  className?: string
  value: ICurrent
  forecast?: IForecastday
}

const signed = (value: number) => value > 0 ? `+${value}` : value

export const Current:React.FC<Props> = ({ className, value, forecast }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.date}>
      <div className={styles.day}>Today</div>
      <time>{format(new Date(), 'dd MMM')}</time>
    </div>
    <div className={styles.forecast}>
      <div className={styles.temperature}>{signed(value.temp_c)}˚</div>
      <Image
        className={styles.condition}
        src={`https:${value.condition.icon}`}
        alt={value.condition.text}
        width={64}
        height={64}
      />
      <div className={styles.feels}>
        <div>{value.condition.text}</div>
        <div>Feels like {signed(value.feelslike_c)}˚</div>
      </div>
    </div>
    <ul className={styles.measures}>
      <li>
        <Image className={styles.icon} src={windIcon} alt="wind speed"/>
        <div>{value.wind_kph} km/h</div>
      </li>
      <li>
        <Image className={styles.icon} src={humidityIcon} alt="humidity"/>
        <div>{value.humidity}%</div>
      </li>
      <li>
        <Image className={styles.icon} src={pressureIcon} alt="pressure"/>
        <div>{value.pressure_mb} mmHg</div>
      </li>
    </ul>
  </div>
)
