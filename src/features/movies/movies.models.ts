export interface IMovie {
  name: string
}

export interface MoviesState {
  list: IMovie[]
  status: 'idle' | 'loading' | 'failed'
}
