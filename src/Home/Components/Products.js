import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Importamos el contexto carrito
import { useCart } from '../../cartContext';

function Products() {

  // Funcion para añadir al carrito de nuestro contexto
  const { addToCart } = useCart();

  // Estado para recoger los productos
  const [products, setProducts] = useState([]);

  // Estados para filtrar los productos por genero
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    // Función para obtener los productos
    const fetchProducts = async () => {
      try {
        // Recogemos los datos del back
        const response = await axios.get('http://localhost:3001/api/productos');
        // Actualizamos los productos
        setProducts(response.data);
        // Inicialmente los productos filtrados son todos, al seleccionar 
        // cambiaremos la muestra
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    // Llamamos a la funcion al montar el componente
    fetchProducts();
    }, []);

    // Maneja que genero tenemos seleccionado
    const handleGenreChange = (event) => {
      // Seleccion del genero
      const genre = event.target.value;
      setSelectedGenre(genre);
  
      if (genre === '') {
        // Si no se selecciona nada mostramos todo
        setFilteredProducts(products);
      } else {
        // Al seleccionar mostramos solo los del genero elegido
        const filtered = products.filter(product => product.genero === genre);
        setFilteredProducts(filtered);
      }
    };

    // Funcion para añadir a la lista de deseos
    const handleWishlistClick = async (productId) => {
      // Obtenemos el token de sesion
      const token = localStorage.getItem('token');
  
      // En caso de no existir alertamos al usuario que debe iniciar sesion
      if (!token) {
        alert('Iniciar sesión para agregar productos a tu lista de deseos.');
        return;
      }
  
      try {
        // Comprobamos si el producto ya está en la lista
        const response = await axios.get(`http://localhost:3001/api/wishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
  
        if (response.data.exists) {
          // Si esta alertamos al usuario
          alert('Este producto ya está en tu lista de deseos.');
        } else {
          // Si no está en la wishlist, lo añadiremos
          await axios.post('http://localhost:3001/api/wishlist', { productId }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          // Alertamos que ha sido añadido una vez enviado ese producto
          alert('Producto añadido a la wishlist.');
        }
      } catch (error) {
        // En caso de fallar mostraremos el error
        console.error('Error al gestionar la wishlist:', error);
        alert('Hubo un error al añadir el producto a la wishlist.');
      }
    };

    return (
        <div className="productosContainer flex">
          <h2>Nuestros Productos</h2>

          <div className="flex searchActions"> 
              {/* Filtro de genero */}
              <select onChange={handleGenreChange} value={selectedGenre} className='btn genre'>
                <option value="">Todos los Géneros</option>
                <option value="RPG">RPG</option>
                <option value="Aventura">Aventura</option>
                <option value="Deportes">Deportes</option>
                <option value="Shooter">Shooter</option>
              </select>
          </div>

          <div className="productsList">
              {/* Renderizamos los productos filtrados, en un principio seran todos */}
              {filteredProducts.map((product) => (
                  <div className="product" key={product.ID_product}>
                      <div className="productImgContainer">
                          <img src={product.img} alt={product.nombre_product} className="productImg"></img>
                      </div>
                      <div className="productInfo">
                        <div className="heroPlatforms flex">
                          <p>{product.plataforma}</p>
                        </div>
                        <h3 className="productTitle">{product.nombre_product}</h3>
                        <p>{product.descripcion}</p>
                        <h3 className='productPrice'>{product.precio}€</h3>
                      </div>
                      <div className="productActions flex">
                        {/* Boton para añadir al carrito */}
                        <button className="btn" onClick={() => addToCart(product)}>Añadir al carrito</button>
                        {/* Boton para añadir a la lista de deseos */}
                        <div className="wishlist" onClick={() => handleWishlistClick(product.ID_product)}><img src='/Assets/heart.png' alt='wish' /></div>
                      </div>
                  </div>
                ))}
            </div>
        </div>
        
    )
}

export default Products;