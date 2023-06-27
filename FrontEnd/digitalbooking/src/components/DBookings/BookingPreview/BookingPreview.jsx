import { useContextBookings } from "../../../context/bookings.context";
import { useContextGlobal } from "../../../context/global.context";
import CarouselImg from "../../Details/DCarousel/CarouselImg"
import BookingUser from "../BookingUser/BookingUser";
import Bookingproduct from "../Bookingproduct/Bookingproduct";
import './BookingPreview.scss'
import PropTypes from 'prop-types';


const BookingPreview = ({data}) => {
  const {stateBooking} = useContextBookings()
  const {state} = useContextGlobal()
  
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
    }else{
      console.error('some required property is empty');
    }

  }

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
      <BookingUser user={stateBooking.user}/>
      <button className="btn-submit-booking" onClick={handleSubmitBooking}>Confirmar reserva</button>
    </section>
  )
}

export default BookingPreview

BookingPreview.propTypes = {
  data: PropTypes.object.isRequired,
}