import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { IMovie } from '@movies/movies.models'
import { fetchTMDB } from '../../shared/helpers'

export default function MoviePage() {
  const { slug } = useParams()
  const id = (slug || '').split('-').reverse()[0]

  const [movie, setMovie] = useState<IMovie>()

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetchTMDB(`movie/${id}`)
      setMovie(data)
    }

    fetchMovie()
  }, [])

  return movie ? (
    <div>
      <Link to="/">Retour</Link>
      {movie.title}
    </div>
  ) : (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  )
}
