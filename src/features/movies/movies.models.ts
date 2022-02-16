export interface IMovieGenre {
  id: number
  name: string
}

export interface IEndpointParams {
  endpoint: string
  query: Record<string, any>
}

export interface IMovie {
  id: number
  title: string
  release_date: string
  poster_path: string
  backdrop_path: string
  overview: string
  genres: IMovieGenre[]
  showFavorites: boolean
}

export interface MoviesState {
  list: IMovie[]
  nextPage: number
  totalPages: number
  status: 'idle' | 'loading' | 'failed'
}
