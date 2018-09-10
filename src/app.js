'use strict'

import React from 'react'
import { hot } from 'react-hot-loader'

import 'sass/app.scss'
import reactLogo from 'images/react-logo.svg'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <img src={reactLogo} style={{width: '40px', height: '40px'}} />
        My App
      </div>
    )
  }
}

export default hot(module)(App)
