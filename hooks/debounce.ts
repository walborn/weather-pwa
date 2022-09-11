import React from 'react'

export const useDebounce = (value: string, delay = 300): string => {
  const [ debounced, setDebounced ] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [ value, delay ])

  return debounced
}
