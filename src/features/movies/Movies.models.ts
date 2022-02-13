export interface IMovie {
  name: string
}

export interface MoviesState {
  movies: IMovie[]
  status: 'idle' | 'loading' | 'failed'
}
