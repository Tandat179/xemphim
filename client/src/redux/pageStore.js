import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    keyword : "",
    ratings : 0,
    category : "",
    price : [0, 25000],
    currentPage : 1,
    queryFetch : "",
}

export const PageStore = createSlice({
  name: 'PageStore',
  initialState,
  reducers: {
   addQueryFetch : (state,actions) => {
    state.queryFetch = state.queryFetch + actions.payload
   },
   removeQueryFetch : (state) => {
    state = initialState
   },
   setfilter : (state,actions) => {
    state[actions.payload.key] = actions.payload.value
   }

  },
})

// Action creators are generated for each case reducer function
export const { addQueryFetch , removeQueryFetch,setfilter} = PageStore.actions

export const store = configureStore({
    reducer: {
      PageStore : PageStore.reducer,
    },
  })