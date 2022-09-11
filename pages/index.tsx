import React from 'react'
import Image from 'next/image'

import { useSearchCitiesQuery, useLazyFetchForecastQuery } from 'store/weather/api'
import { useDebounce } from 'hooks/debounce'

import { Row } from 'components/Row'
import { Input } from 'components/Input'
import { Forecast } from 'components/Forecast'
import { DropDown } from 'components/DropDown'
import searchSVG from 'icons/search.svg'

import styles from './index.module.scss'

const IndexPage = () => {
  const [ search, setSearch ] = React.useState('')
  const [ dropdown, setDropdown ] = React.useState(false)
  const [ dirty, setDirty ] = React.useState(false)
  const [ loading, setLoading ] = React.useState(false)
  const debounced = useDebounce(search)
  
  const { isFetching, isError, data: cities } = useSearchCitiesQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [ fetchForecast, forecast ] = useLazyFetchForecastQuery()

  React.useEffect(() => {
    setDropdown(debounced.length > 3 && cities?.length! > 0)
  }, [ debounced, cities ])

  const handleClick = async (location: string) => {
    setLoading(true)
    await fetchForecast(location)
    setDirty(false)
    setLoading(false)
  }

  return (
    <Row>
      <Input
        type="text"
        placeholder="Search for a location"
        className={styles.search}
        value={search}
        onChange={setSearch}
        onInput={() => setDirty(true)}
        onSubmit={handleClick}
        spellCheck={false}
        icon={<Image src={searchSVG} alt="Search" width={16} height={16} />}
      />
      {isError && <div className={styles.failure}>Houston, we have a problem...</div>}
      {!dirty && forecast.isError && <div className={styles.failure}>No matching location found</div>}
      {!isError && dirty && dropdown && <DropDown values={cities} loading={isFetching} onClick={handleClick}/>}
      {!isError && !forecast.isError && <Forecast value={forecast.data} loading={loading} />}
    </Row>
  )
}

export default IndexPage
