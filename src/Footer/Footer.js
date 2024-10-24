import './Footer.css'

function Footer() {
  return (
    // Renderizamos el footer
    <footer className='flex'>
        <div className='flex'>
            <span className='footerLogo'>Virtual Life</span>
        </div>
        <div>
            <p>Proyecto Full Stack CEI</p>
            <p>Juan Francisco Romero Fdez</p>
        </div>
    </footer>
  );
};

export default Footer;
