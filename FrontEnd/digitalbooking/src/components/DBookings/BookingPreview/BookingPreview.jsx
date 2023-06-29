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


const BookingPreview = ({data}) => {
  const navigate = useNavigate();
  const {stateBooking} = useContextBookings()
  const {state} = useContextGlobal()
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmitBooking = ()=>{
    console.log('sending booking....');

    const template = {
      // userId: state.user.data.email,
      checkInDate: state.bookingsDates[0],
      checkOutDate: state.bookingsDates[1],
      productId: data.id,
      comments: stateBooking.user.comments,
      userPhone: stateBooking.user.phoneNumber,
      userName: stateBooking.user.name + ' ' + stateBooking.user.lastName,
      email: stateBooking.user.email,
      estimatedTime: '10:00'
    }

    console.log(template);
    
    if(validateBooking(template)){
      console.log('todo bien');
      console.log('loadgingFiltered code', state.lodgingFilteredCode);
      createBooking();
    }else{
      console.error('some required property is empty');
    }

  }


  const createBooking = async () => {

    const body = {
      checkInDate: state.bookingsDates[0],
      checkOutDate: state.bookingsDates[1],
      comments:  stateBooking.user.comments || '',
      phoneNumber: stateBooking.user.phone || '',
      user: {
        email: state.user.data.email,
      },
      product: {
        codeProduct: data.productCode
      }
    };
    console.log('body', body);

    setIsLoading(true);
    try {
      const res = await fetch(GLOBAL_API.urlBase + GLOBAL_API.bookings, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

      });

      const data = await res.json();
      if (res.ok) {
        console.log('Crear reserva ', data);
        setIsLoading(false);
        navigate('./exito');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error para creacion reserva: ', error);
    }

  };

  const validateBooking = (template) => {
    for (const key in template) {
      if (Object.prototype.hasOwnProperty.call(template, key)) {
        if (key !== 'userPhone' && key !== 'comments' && !template[key]) {
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
      <BookingUser user={stateBooking.user} dates={{checkInDate: state.bookingsDates[0], checkOutDate: state.bookingsDates[1]}}/>
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