import { configureStore } from '@reduxjs/toolkit'

import counterSlice from './counter'
import authSlice from './authentication/auth'
import dateSlice from './date'

const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    date: dateSlice,
  },
})

export default store
