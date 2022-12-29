import { configureStore } from '@reduxjs/toolkit'
import { PageStore } from './pageStore'

export const store = configureStore({
  reducer: {
    PageStore : PageStore.reducer,
  },
})