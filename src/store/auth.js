import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  isAuthentication: false,
  name: '',
  type: '',
  profile: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthentication = true
      state.name = action.payload.name
      state.type = action.payload.type
      state.profile = action.payload.profile
    },
    logout(state) {
      state.isAuthentication = false
      state.name = ''
      state.type = ''
      state.profile = ''
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
