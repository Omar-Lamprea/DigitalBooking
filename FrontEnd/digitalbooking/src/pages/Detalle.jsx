//import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const Detalle = () => {
  const {id} = useParams()
  const url = `http://18.218.175.122:8080/digital-booking/product/${id}`
  const [product, setProduct] = useState({})
  
  useEffect(() =>{
    fetch(url)
    .then(res => res.json())
    .then(data => setProduct(data))
    console.log(product);
  }, [url])

  return (
    <div className="detalle">
      {product &&
        <>
          <div className="product-header d-flex flex-column justify-content-center align-items-center">
            <h1>{product.name}</h1>
            <div className="container_stars">
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px"  }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#fbc02d", marginRight: "5px", fontSize: "20px"  }} />
            </div>
            <p className="product-score">{product.score}</p>
          </div>
          <section className="info-container"> 
            <div className="container_photos">
              <img src={product.imageUrl} alt="imagen-hotel" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8943264028294!2d-74.07557231544078!3d4.612928730470008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f992718c80c91%3A0x3c8457db43981aa5!2sHotel%20Tequendama!5e0!3m2!1ses!2sco!4v1684420537789!5m2!1ses!2sco"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className="right_container">
            <p>{product.description}</p>
            <div className="container_icons d-flex flex-column">
              <span className="d-flex flex-column align-items-center">
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <span>{product.city} - {product.country}</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCreditCard}/>
                    <span>$ {product.price} por noche</span>
                  </li>
                </ul>
                
              </span>
              <button> Reserva ahora! </button>
            </div>

            </div>
          </section>
        </>
      }
    </div>
  )
}

export default Detalle