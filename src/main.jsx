import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import'./styles/AppCrud.css'
import AppCrud from'./AppCrud.jsx'
// import Dropdown from './components/Dropdown.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <br/>
       <AppCrud/>   
     {/* <Dropdown/>  */}
  </StrictMode>,
)
