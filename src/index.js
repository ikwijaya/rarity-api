import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './template/router'
import { Provider } from 'react-redux'
import store from './template/redux'
import './css/style.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // eslint-disable-line no-undef
)

if (module.hot)       // eslint-disable-line no-undef
    module.hot.accept() // eslint-disable-line no-undef