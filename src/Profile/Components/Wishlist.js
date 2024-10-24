import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Llamamos al contexto carrito
import { useCart } from '../../cartContext';

function Wishlist() {

  // Estado para almacenar los productos de la wishlist
  const [wishlistProducts, setWishlistProducts] = useState([]);

  // Usar el contexto de carrito
  const { addToCart } = useCart(); 

  useEffect(() => {
    // Función para obtener los productos de la wishlist
    const fetchWishlist = async () => {
      try {
        // Obtenemos el token del usuario actual
        const token = localStorage.getItem('token'); 

        // Recogemos los datos de wishlist
        const response = await axios.get('http://localhost:3001/api/wishlist', {
          headers: {
            // Incluimos el token en los headers
            Authorization: `Bearer ${token}` 
          }
        });
        // Guardamos los productos de la wishlist en nuestro estado.
        setWishlistProducts(response.data); 
      } catch (error) {
        console.error('Error al obtener la lista de deseos:', error);
      }
    };

    // Llamamos a la función cuando nuestro componente se monte
    fetchWishlist();
  }, []);

  // Funcion para eliminar un producto de nuestra lista de deseos
  const handleRemoveFromWishlist = async (productId) => {
    // obtenemos el token del usuario
    const token = localStorage.getItem('token'); 
    try {
      // Eliminamos en funcion del ID del producto elegido.
      await axios.delete(`http://localhost:3001/api/wishlist/${productId}`, {
        headers: {
          // Incluimos el token en los headers
          Authorization: `Bearer ${token}` 
        }
      });
      // Filtramos el producto que hemos eliminado del estado
      setWishlistProducts(prevProducts => prevProducts.filter(product => product.ID_product !== productId));
    } catch (error) {
      console.error('Error al eliminar el producto de la wishlist:', error);
    }
  };

  // Funcion para agregar al carrito
  const handleAddToCart = (product) => {
    addToCart(product);
  };

    return (
        <div className="productosContainer flex">
          <h2>Mi Lista de Deseos</h2>

          <div className="productsList">
          {/* Comprobamos si el usuario tiene productos en la lista */}
          {wishlistProducts.length > 0 ? (
          // En caso de tener productos los cargaremos en la interfaz 
          wishlistProducts.map((product) => (
            <div className="product" key={product.ID_producto}>
              <div className="productImgContainer">
                <img src={product.img} alt={product.nombre_product} className="productImg" />
                <div className="heroPlatforms flex">
                  {product.platforms && product.platforms.map((platform, idx) => (
                    <p key={idx}>{platform}</p>
                  ))}
                </div>
              </div>
              <div className="productInfo">
                <h3 className="productTitle">{product.nombre_product}</h3>
                <p>{product.descripcion}</p>
              </div>
              <div className="productActions wishlistActions flex">
                {/* Boton para añadir al carrito usando nuestro contexto */}
                <button className="btn" onClick={() => handleAddToCart(product)}>Añadir al carrito</button>
                {/* Boton para eliminar el producto de la lista de deseios, recogera su ID */}
                <div className="wishlist" onClick={() => handleRemoveFromWishlist(product.ID_product)}>
                  <img src='/Assets/brokeheart.webp' alt='wish' />
                </div>
              </div>
            </div>
            ))
          ) : (
            // En caso de no tener productos mostraremos el siguiente mensaje
            <p>No tienes productos en tu lista de deseos.</p>
          )}
            </div>
        </div>
        
    )
}

export default Wishlist;