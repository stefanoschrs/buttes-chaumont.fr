import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  // @ts-ignore
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js', {})
    .then((registration) => {
      console.log(registration)
    })
    .catch((error) => console.log('Registration failed with ' + error))
}
