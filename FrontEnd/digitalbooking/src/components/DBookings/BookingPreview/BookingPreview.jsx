import { useContextBookings } from "../../../context/bookings.context";
import CarouselImg from "../../Details/DCarousel/CarouselImg"
import BookingUser from "../BookingUser/BookingUser";
import Bookingproduct from "../Bookingproduct/Bookingproduct";
import './BookingPreview.scss'
import PropTypes from 'prop-types';


const BookingPreview = ({data}) => {
  const {stateBooking} = useContextBookings()
  return (
    <section className="booking-preview">
      <h3>Detalle de la Reserva</h3>

      <CarouselImg images={data.images}/>
      <Bookingproduct data={data}/>
      <BookingUser user={stateBooking.user}/>
      <button className="btn-submit-booking">Confirmar reserva</button>
    </section>
  )
}

export default BookingPreview

BookingPreview.propTypes = {
  data: PropTypes.object.isRequired,
}