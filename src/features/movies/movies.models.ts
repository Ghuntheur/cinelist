export interface IMovie {
  title: string
}

export interface MoviesState {
  list: IMovie[]
  nextPage: number
  status: 'idle' | 'loading' | 'failed'
}
