import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import "../scss/stylesheet2.scss";

import Dropdowns from './components/Dropdowns.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dropdowns />
  </React.StrictMode>,
)
