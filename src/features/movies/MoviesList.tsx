import { useDispatch, useSelector } from '@app/hooks'
import { useEffect } from 'react'
import { fetchMovies, selectNextPage } from './movies.slice'

export function MoviesList() {
  const dispatch = useDispatch()
  const nextPage = useSelector(selectNextPage)

  useEffect(() => {
    dispatch(fetchMovies(nextPage))
  }, [])

  return (
    <div>
      <div>ok</div>
    </div>
  )
}
