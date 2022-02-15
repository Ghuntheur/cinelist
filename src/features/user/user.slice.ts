import { createSlice } from '@reduxjs/toolkit'

import { UserState } from './user.models'

const initialState: UserState = {
  requestToken: null,
  sessionId: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice.reducer
