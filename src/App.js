import React from 'react';

// Importamos router-dom para navegar por la web.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importamos las vistas.
import Home from './Home/Home.js'
import Login from './Login/Login.js'
import Profile from './Profile/Profile.js'
import Registro from './Registro/Registro.js'
import Navbar from './Navbar/Navbar.js'
import Footer from './Footer/Footer.js';
import Carrito from './Carrito/Carrito.js';

function App() {
  return (
    <>
    {/* Envolvemos la app en el Router para activar la navegacion */}
    <Router>
      <div>
        {/* Llamamos al componente Navbar que estara presente en toda la web */}
        <Navbar />

        {/* Establecemos las rutas asignando una vista a cada una */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>

        {/* Llamamos al componente Footer presente en toda la web */}
        <Footer/>
      </div>
    </Router>
    </>
  );
}


export default App;

