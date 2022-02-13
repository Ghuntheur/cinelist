import { createSlice } from '@reduxjs/toolkit'
import { MoviesState } from './Movies.models'

const initialState: MoviesState = {
  movies: [],
  status: 'idle'
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {}
})

export default moviesSlice.reducer
