import { RootState } from '@app/store'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { MoviesState } from './movies.models'
import { fetchMoviesList } from './movies.api'

const initialState: MoviesState = {
  list: [],
  status: 'idle'
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const data = await fetchMoviesList()
  return data
})

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.status = 'loading'
    })

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      console.log(state, action)
    })
  }
})

// getters
export const getMovies = (state: RootState) => state.movies.list

export default moviesSlice.reducer
