import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const fetchTMDB = async (
  endpoint: string,
  data: Record<string, any> = {},
  options: RequestInit = {}
) => {
  const base = 'https://api.themoviedb.org/3'

  try {
    const url = new URL(`${base}/${endpoint}`)
    const searchParams = url.searchParams

    searchParams.append('api_key', process.env.REACT_APP_TMDB_API_KEY as string)
    searchParams.append('language', 'fr-FR')

    Object.keys(data).forEach((key: string) =>
      searchParams.append(key, data[key])
    )

    const res = await fetch(url.toString())
    const fetchedData = await res.json()

    return fetchedData
  } catch (err) {
    console.error(err)
  }
}

export const formatRelativeTime = (date: string): string => {
  dayjs.extend(relativeTime)
  console.log(date)

  return date
}
