'use strict'

import React from 'react'
import { hot } from 'react-hot-loader'
import Title from './title'

class App extends React.Component {
  render () {
    return (
      <Title>Hello World !!!</Title>
    )
  }
}

export default hot(module)(App)
