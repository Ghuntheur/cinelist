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
