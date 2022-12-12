import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './Reducer/mainReducer'

const Store = configureStore({
  reducer: rootReducer
})
export default Store
