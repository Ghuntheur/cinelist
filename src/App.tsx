import { Routes, Route, Navigate } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useDispatch, useSelector } from '@app/hooks'

import MoviePage from './features/moviePage/MoviePage'
import Authenticate from './features/user/Authenticate'
import Button from './shared/components/Button'

import MoviesListContainer from '@movies/MoviesListContainer'

import { createToken, selectConnected } from './features/user/user.slice'

import 'dayjs/locale/fr'
import './styles/index.scss'

dayjs.extend(relativeTime)
dayjs.locale('fr')

function App() {
  const dispatch = useDispatch()

  const connected = useSelector(selectConnected)

  const handleConnectClick = () => {
    dispatch(createToken())
  }

  return (
    <div id="app-container">
      <h1>Cinelist</h1>

      {!connected && <Button onClick={handleConnectClick}>Connexion</Button>}

      <Routes>
        <Route path="/" element={<MoviesListContainer />} />
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
