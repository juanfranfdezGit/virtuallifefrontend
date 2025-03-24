import React, { createContext, useState, useContext } from 'react';

// Creacion del contexto de carrito para usarlo por toda nuestra web
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Creamos el estado del carrito.
  // usaremos useState para ir cambiando el estado del carrito.
  const [cart, setCart] = useState([]);

  // Funcion para añadir al carrito.
  const addToCart = (product) => {

    // Actualizamos el carrito con el estado anterior.
    setCart((prevCart) => {

      // Verificamos si el producto se encuentra ya en nuestro carrito.
      const existingProduct = prevCart.find(item => item.ID_product === product.ID_product);

      // Si el producto se encuentra en el carrito aumentaremos la cantidad en 1.
      if (existingProduct) {
        return prevCart.map(item =>
          item.ID_product === product.ID_product
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      } else {
        // En caso de no estar en el carrito lo añadimos con cantidad 1.
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Eliminar los productos del carrito.
  const removeFromCart = (productId) => {
    // Filtrar el producto para elminar solo el seleccionado recogiendo su ID.
    setCart((prevCart) => prevCart.filter(item => item.ID_product !== productId));
  };

  // Obtenemos el numero total de productos en nuestro carrito.
  const getTotalItems = () => {
    return cart.length;
  };

  // Vaciamos totalmente el carrito.
  const clearCart = () => {
    setCart([]);
  };

  // Recogemos las funciones y el estado del carrito
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems }}>
      {children} {/* Renderizamos los componentes */}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCart = () => useContext(CartContext);