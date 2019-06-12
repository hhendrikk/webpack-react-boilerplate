'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from 'reducers'
import App from './app'

const store = createStore(reducers)

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.querySelector('[data-js="app"]')
  )
}

render(App)
