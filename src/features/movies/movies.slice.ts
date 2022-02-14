import { RootState } from '@app/store'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { MoviesState, IMovie } from './movies.models'
import { fetchMoviesList } from './movies.api'

const initialState: MoviesState = {
  list: [],
  nextPage: 1,
  status: 'idle'
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (page: number) => {
    const data = await fetchMoviesList(page)
    return data
  }
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.status = 'loading'
    })

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { page, results } = action.payload
      state.status = 'idle'
      state.nextPage = page + 1
      state.list = results
    })
  }
})

// getters
export const selectMovies = (state: RootState): IMovie[] => state.movies.list
export const selectNextPage = (state: RootState): number =>
  state.movies.nextPage

export default moviesSlice.reducer
