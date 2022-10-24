import thunk from "redux-thunk";
import AllReducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {}
const store = createStore(AllReducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store;