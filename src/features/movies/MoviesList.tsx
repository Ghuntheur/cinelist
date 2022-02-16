import useInfiniteScroll from 'react-infinite-scroll-hook'

import { useDispatch, useSelector } from '@app/hooks'
import {
  fetchMovies,
  resetList,
  selectLoading,
  selectMovies,
  selectNextPage,
  selectTotalPages
} from './movies.slice'

import MovieItem from './MovieItem'

import './movies-list.style.scss'
import Loader from '../../shared/components/Loader'
import { useEffect } from 'react'

interface MoviesListProps {
  endpoint: string
}

export default function MoviesList(props: MoviesListProps) {
  const dispatch = useDispatch()
  const nextPage = useSelector(selectNextPage)

  const movies = useSelector(selectMovies)
  const isLoading = useSelector(selectLoading) === 'loading'

  const hasNextPage = nextPage <= useSelector(selectTotalPages)

  useEffect(() => {
    dispatch(resetList())
    dispatch(fetchMovies({ endpoint: props.endpoint, page: 1 }))
  }, [props.endpoint])

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: () =>
      dispatch(fetchMovies({ endpoint: props.endpoint, page: nextPage })),
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <div className="movies-list-container">
      <div className="list">
        {movies.map(movie => (
          <MovieItem key={`${props.endpoint}-${movie.id}`} {...movie} />
        ))}
      </div>

      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loader />
        </div>
      )}
    </div>
  )
}
