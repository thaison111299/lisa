import { combineReducers, createStore } from "redux"
import defaultReducer from './ducks/reducer'

// Reducer -> defaultReducer ignore same name
const reducer = combineReducers({
  reducer: defaultReducer
})

const store = createStore(reducer)
export default store