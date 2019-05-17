'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.querySelector('[data-js="app"]')
  )
}

render(App)
