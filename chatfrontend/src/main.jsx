import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../dist/output.css"
document.getElementById('root').classList.add("text-primary","bg-secondary","font-mono",
                                              "dark:text-darkPrimary","dark:bg-darkSecondary")
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
