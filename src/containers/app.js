'use strict'

import React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        My App
      </div>
    )
  }
}

export default hot(module)(App)
