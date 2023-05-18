//import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {faWifi} from "@fortawesome/free-solid-svg-icons"
import {faHouse} from "@fortawesome/free-solid-svg-icons"
import {faPersonSwimming} from "@fortawesome/free-solid-svg-icons"


const Detalle = () => {
  return (
    <div className="detalle">
        <h1>Hermitage Hotel</h1>
        <div className="container_stars">
        <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px" }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px"  }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px" }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px"  }} />
        </div>
        <section className="info-container"> 
          <div className="container_photos">
            <img src="../assets/images/Rectangle47.png" alt="imagen-hotel" />
            <img src="../assets/images/Rectangle48.png" alt="imagen-mapa" />
          </div>
          <div className="right_container">
          <p>Hermitage Hotel ofrece alojamiento con aire acondicionado y WiFi gratuita en Medellín, a 1,2 km del parque El Poblado.  <br />
            Los alojamientos cuentan con suelo de parquet, cocina totalmente equipada con nevera, zona de comedor, TV de pantalla plana vía satélite y baño privado con ducha y secador de pelo. Hay horno, fogones, tostadora y hervidor de agua.  <br />
            Cerca del apartamento hay varios lugares de interés, como el parque Lleras, el parque de la Bailarina y el parque Lineal President. El aeropuerto Olaya Herrera es el más cercano y está a 3 km del The Somos Flats. Se proporciona servicio de enlace con el aeropuerto por un suplemento.  <br />
            Nuestros clientes dicen que esta parte de Medellín es su favorita, según los comentarios independientes.
            A las parejas les encanta la ubicación — Le han puesto un 9,4 para viajes de dos personas.
          </p>
          <div className="container_icons">
            <span>
            <FontAwesomeIcon icon={faWifi} style={{color: "#fbc02d", marginRight: "10px", fontSize: "35px"}} />
            <FontAwesomeIcon icon={faHouse} style={{color: "#fbc02d", marginRight: "10px", fontSize: "35px"}} />
            <FontAwesomeIcon icon={faPersonSwimming} style={{color: "#fbc02d", marginRight: "10px", fontSize: "30px"}} />
            </span>
            <button> Reserva ahora! </button>
          </div>

          </div>
        </section>
    </div>
  )
}

export default Detalle