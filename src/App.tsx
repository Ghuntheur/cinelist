import { useState, ChangeEvent } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useDispatch, useSelector } from '@app/hooks'

import MoviesList from './features/movies/MoviesList'
import MoviePage from './features/moviePage/MoviePage'
import Authenticate from './features/user/Authenticate'
import Button from './shared/components/Button'

import { createToken, selectConnected } from './features/user/user.slice'

import 'dayjs/locale/fr'
import './styles/index.scss'

dayjs.extend(relativeTime)
dayjs.locale('fr')

function App() {
  const dispatch = useDispatch()

  const connected = useSelector(selectConnected)

  const [currentFilter, setCurrentFilter] = useState('movie/now_playing')

  const handleConnectClick = () => {
    dispatch(createToken())
  }

  const handleFilterChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilter(ev.target.value)
  }

  return (
    <div id="app-container">
      <h1>Cinelist</h1>

      {!connected && <Button onClick={handleConnectClick}>Conexion</Button>}

      <div className="filters-container">
        <select
          name="filters"
          id="filters"
          value={currentFilter}
          onChange={handleFilterChange}
        >
          <option value="movie/now_playing">En salles</option>
          <option value="movie/popular">Populaires</option>
        </select>
      </div>

      <Routes>
        <Route path="/" element={<MoviesList endpoint={currentFilter} />} />
        <Route path="/film/:slug" element={<MoviePage />} />
        {!connected && (
          <Route path="/authenticate/:token" element={<Authenticate />} />
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  )
}

export default App
