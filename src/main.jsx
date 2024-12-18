import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import'./AppCrud.css'
// import App from './App.jsx'
 import AppCrud from'./AppCrud.jsx'
//import Dropdown from './components/Dropdown.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/>  */}
    <br/>
       <AppCrud/>   
     {/* <Dropdown/>  */}
  </StrictMode>,
)
