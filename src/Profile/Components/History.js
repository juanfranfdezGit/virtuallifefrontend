import axios from "axios";
import { useState, useEffect } from "react";

function History() {

    // Crea el estado de productos
    const [products, setProducts] = useState([]);

    useEffect(() => {
    // Función para obtener los productos
    const fetchProducts = async () => {
      try {
        // Obtenemos el token de usuario
        const token = localStorage.getItem('token'); 

        // Recogemos el historial de compra de la base de datos.
        const response = await axios.get('https://virtuallifebackend.onrender.com/api/history', {
            headers: {
              // Incluimos el token en los headers
                Authorization: `Bearer ${token}` 
            }
        });
        // Actualiza el estado de productos
        setProducts(response.data);
      } catch (error) {
          console.error('Error al obtener los productos:', error);
      }
    };

    // Llamamos a la funcion al montarse el componente
    fetchProducts();
    }, []);

    return (
        <div className="historyContainer">
            <ul className="flex historyList">
              {/* Tabla con el historial */}
              <table>
                  {/* Cabecera de la tabla */}
                  <tr>
                      <td>N de pedido</td>
                      <td>Producto</td>
                      <td>Precio</td>
                      <td>Cantidad</td>
                  </tr>
                  
                  {/* Creamos el cuerpo de la tabla con los productos recogidos
                  de la base de datos con nuestro historial de compra */}
                  {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id_history}>
                          <td>{product.id_history}</td>
                          <td>{product.nombre_product}</td>
                          <td>{product.precio}€</td>
                          <td>{product.qty}</td>
                        </tr>
                      ))
                  ) : (
                    // En caso de no existir dicho historial dibujamos rayas en su lugar
                    <tr>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  )}
              </table>
            </ul>
        </div>
    )
}

export default History;