import photo from '../../assets/images/category-1.png'
import PropTypes from 'prop-types';


const BookingCard = ({data}) => {
  return (
    <article className='user-bookings_booking'>
      <img src={photo} alt="" />
      <aside className='booking-data'>
        <p className='booking-data_categoty'>{data.category}</p>
        <p className='booking-data_name'>{data.name}</p>
        <p className='booking-data_dates'>{data.dates}</p>
      </aside>
    </article>
  )
}

export default BookingCard

BookingCard.propTypes = {
  data: PropTypes.object.isRequired,
};