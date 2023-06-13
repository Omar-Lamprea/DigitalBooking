//import React from 'react'

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContextGlobal } from "../../context/global.context";
import DHeader from "../../components/Details/DHeader/DHeader";
import DContainerImages from "../../components/Details/DCarousel/DContainerImages";
import DDescription from "../../components/Details/DDescription/DDescription";
import DBookings from "../../components/Details/DBookings/DBookings";
import DPolitic from "../../components/Details/DPolitic/DPolitic";

const Detalle = () => {
  const {id} = useParams()
  const [lodging, setLodging] = useState(null)
  const {state} = useContextGlobal()

  useEffect(() =>{
    let lodgingFiltered;
    state.APIdata 
      ? lodgingFiltered = state.APIdata.find(lodgingId => lodgingId.productId === parseInt(id))
      : lodgingFiltered = null
    setLodging(lodgingFiltered)
  }, [state, id])


  

  return (
    <div className="detalle">
      {lodging ?
        <>
          <DHeader data={
            {
              category: lodging.category.name, 
              city: lodging.city,
              name: lodging.name,
              score: lodging.score
            }
          }/>
          <DContainerImages images={lodging.images}/>

          <DDescription lodging={
            {
              name: lodging.name, 
              city: lodging.city,
              description: lodging.description,
              amenities: lodging.amenities
            }
          }/>

          <DBookings />

          <DPolitic politic={lodging.politic || {}}/>

        </>
        : <div className="errorProduct">
            <h5>No encontramos ningun producto con el id {id}</h5>
          </div>
      }
    </div>
  )
}

export default Detalle