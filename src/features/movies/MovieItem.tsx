import { Link } from 'react-router-dom'
import { IMovie } from './movies.models'

import { formatRelativeTime, slugify } from '../../shared/helpers'

import placeholder from '../../assets/placeholder.svg'

import './movie-item.style.scss'

export default function MovieItem(props: IMovie) {
  return (
    <Link to={`/film/${slugify(props.title)}-${props.id}`}>
      <div className="movie-item-container">
        <div className="media-container">
          {props.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w154${props.poster_path}`} />
          ) : (
            <div className="placeholder">
              <img src={placeholder} alt={props.title} />
            </div>
          )}
        </div>
        <div className="infos-container">
          <h2 className="title">{props.title}</h2>
          <span className="release-date">
            Sortie: {formatRelativeTime(props.release_date)}
          </span>

          <p className="overview">{props.overview}</p>

          <div className="actions"></div>
        </div>
      </div>
    </Link>
  )
}
