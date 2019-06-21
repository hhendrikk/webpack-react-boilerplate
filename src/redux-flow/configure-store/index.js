'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from 'reducers'

export default ({ initialState } = {}) => {
  const enhancer = compose(applyMiddleware(thunk), logger())
  const store = createStore(rootReducers, initialState, enhancer)
  return store
}

const logger = () => (window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development')
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (x) => x
