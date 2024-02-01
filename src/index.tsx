import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    { /*<BrowserRouter> not supported in github pages, using HashRouter instead */ }
    <HashRouter>
      <App />
    </HashRouter>
    { /*</BrowserRouter>*/ }
  </React.StrictMode>
)