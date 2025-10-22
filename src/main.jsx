import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './css/bootstrap.css';
import App from './App.jsx'
import AddElm_popUp from "./components/AddElm_popUpBtn.jsx";
import MemberContainer from "./components/MemberContainer.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AddElm_popUp/> */}
    <MemberContainer />
  </StrictMode>
)
