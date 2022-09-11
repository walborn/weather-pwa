import React from 'react'

import { ForecastDay } from 'components/ForecastDay'
import { Current } from 'components/Current'

import { IForecastResponse } from 'models/weather'

import styles from './index.module.scss'

interface Props {
  value?: IForecastResponse
  loading?: boolean
}

export const Forecast: React.FC<Props> = ({ value, loading }) => {
  if (loading) return <div>Loading forecast...</div>
  if (!value) return null
  const { location, current, forecast } = value
  const [ today, ...feature ] = forecast.forecastday
  return (
    <div>
      <div className={styles.location}>
        <div className={styles.name}>{location.name}</div>
        <div className={styles.country}>{location.country}</div>
      </div>
      <Current className={styles.current} value={current} forecast={today}/>
      <ul className={styles.gallery}>
        {feature.map(i => <li key={i.date}><ForecastDay value={i} /></li>)}
      </ul>
    </div>
  )
}
