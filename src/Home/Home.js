import './Home.css'

// Importamos los componentes
import Hero from './Components/Hero';
import Platforms from './Components/Platforms';
import Products from './Components/Products';

function Home() {
  return (
    <>
      {/* Renderizamos los componentes en nuestra vista */}
      <Hero />

      <Platforms />

      <Products />
    </>
  );
};

export default Home;