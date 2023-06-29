import { useState } from "react";
import { useContextBookings } from "../../../context/bookings.context";
import { useContextGlobal } from "../../../context/global.context";
import { GLOBAL_API } from "../../../utils/constants";
import CarouselImg from "../../Details/DCarousel/CarouselImg"
import Loader from "../../Loader/Loader";
import BookingUser from "../BookingUser/BookingUser";
import Bookingproduct from "../Bookingproduct/Bookingproduct";
import './BookingPreview.scss'
import PropTypes from 'prop-types';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'


const BookingPreview = ({data}) => {
  const navigate = useNavigate();
  const {stateBooking, dispatchBooking} = useContextBookings()
  const {state, dispatch} = useContextGlobal()
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmitBooking = ()=>{
    const template = {
      checkInDate: stateBooking.checkIn,
      checkOutDate: stateBooking.checkOut,
      comments:  stateBooking.user.comments || '',
      phoneNumber: stateBooking.user.phoneNumber || '',
      user: {
        email: state.user.data.email,
      },
      product: {
        codeProduct: data.productCode
      }
    }
    
    if(validateBooking(template)){
      console.log('sending booking....');
      createBooking(template);
    }else{
      console.error('some required property is empty');
      Swal.fire({
        titleText: 'Selecciona las fechas para tu reserva',
        confirmButtonColor: '#FBC02D',
      })
    }

  }


  const createBooking = async (body) => {
    console.log('body', body);
    setIsLoading(true);
    try {
      const res = await fetch(
        GLOBAL_API.urlBase + 
        GLOBAL_API.bookings, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        
      });
      if (res.ok) {
        dispatch({type: "setProducts"})
        await getProducts()
        setIsLoading(false);
        dispatch({type: "setBookingDates", payload: []})
        dispatchBooking({type: "checkIn", payload: ""})
        dispatchBooking({type: "checkOut", payload: ""})
        navigate('./exito');
      }else{
        const data = await res.json()
        console.log(data);
        setIsLoading(false);
        Swal.fire({
          titleText: 'Ocurrió un error, verifica que los datos sean correctos e intenta de nuevo',
          confirmButtonColor: '#FBC02D',
        })
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error para creacion reserva: ', error);
      Swal.fire({
        titleText: 'Ocurrió un error, verifica que los datos sean correctos e intenta de nuevo',
        confirmButtonColor: '#FBC02D',
      })
    }

  };

  const getProducts = async () =>{
    try {
      const res = await fetch(GLOBAL_API.urlBase + GLOBAL_API.productsAll,{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: 'APIdata', payload: data })
      } else {
        console.log('Error: ', data)
        dispatch({ type: 'APIdata', payload: [] })
      }
    } catch (error) {
      console.log('Context error:', error)
    }
  }

  const validateBooking = (template) => {
    for (const key in template) {
      if (Object.prototype.hasOwnProperty.call(template, key)) {
        if (key !== 'phoneNumber' && key !== 'comments' && !template[key]) {
          return false;
        }
      }
    }
    return true;
  }
  

  return (
    <section className="booking-preview">
      <h3>Detalle de la Reserva</h3>

      <CarouselImg images={data.images}/>
      <Bookingproduct data={data}/>
      <BookingUser user={stateBooking.user} dates={{checkInDate: stateBooking.checkIn, checkOutDate: stateBooking.checkOut}}/>
      <div className="booking-preview__submit-button-container">
        { !isLoading ? <button className="btn-submit-booking" onClick={handleSubmitBooking}>Confirmar reserva</button> : <Loader /> }
      </div>
      
      
    </section>
  )
}

export default BookingPreview

BookingPreview.propTypes = {
  data: PropTypes.object.isRequired,
}