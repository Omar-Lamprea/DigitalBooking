//import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faKitchenSet, faCar, faTv, faPersonSwimming, faFan, faWifi, faPaw}  from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContextGlobal } from "../../context/global.context";
import DHeader from "../../components/Details/DHeader/DHeader";
import DContainerImages from "../../components/Details/DCarousel/DContainerImages";

const Detalle = () => {
  const {id} = useParams()
  const [lodging, setLodging] = useState({})
  const {state} = useContextGlobal()

  useEffect(() =>{
    let lodgingFiltered;
    state.APIdata 
      ? lodgingFiltered = state.APIdata.filter(lodgingId => lodgingId.productId === parseInt(id))
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
          <DHeader data={
            {
              category: lodging.category, 
              city: lodging.city,
              name: lodging.name,
              score: lodging.score
            }
          }/>
          <DContainerImages images={lodging.imagesURLs}/>

          <section className="info-container"> 
            <div className="description_container">
            <div className="description-text">
            <h3>{lodging.name} - {lodging.city}</h3>
            <hr />           
            <p className="mt-3 mt-lg-0 text-start w-100" dangerouslySetInnerHTML={descriptionNomalized()}></p>
            </div>
            <div className="container_icons d-flex flex-column">
              <span>
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