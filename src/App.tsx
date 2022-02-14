import MoviesList from './features/movies/MoviesList'

import './styles/index.scss'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.locale('fr')

function App() {
  return (
    <div id="app-container">
      <h1>Cinelist</h1>

      <MoviesList />
    </div>
  )
}

export default App
