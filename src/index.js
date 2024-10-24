import React from 'react';
import ReactDOM from 'react-dom/client';

// Importamos los estilos generales
import './index.css';

// Importamos app.js
import App from './App';

// Importamos el contexto de carrito
import { CartProvider } from './cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // Carga todas las vistas a traves de app.js
  // Lo metemos dentro del contexto de carrito para poder usarlo de forma global
  <CartProvider>
    <App />
  </CartProvider>
);
