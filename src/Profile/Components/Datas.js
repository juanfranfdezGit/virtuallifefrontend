import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Datas() {
  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState(null);  

  // Estado para manejar los errores
  const [error, setError] = useState('');  

   // Estado para abrir el formulario que modificara los datos
   const [isEditing, setIsEditing] = useState(false);

  // Estado para manejar los datos modificados
  const [editedUser, setEditedUser] = useState({
    email: '',
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
  });

  // hook para la navegacion
  const navigate = useNavigate();

  useEffect(() => {

    // Obtenemos los datos del usuario desde el back
    const fetchUserData = async () => {
      try {
        
        // Obtenemos el token desde localstorage
        const token = localStorage.getItem('token');

        // Si no existe el token mostramos error y redirigimos al login.
        if (!token) {
          setError('No se ha encontrado ningún token. Por favor, inicia sesión.');
          // Redirigimos al login
          navigate('/login');
          // Cortamos al funcion
          return;
        }

        // Obtiene los datos del usuario que ha iniciado sesion
        const response = await axios.get('https://virtuallifebackend.onrender.com/api/userActive', {
          headers: {
            // Añadimos el token a la cabecera
            Authorization: `Bearer ${token}` 
          }
        });

        // Guardamos los datos del usuario en el estado.
        setUser(response.data);
        // Aplicamos a editedUser los valores actuales del usuario
        setEditedUser(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setError('Hubo un problema al cargar los datos del usuario.');
      }
    };

    // Llamamos a la funcion al montar el componente
    fetchUserData();  
    }, [navigate]); 

    // Cambios en los campos de entrada del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Manejamos el envío de datos para actualizar el usuario
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // quitamos el comportamiento por defecto
    try {
      const token = localStorage.getItem('token');
      // Enviar los datos modificados
      await axios.put(
        'https://virtuallifebackend.onrender.com/api/updateUser', editedUser, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      // Actualizamos los datos del usuario con los nuevos datos
      setUser(editedUser);
      // Salimos del form de editar
      setIsEditing(false);
      alert('Datos actualizados con éxito');
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      alert('Hubo un error al actualizar los datos.');
    }
  };
  
    // Muestra por pantalla el error
    if (error) {
      return <div className="error">{error}</div>;
    }
  
    // Si los datos no se cargan muestran el mensaje por pantalla
    if (!user) {
      return <div>Cargando...</div>; 
    }
    
    // En caso de exito mostramos los datos del usuario en la intefaz
    return (
        <div className="dataContainer">
            <h2>Mis Datos</h2>

            {isEditing ? (
            // Si estamos editando mostramos el formulario
            <form className="flex form" onSubmit={handleFormSubmit}>
              <div className='campo flex'>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='campo flex'>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={editedUser.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='campo flex'>
                <label>Apellido:</label>
                <input
                  type="text"
                  name="apellido"
                  value={editedUser.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='campo flex'> 
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={editedUser.dni}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='campo flex'>
                <label>Dirección:</label>
                <input
                  type="text"
                  name="direccion"
                  value={editedUser.direccion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='flex actions'>
                <button type="submit" className="btn">
                  Modificar datos
                </button>
                <button type="button" className="btn" onClick={() => setIsEditing(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            // Si no estamos en modo de edición mostramos los datos en formato lista
            <ul className="flex dataList">
              <li>
                <p className="data">
                  <strong>Email</strong>: {user.email}
                </p>
              </li>
              <li>
                <p className="data">
                  <strong>Nombre</strong>: {user.nombre}
                </p>
              </li>
              <li>
                <p className="data">
                  <strong>Apellido</strong>: {user.apellido}
                </p>
              </li>
              <li>
                <p className="data">
                  <strong>DNI</strong>: {user.dni}
                </p>
              </li>
              <li>
                <p className="data">
                  <strong>Dirección</strong>: {user.direccion}
                </p>
              </li>
              <button className="btn" onClick={() => setIsEditing(true)}>
                Modificar mis datos
              </button>
            </ul>
          )}
        </div>
    )
}

export default Datas;