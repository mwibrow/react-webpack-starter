import 'babel-polyfill'
import { BrowserRouter as Router } from 'react-router-dom'
import * as React from 'react'
import * as ReactDom from 'react-dom'

import App from './components/App'

ReactDom.render(
  <Router basename='app/'>
    <App />
  </Router>,

  document.getElementById('app')
)
