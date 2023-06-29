import PropTypes from 'prop-types';
import './BookingUser.scss'

const BookingUser = ({user, dates}) => {
  return (
    <article className='user-booking mx-3'>
      <aside className='user-booking_row'>
        <p>{user.name} {user.lastName}</p> <p>/</p>
        <p>{user.email}</p> <p>/</p>
        <p>{user.phoneNumber}</p>
      </aside>
      {user.comments &&
        <aside className='user-booking__comments'>
          <p className='comments-title'>Comentarios:</p>
          <p className='comments-data'>{user.comments}</p>
        </aside>
      }
      {dates && 
        <aside className='user-booking__dates'>
          <p className='user-booking__dates__date'><span className='user-booking__dates__label'>Check in </span><span>{dates.checkInDate}</span></p>
          <p className='user-booking__dates__date'><span className='user-booking__dates__label'>Check out </span><span>{dates.checkOutDate}</span></p>
        </aside>
      }
    </article>
  )
}

export default BookingUser


BookingUser.propTypes = {
  user: PropTypes.object.isRequired,
  dates: PropTypes.object
}