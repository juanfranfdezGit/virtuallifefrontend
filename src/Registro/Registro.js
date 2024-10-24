import './Registro.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registro() {
  // hook para la navegacion
  const navigate = useNavigate();

  // Estados donde guardaremos los valores de cada input.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');

  // Accion a realizar cuando enviemos el formulario.
  const handleSubmit = async (e) => {
    // Evitamos el comportamiento por defecto del formulario.
    e.preventDefault();

    // Validamos si la contraseña coincide al repetirla.
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Enviamos los datos al back mediante Axios.
      const response = await axios.post('https://virtuallifebackend.vercel.app/api/registro', { email, password, nombre, apellido, direccion, dni });

      // Redirigimos a la home una vez completado el registro.
      navigate('/')
    } catch (error) {
      // En caso de fallar lo mostrará por pantalla
      console.error('Error en el registro:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (

    <div class="registro flex">

      <h2>Registrarme</h2>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}

      {/* Formulario, cada campo posee una funcion para actualizar el estado del campo */}
      <form onClick={handleSubmit} class="flex">
        <div class="flex campo">
          <div class="flex input">
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} 
              required
            />
          </div>
          <div class="flex input">
            <label>Apellidos</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)} 
              required
            />
          </div>
        </div>
        <div class="flex campo">
          <div class="flex input">
            <label>Email</label>
            <input  
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required />
          </div>
          <div class="flex input">
            <label>DNI</label>
            <input  
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)} 
              required />
          </div>
        </div>
        <div class="flex campo">
          <div class="flex input">
            <label>Contraseña</label>
            <input  
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required />
          </div>
          <div class="flex input">
            <label>Repita Contraseña</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required  />
          </div>
        </div>
        <div class="flex campo">
          <div class="flex input">
            <label>Direccion</label>
            <input  
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)} 
              required />
          </div>
        </div>
        <div class="flex campo">
          <div class="flex">
            <input type="submit" class="btn" value="Registrarse" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registro;