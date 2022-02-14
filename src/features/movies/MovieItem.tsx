import { IMovie } from './movies.models'

import { formatRelativeTime } from '../../shared/helpers'

import './movie-item.style.scss'

export default function MovieItem(props: IMovie) {
  return (
    <div className="movie-item-container">
      <div className="media-container">
        <img src={`https://image.tmdb.org/t/p/w154${props.poster_path}`} />
      </div>
      <div className="infos-container">
        <h2 className="title">{props.title}</h2>
        <span className="release-date">
          {formatRelativeTime(props.release_date)}
        </span>
      </div>
    </div>
  )
}
