import { MouseEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMovie } from './movies.models'

import Button from '../../shared/components/Button'

import { formatRelativeTime, slugify } from '../../shared/helpers'

import placeholder from '../../assets/placeholder.svg'

import './movie-item.style.scss'

export default function MovieItem(props: IMovie) {
  const addFavorite = (ev: MouseEvent) => {
    ev.preventDefault()

    let favorites = localStorage.getItem('favorites') || '[]'

    let array: number[] = JSON.parse(favorites)

    if (array.includes(props.id)) {
      array = array.filter(item => item !== props.id)
      setFavorite(false)
    } else {
      array.push(props.id)
      setFavorite(true)
    }

    localStorage.setItem('favorites', JSON.stringify(array))
  }

  const [isFavorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]').includes(props.id)
  )

  useEffect(() => {
    const favorites = localStorage.getItem('favorites')
    if (!favorites) {
      localStorage.setItem('favorites', '[]')
    }
  }, [])

  const slug = `/film/${slugify(props.title)}-${props.id}`

  return (
    <Link to={slug}>
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

          <div className="actions">
            <Button
              onClick={addFavorite}
              className={isFavorite ? 'favorite' : ''}
            >
              {isFavorite ? 'Enlever des favoris' : 'Ajouter aux favoris'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
