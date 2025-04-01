import {useEffect, useState} from 'react'

const IS_SERVER = typeof window === 'undefined'

export function useMediaQuery(query: string, {defaultValue = false} = {}) {
  const [matches, setMatches] = useState(defaultValue)

  useEffect(() => {
    if (IS_SERVER) {
      return
    }

    const matchMedia = window.matchMedia(query)

    const handleChange = () => {
      setMatches(matchMedia.matches)
    }

    handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
