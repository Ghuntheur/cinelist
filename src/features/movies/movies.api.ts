import { fetchTMDB } from '../../shared/helpers'

export const fetchMoviesList = async (endpoint: string, page: number) => {
  try {
    const data = await fetchTMDB(endpoint, { page, region: 'fr' })
    return data
  } catch (err: any) {
    throw new Error(err)
  }
}
