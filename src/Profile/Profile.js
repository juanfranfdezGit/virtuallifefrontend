import './Profile.css'

// Importamos los componentes
import Datas from "./Components/Datas";
import History from './Components/History';
import Wishlist from './Components/Wishlist';


function Profile(){
  return (
    <>
    {/* Renderizamos todos los componentes para formar nuestra vista */}
      <div className="profile flex">
        <Datas />
        <History />
      </div>
      <Wishlist/>
    </>
  );
};

export default Profile;