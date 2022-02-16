import { RootState } from '@app/store'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { MoviesState, IMovie } from './movies.models'
import { fetchMoviesList } from './movies.api'

const initialState: MoviesState = {
  list: [],
  nextPage: 1,
  totalPages: 1,
  status: 'idle'
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (
    { endpoint, page }: { endpoint: string; page: number },
    { getState }
  ) => {
    const state: RootState = getState() as RootState

    const data = await fetchMoviesList(
      endpoint,
      { page },
      { ...(state.user.sessionId && { session_id: state.user.sessionId }) }
    )
    return data
  }
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetList(state) {
      state.list = []
      state.nextPage = 1
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.status = 'loading'
    })

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { page, results, total_pages: totalPages } = action.payload

      state.totalPages = totalPages
      state.status = 'idle'
      state.nextPage = page + 1
      state.list.push(...results)
    })
  }
})

// actions
export const { resetList } = moviesSlice.actions

// getters
export const selectMovies = (state: RootState): IMovie[] => state.movies.list
export const selectNextPage = (state: RootState): number =>
  state.movies.nextPage
export const selectLoading = (state: RootState) => state.movies.status
export const selectTotalPages = (state: RootState) => state.movies.totalPages

export default moviesSlice.reducer
