import React from 'react'

import { useSearchCitiesQuery, useLazyFetchForecastQuery } from 'store/weather/api'
import { useDebounce } from 'hooks/debounce'

import { Row } from 'components/Row'
import { Input } from 'components/Input'
import { Forecast } from 'components/Forecast'
import { DropDown } from 'components/DropDown'

import styles from './index.module.scss'

const IndexPage = () => {
  const [ search, setSearch ] = React.useState('')
  const [ dropdown, setDropdown ] = React.useState(false)
  const debounced = useDebounce(search)
  
  const { isFetching, isError, data: cities } = useSearchCitiesQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [ fetchForecast, forecast ] = useLazyFetchForecastQuery()

  React.useEffect(() => {
    setDropdown(debounced.length > 3 && cities?.length! > 0)
  }, [ debounced, cities ])

  const handleClick = (location: string) => {
    fetchForecast(location)
    setDropdown(false)
  }

  return (
    <Row>
      {isError && <div className={styles.failure}>Houston, we have a problem...</div>}
      <Input
        type="text"
        placeholder="Search for a location"
        className={styles.search}
        value={search}
        onChange={setSearch}
        icon="🔍"
      />
      {dropdown && <DropDown values={cities} loading={isFetching} onClick={handleClick}/>}
      <Forecast value={forecast.data} loading={forecast.isLoading} />
    </Row>
  )
}

export default IndexPage
