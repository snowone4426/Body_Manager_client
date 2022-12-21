import { createSlice } from '@reduxjs/toolkit'

const initialChatState = { client: null }

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    connect(state, action) {
      state.client = action.payload.connection
    },
  },
})

export const chatActions = chatSlice.actions
export default chatSlice.reducer
