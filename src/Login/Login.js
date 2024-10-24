import './Login.css'
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login(){
  // Declaramos los estados para los campos del formularuio
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mensaje de error
  const [error, setError] = useState('');

  // hook navegacion
  const navigate = useNavigate();

  // Funcion que envia el formulario
  const handleSubmit = async (e) => {
    // Prevenimos el comportamiento por defecto del formulario
    e.preventDefault();
    
    try {
      // Lanzamos los datos para intentar loguear
      const response = await axios.post('https://virtuallifebackend.vercel.app/api/login', { email, password });

      // Si tenemos exito recibimos el token de sesion
      const { token } = response.data;
      // Guardamos dicho token en localstorage
      localStorage.setItem('token', token);

      // Navegamos a la home
      navigate('/');
      // Recargamos para actualizar bien los datos
      window.location.reload();

    } catch (error) {
      // Si falla mostramos el mensaje de error
      console.error('Error en el login:', error.response.data.error);
      setError(error.response.data.error);
    }
  };
  
  return (
    <div class="registro flex">
      <h2>Iniciar Sesión</h2>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}

      {/* Formulario para iniciar sesion, cada campo tiene la funcion 
      para actualizar los datos */}
      <form onSubmit={handleSubmit} class="flex">
      <div class="flex campo">
          <div class="flex">
            <img src='/Assets/logo2.png' class="loginImg" alt='logo'></img>
          </div>
        </div>
        <div class="flex campo">
          <div class="flex input">
            <label>Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
        </div>
        <div class="flex campo">
          <div class="flex input">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div class="flex campo">
          <div class="flex">
            <input type="submit" class="btn" value="Iniciar Sesión" />
          </div>
        </div>
      </form>
    </div>
  );
};


export default Login;