import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth'
import dateSlice from './date'
import chartSlice from './chart'
import chatSlice from './chat'

const store = configureStore({
  reducer: {
    auth: authSlice,
    date: dateSlice,
    chart: chartSlice,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store
