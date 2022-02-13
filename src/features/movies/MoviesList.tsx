import { useEffect } from 'react'

import { useDispatch } from '@app/hooks'
import { fetchMovies } from './movies.slice'

export function MoviesList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
  })

  return (
    <div>
      <div>ok</div>
      <div>{process.env.TMDB_JWT}</div>
    </div>
  )
}
