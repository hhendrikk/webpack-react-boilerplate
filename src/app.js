import React from 'react'

import { hot } from 'react-hot-loader/root'

import 'sass/app.scss'
import reactLogo from 'images/react-logo.svg'

const App = () => (
  <div className='container'>
    <img src={reactLogo} style={{ width: '40px', height: '40px' }} />
    My App
  </div>
)

export default hot(App)
