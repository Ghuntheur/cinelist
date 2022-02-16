import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IMovie } from '@movies/movies.models'
import { fetchTMDB, formatRelativeTime } from '../../shared/helpers'

import Loader from '../../shared/components/Loader'
import Button from '../../shared/components/Button'

import './move-page.style.scss'
import MovieFavorite from '@movies/MovieFavorite'

export default function MoviePage() {
  const { slug } = useParams()
  const id = (slug || '').split('-').reverse()[0]

  const [movie, setMovie] = useState<IMovie>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      const data = await fetchTMDB(`movie/${id}`)
      if ('success' in data && !data.success) {
        setError(data)
      } else {
        setMovie(data)
      }

      setLoading(false)
    }

    fetchMovie()
  }, [])

  const handleFavorite = (ev: any) => {
    ev.preventDefault()
  }

  return (
    <div className="movie-page-container">
      <div className="back-container">
        <Link to="/">⇐ Retour</Link>
      </div>

      <div className="main">
        {loading && <Loader />}
        {error && !loading && (
          <div className="error-container">
            <h1>FILM PAS TROUVÉ</h1>
          </div>
        )}

        {movie && (
          <div className="movie-container">
            <div className="media-container">
              {movie.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                />
              )}
            </div>

            <div className="infos-container">
              <div className="header">
                <span className="release-date">
                  Sortie: {formatRelativeTime(movie.release_date)}
                </span>

                <MovieFavorite id={movie.id} />
              </div>

              <h1 className="title">{movie.title}</h1>

              <div className="genres-container">
                {movie.genres.map(({ name, id }) => (
                  <span key={id}>{name}</span>
                ))}
              </div>

              <p className="overview">{movie.overview}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
