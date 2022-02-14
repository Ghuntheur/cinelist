export interface IMovie {
  id: number
  title: string
  release_date: string
  poster_path: string
}

export interface MoviesState {
  list: IMovie[]
  nextPage: number
  totalPages: number
  status: 'idle' | 'loading' | 'failed'
}
