export interface IMovieGenre {
  id: number
  name: string
}

export interface IMovie {
  id: number
  title: string
  release_date: string
  poster_path: string
  backdrop_path: string
  overview: string
  genres: IMovieGenre[]
}

export interface MoviesState {
  list: IMovie[]
  nextPage: number
  totalPages: number
  status: 'idle' | 'loading' | 'failed'
}
