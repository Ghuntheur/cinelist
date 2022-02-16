import { useState, ChangeEvent } from 'react'
import { useSelector } from '@app/hooks'

import { selectAccountId, selectConnected } from '../user/user.slice'

import MoviesList from './MoviesList'

import './movies-list-container.style.scss'

export default function MoviesListContainer() {
  const [endpoint, setEndpoint] = useState('movie/now_playing')
  const [showFavorites, setShowFavorites] = useState(true)

  const accountId = useSelector(selectAccountId)
  const connected = useSelector(selectConnected)

  const handleFilterChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const endpoint = ev.target.value

    if (endpoint.startsWith('account')) {
      setShowFavorites(false)
    }

    setEndpoint(endpoint)
  }

  return (
    <div className="movies-list-container">
      <div className="filters-container">
        <select
          name="filters"
          id="filters"
          value={endpoint}
          onChange={handleFilterChange}
        >
          <option value="movie/now_playing">En salles</option>
          <option value="movie/popular">Populaires</option>
          {accountId && connected && (
            <option value={`account/${accountId}/favorite/movies`}>
              Mes favoris
            </option>
          )}
        </select>
      </div>

      <MoviesList endpoint={endpoint} showFavorites={showFavorites} />
    </div>
  )
}
