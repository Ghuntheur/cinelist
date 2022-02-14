import { fetchTMDB } from '../../shared/helpers'

export const fetchMoviesList = async (page: number) => {
  try {
    const data = await fetchTMDB('movie/now_playing', { page, region: 'fr' })
    return data
  } catch (err: any) {
    throw new Error(err)
  }
}
