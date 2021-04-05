import { combineReducers, createStore } from "redux"
import defaultReducer from './ducks/reducer'
import friendReducer from './ducks/friend'
import messageReducer from './ducks/message'
import inboxReducer from './ducks/inbox'

// Reducer -> defaultReducer ignore same name
const reducer = combineReducers({
  reducer: defaultReducer,
  friendReducer,
  messageReducer,
  inboxReducer
})

const store = createStore(reducer)
export default store