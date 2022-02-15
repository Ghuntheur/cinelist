import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import moviesReducer from '../features/movies/movies.slice'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/user/user.slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movies: moviesReducer,
    user: userReducer
  },
  devTools: true
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
