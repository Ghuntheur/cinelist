import { MouseEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMovie } from './movies.models'

import Button from '../../shared/components/Button'

import { formatRelativeTime, slugify } from '../../shared/helpers'
import useFavorite from '@app/useFavorites'

import placeholder from '../../assets/placeholder.svg'

import './movie-item.style.scss'

export default function MovieItem(props: IMovie) {
  const [isFavorite, { addFavorite, removeFavorite }] = useFavorite(props.id)

  useEffect(() => {
    const favorites = localStorage.getItem('favorites')
    if (!favorites) {
      localStorage.setItem('favorites', '[]')
    }
  }, [])

  const handleFavorite = (ev: MouseEvent) => {
    ev.preventDefault()
    isFavorite ? removeFavorite() : addFavorite()
  }

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
              onClick={handleFavorite}
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
