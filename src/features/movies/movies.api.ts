import { fetchTMDB } from '../../commons/helpers'

export const fetchMoviesList = async () => {
  try {
    const data = await fetchTMDB('movie/popular')
    console.log(data)
  } catch (err) {}
}
