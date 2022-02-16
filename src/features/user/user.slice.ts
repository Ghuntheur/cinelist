import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@app/store'

import { fetchRequestToken, fetchSession } from './user.api'
import { UserState } from './user.models'

const initialState: UserState = {
  token: '',
  sessionId: '',
  accountId: null,
  connected: false
}

export const createToken = createAsyncThunk('user/createToken', async () => {
  const token = await fetchRequestToken()
  location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/authenticate/${token}`
})

export const createSession = createAsyncThunk(
  'user/createSession',
  async (token: string) => {
    const session = await fetchSession(token)
    return session
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(createToken.fulfilled, () => {})
    builder.addCase(createSession.fulfilled, (state, action) => {
      const { sessionId, accountId } = action.payload

      state.accountId = accountId
      state.sessionId = sessionId
      state.connected = true
    })
  }
})

// action
export const { authenticate } = userSlice.actions

// getters
export const selectConnected = (state: RootState) => state.user.connected
export const selectSessionId = (state: RootState) => state.user.sessionId
export const selectAccountId = (state: RootState) => state.user.accountId

export default userSlice.reducer
