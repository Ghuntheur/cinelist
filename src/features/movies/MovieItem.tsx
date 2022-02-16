import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IMovie } from './movies.models'

import { formatRelativeTime, slugify } from '../../shared/helpers'

import './movie-item.style.scss'
import MovieFavorite from './MovieFavorite'

export default function MovieItem(props: IMovie) {
  const slug = `/film/${slugify(props.title)}-${props.id}`

  return (
    <Link to={slug}>
      <div className="movie-item-container">
        <div className="media-container">
          {props.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w154${props.poster_path}`} />
          ) : (
            <div className="placeholder" />
          )}
        </div>
        <div className="infos-container">
          <h2 className="title">{props.title}</h2>
          <span className="release-date">
            Sortie: {formatRelativeTime(props.release_date)}
          </span>

          <p className="overview">{props.overview}</p>

          <div className="actions">
            {props.showFavorites && <MovieFavorite id={props.id} />}
          </div>
        </div>
      </div>
    </Link>
  )
}
