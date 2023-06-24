import PropTypes from 'prop-types';
import './BookingUser.scss'

const BookingUser = ({user}) => {
  return (
    <article className='user-booking mx-3'>
      <aside className='user-booking_row'>
        <p>{user.name} {user.lastName}</p> <p>/</p>
        <p>{user.email}</p> <p>/</p>
        <p>{user.city}</p>
      </aside>
      {user.comments &&
        <aside>
          <p className='comments-title'>Comentarios:</p>
          <p className='comments-data'>{user.comments}</p>
        </aside>
      }
    </article>
  )
}

export default BookingUser


BookingUser.propTypes = {
  user: PropTypes.object.isRequired,
}