import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ICity, IForecastResponse } from 'models/weather'

const key = '3d897832ecf3437ba2b112301220409' 

export const weatherApi = createApi({
  reducerPath: 'weather/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.weatherapi.com/v1/' }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchCities: build.query<ICity[], string>({ 
      query: (location: string) => ({
        url: 'search.json',
        params: {
          key,
          q: location,
        }
      }),
    }),
    fetchForecast: build.query<IForecastResponse, string>({
      query: (location: string) => ({
        url: 'forecast.json',
        params: {
          key,
          q: location,
          aqi: 'no',
          days: 4,
        }
      })
    }),
  }),
})

export const { useSearchCitiesQuery, useLazyFetchForecastQuery } = weatherApi
