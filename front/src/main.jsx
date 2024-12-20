import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PopupProvider} from "./provider/PopUpProvider.jsx";
import {DataProvider} from "./provider/DataContext.jsx";


createRoot(document.getElementById('root')).render(
    <DataProvider>
    <PopupProvider>
  <StrictMode>
    <App />
  </StrictMode>
    </PopupProvider>
    </DataProvider>,
)
