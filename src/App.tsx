import { Routes, Route, Navigate } from 'react-router-dom'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import MoviesList from './features/movies/MoviesList'
import MoviePage from './features/moviePage/MoviePage'

import 'dayjs/locale/fr'
import './styles/index.scss'

dayjs.extend(relativeTime)
dayjs.locale('fr')

function App() {
  return (
    <div id="app-container">
      <h1>Cinelist</h1>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/film/:slug" element={<MoviePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  )
}

export default App
