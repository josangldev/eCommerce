// Punto de entrada principal de la aplicación React
// Se monta el componente App dentro del elemento con id 'root'
// StrictMode ayuda a detectar problemas potenciales en desarrollo
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
