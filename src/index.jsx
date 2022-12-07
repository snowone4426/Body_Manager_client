import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Router from './Router'
import GlobalStyle from './style/GlobalStyle'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Provider store={store}>
      <Router />
    </Provider>
  </BrowserRouter>,
)
