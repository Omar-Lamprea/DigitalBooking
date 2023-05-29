//import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import {faKitchenSet, faCar, faTv, faPersonSwimming, faFan, faWifi, faPaw}  from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalDeleteProduct from "../../components/Modals/ModalDeleteProduct";
import { useContextGlobal } from "../../context/global.context";


const Detalle = () => {
  const {id} = useParams()
  const [lodging, setLodging] = useState({})
  const {state} = useContextGlobal()

  useEffect(() =>{
    let lodgingFiltered;
    state.APIdata 
      ? lodgingFiltered = state.APIdata.filter(lodgingId => lodgingId.idProduct === parseInt(id))
      : lodgingFiltered = null
    setLodging(lodgingFiltered[0])
  }, [state, id])


  const descriptionNomalized = () =>{
    const text = lodging.description 
      ? lodging.description.replaceAll('\n', "<br />") 
      : ""
    return { __html: text };
  }


  return (
    <div className="detalle">
      {lodging ?
        <>
          <div className="product-header d-flex flex-column justify-content-center align-items-center">
            <h1>{lodging.name}</h1>
            <div className="container_stars">
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px"  }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px"  }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px"  }} />
            </div>
            <p className="product-score">{lodging.score}</p>
          </div>
          <section className="info-container"> 
            <div className="container_photos">
              <img src={lodging.imageUrl} alt="imagen-hotel" />
              imagenes
            </div>
            <div className="description_container">
            <h3>{lodging.name} - {lodging.city}</h3>
            <hr />
            <p className="mt-3 mt-lg-0 text-start w-100" dangerouslySetInnerHTML={descriptionNomalized()}></p>
            <div className="container_icons d-flex flex-column">
              <span className="d-flex flex-column  align-items-lg-start">
                <h3>¿Qué ofrece este lugar?</h3>
                <hr />
                <ul className="column-list">
                  <li>
                    <FontAwesomeIcon icon={faKitchenSet}/>
                    <span>Cocina</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCar}/>
                    <span>Estacionamiento gratuito</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faTv}/>
                    <span>Televisor</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPersonSwimming}/>
                    <span>Pileta</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faFan}/>
                    <span>Aire acondicionado</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faWifi}/>
                    <span>Wifi</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPaw}/>
                    <span>Apto mascotas</span>
                  </li>
                </ul>
              </span>
              <button> Reserva ahora! </button>
            </div>
            </div>
          </section>
        </>
        : <div className="errorProduct">
            <h5>No encontramos ningun producto con el id {id}</h5>
          </div>
      }
    </div>
  )
}

export default Detalle