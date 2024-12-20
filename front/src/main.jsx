import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PopupProvider} from "./provider/PopUpProvider.jsx";


createRoot(document.getElementById('root')).render(
    <PopupProvider>
  <StrictMode>
    <App />
  </StrictMode>
    </PopupProvider>,
)
