import { fetchTMDB } from '../../shared/helpers'

export const fetchMoviesList = async (
  endpoint: string,
  data: Record<string, any> = { region: 'fr' },
  query: Record<string, any> = {}
) => {
  try {
    const fetchedData = await fetchTMDB(endpoint, data, query)
    return fetchedData
  } catch (err: any) {
    throw new Error(err)
  }
}
