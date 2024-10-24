function Platforms() {
    return (
        // Rederizamos un listado de las plataformas disponibles en nuestra tienda
        <div className="flex">
            <ul className="flex platformList">
                <li className="flex platformLogos"><img src='/Assets/ps5.png' alt="ps5"></img></li>
                <li className="flex platformLogos"><img src='/Assets/ps4.png' alt="ps4"></img></li>
                <li className="flex platformLogos"><img src='/Assets/ps3.png' alt="ps3"></img></li>
                <li className="flex platformLogos"><img src='/Assets/xbox.jpg' alt="xbox"></img></li>
                <li className="flex platformLogos"><img src='/Assets/nintendo.png' alt="nintendo"></img></li>
                <li className="flex platformLogos"><img src='/Assets/pc.jpg' alt="pc"></img></li>
            </ul>
        </div>
    )
}

export default Platforms;