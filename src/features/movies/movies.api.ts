import { fetchTMDB } from '../../commons/helpers'

export const fetchMoviesList = async (page: number) => {
  try {
    const data = await fetchTMDB('movie/popular', { page })
    return data
  } catch (err) {}
}
