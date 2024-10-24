import { Link } from 'react-router-dom';
import './Navbar.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importamos el contexto del carrito
import { useCart } from '../cartContext'; // Asegúrate de importar tu contexto

function Navbar() {
  // Obtenemos el total de productos en carrito mediante el contexto
  const { getTotalItems } = useCart(); 

  // Creamos el estado usuario
  const [user, setUser] = useState(null);

  // hook para navegar
  const navigate = useNavigate();

  useEffect(() => {
    // Obtenemos el token del localstorage
    const token = localStorage.getItem('token');

    // Si existe recogemos los datos del usuario activo
    if (token) {
        axios.get('https://virtuallifebackend.onrender.com/api/userActive', {
            headers: {
              // Añadimos el token en la cabecera
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            // Si la peticion va bien guardamos los datos de usuario
            setUser(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario', error);
            // Si hay error reseteamos el usuario
            setUser(null);
        });
    }
  // aseguramos que esto solo se ejecute una vez al montar el componente con el array vacio
  }, []);

  // Funcion para cerrar sesion
  const handleLogout = () => {
    // Eliminamos el token del localstorage
    localStorage.removeItem('token');
    // Reseteamos el usuario
    setUser(null);
    // Navemos al home
    navigate('/');
    // Recargamos para limpiar los datos
    window.location.reload();
  };

  return (
    <nav className='flex navbar'>
      {/* Logo de la pagina, navega a la home */}
      <Link to="/"><h1 className='logotipo flex'>Virtual Life</h1></Link>

      <ul className='flex userActions'>
      {/* Si tenemos iniciada sesion mostramos el enlace a perfil y el boton para
      cerrar la sesion */}
      {user ? (
        <>
          <li>
            <Link to="/profile" className='btn'>Perfil</Link>
          </li>
          <li>
            <Link to="/carrito" className='btn flex'>
              Carrito
              {/* Mostramos el numero de productos en carrito */}
              <span className="cartCount flex">{getTotalItems()}</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className='btn'>Cerrar Sesión</button>
          </li>
        </>
      ) : (
        <>
         {/* Si no tenemos iniciada sesion mostramos el enlace a login y el de registro */}
          <li>
            <Link to="/registro" className='btn'>Registrarme</Link>
          </li>
          <li>
            <Link to="/login" className='btn'>Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/carrito" className='btn flex'>
              Carrito
              {/* Mostramos el numero de productos en carrito */}
              <span className="cartCount flex">{getTotalItems()}</span>
            </Link>
          </li>
        </>
      )}
      </ul>
    </nav>
  );
};

export default Navbar;
