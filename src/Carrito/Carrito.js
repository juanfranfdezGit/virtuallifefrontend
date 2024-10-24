import './Carrito.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// Importamos el contexto carrito
import { useCart } from '../cartContext';

function Carrito() {
    // Llamamos a las funciones del carrito
    const { cart, removeFromCart, clearCart } = useCart();

    // hook de navegacion
    const navigate = useNavigate();

    // Funcion que calcula el precio total
    const calculateTotal = () => {
        // Recorremos el carrito y vamos sumando
        return cart.reduce((total, product) => total + product.precio * product.quantity, 0);
    };

    // Funcion que realiza la compra
    const buy = async () => {
        // Obtenemos el token de sesion
        const token = localStorage.getItem('token');

        // En caso de haber iniciado sesion procedemos con el pedido
        if (token) {
            // Extraemos el id de usuario desde el token JWT
            const userId = JSON.parse(atob(token.split('.')[1])).id;

            // Mapeamos los productos del carrito para mandarlos al back
            const orderItems = cart.map(item => ({
                id_product: item.ID_product,
                qty: item.quantity,
            }));

            try {
                // Enviar el carrito al servidor
                await axios.post('https://virtuallifebackend.vercel.app/api/pedido', {
                    id_usuario: userId,
                    items: orderItems
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // En caso de exito alertamos al usuario de que el pedido se ha realizado
                alert("Su pedido ha sido realizado");

                // Vaciamos el carrito y redirigir después de 1 segundos
                setTimeout(() => {
                    clearCart();
                    navigate('/');
                }, 1000);
                
            } catch (error) {
                // En caso de fallar alertamos al usuario
                console.error('Error al realizar el pedido', error);
                alert("Hubo un problema al realizar el pedido. Por favor, inténtelo de nuevo.");
            }
        } else {
            // Si no se ha iniciado sesion alertamos de que debe estar registrado y lo mandamos a resgistro
            alert("Debes estar registrado para realizar un pedido.");
            navigate('/registro');
        }
    };

    return (
        <div className='flex carritoContainer'>
            <h2>Tu Carrito</h2>

            <ul className='flex carrito'>
                {/* Renderizamos los productos del carrito */}
                {cart.map((item) => (
                    <li className='flex carritoItem' key={item.ID_product}>
                        <div className='flex'>
                            {item.nombre_product} - {item.precio}€ x {item.quantity}
                        </div>
                        {/* Boton para eliminar el producto */}
                        <button className='btn removeBtn' onClick={() => removeFromCart(item.ID_product)}>Eliminar</button>
                    </li>
                ))}
                {/* En caso de haber productos sumamos y mostramos el total */}
                {cart.length > 0 && (
                    <div>
                        <h3>Precio Total: ${calculateTotal().toFixed(2)}</h3>
                    </div>
                )}
            </ul>
            <div className='flex cartActions'>
                {/* Boton limpiar carrito */}
                <button className='btn vaciaCart' onClick={clearCart}>Vaciar Carrito</button>
                {/* Boton Realizar pedido */}
                <button className='btn buy' onClick={buy}>Realizar Pedido</button>
            </div>
        </div>
    );
}

export default Carrito;