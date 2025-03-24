import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Importamos contexto carrito
import { useCart } from '../../cartContext';

function Hero() {
  // Estado del producto que se esta mostrando en el slider
  const [currentProduct, setCurrentProduct] = useState(0);

  // Funcion para añadir al carrito de nuestro contexto
  const { addToCart } = useCart();

  // Estad para almacenar los productos obtenidos de la API
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función asincrona para obtener los productos
    const fetchProducts = async () => {
      try {
        // Obtenemos los productos de la API
        const response = await axios.get('http://localhost:3001/api/heroProductos');
        // Actualizamos el estado de los productos
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
   };

  // Llamamos a la funcion al montarse el componente
  fetchProducts();
  }, []);

  useEffect(() => {
    // Configuracion del tiempo en pantalla del producto mostrado
    const interval = setInterval(() => {
      setCurrentProduct((prevProduct) => (prevProduct + 1) % products.length);
    }, 8000);

    // Lo limpiamos al desmontar el componente
    return () => clearInterval(interval);
  // incluimos cuantos productos hay para recalcular cuando los productos cambiaran.
  }, [products.length]);

  // Funcion para gestionar el click en el boton wishlist
  const handleWishlistClick = async (productId) => {
    // Obtenemos el token del localstorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay sesion alertamos al usuario que debe iniciarla
      alert('Iniciar sesión para agregar productos a tu lista de deseos.');
      return;
    }

    try {
      // Comprobamos si el producto ya está en la wishlist
      const response = await axios.get(`http://localhost:3001/api/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.exists) {
        // En caso de existir mostramos el mensaje de que ya ha sido añadido antes
        alert('Este producto ya está en tu lista de deseos.');
      } else {
        // Si no está en la wishlist, lo añadimos
        await axios.post('http://localhost:3001/api/wishlist', { productId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        // Tras añadirlo mostramos un mensaje de añadido al usuario
        alert('Producto añadido a la wishlist.');
      }
    } catch (error) {
      // En caso contrario alertamos del error
      console.error('Error al gestionar la wishlist:', error);
      alert('Hubo un error al añadir el producto a la wishlist.');
    }
  };

  return (
    <div className="heroContainer">
      {/* Iteramos sobre los productos y mostramos el que corresponde */}
      {products.map((product, index) => (
        <div
          key={product.id}
          // Solo el producto con la clase active se mostrara
          className={`heroProduct ${currentProduct === index ? 'active' : ''}`}
          // Creamos la animacion de cambio modificando la opacidad
          style={{ opacity: currentProduct === index ? 1 : 0 }} 
        >
          {/* Renderizamos los productos cada uno con los datos que le correspondan */}
          <img src={product.img} alt={product.nombre_product} className="heroBack" />
          <div className="heroInfo">
            <h2 className="heroTitle">{product.nombre_product}</h2>
            <p className="heroPrice">{product.precio}€</p>
            <div className="heroCart flex">
              <button className="btn" onClick={() => addToCart(product)}>Añadir al carrito</button>
              <div className="heroWishlist" onClick={() => handleWishlistClick(product.ID_product)}><img src='/Assets/heart.png' alt='wish' /></div>
            </div>
            <div className="heroPlatforms flex">
                <p>{product.plataforma}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hero;