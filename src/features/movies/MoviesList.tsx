import useInfiniteScroll from 'react-infinite-scroll-hook'

import { useDispatch, useSelector } from '@app/hooks'
import {
  fetchMovies,
  selectLoading,
  selectMovies,
  selectNextPage,
  selectTotalPages
} from './movies.slice'

import MovieItem from './MovieItem'

import './movies-list.style.scss'

export default function MoviesList() {
  const dispatch = useDispatch()
  const nextPage = useSelector(selectNextPage)

  const movies = useSelector(selectMovies)
  const isLoading = useSelector(selectLoading) === 'loading'

  const hasNextPage = nextPage <= useSelector(selectTotalPages)

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () => dispatch(fetchMovies(nextPage)),
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <div className="movies-list-container">
      <div className="list">
        {movies.map(movie => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>

      {(isLoading || hasNextPage) && (
        <div className="loader-container">
          <div className="loader" ref={sentryRef} />
        </div>
      )}
    </div>
  )
}
