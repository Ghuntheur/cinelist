import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IMovie } from '@movies/movies.models'
import { fetchTMDB } from '../../shared/helpers'

import Loader from '../../shared/components/Loader'

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

  return (
    <div className="movie-page-container">
      <div className="back-container">
        <Link to="/">Retour</Link>
      </div>

      {loading && <Loader />}
      {error && !loading && <div>ERREUR</div>}

      {movie && (
        <div className="movie-container">
          <h1>{movie.title}</h1>
        </div>
      )}
    </div>
  )
}
