import './UserBookings.scss'
import BookingCard from './BookingCard'
import { useEffect, useState } from 'react'
import { useContextGlobal } from '../../context/global.context'
const UserBookings = () => {
  const [bookings, setBookings] = useState(false)
  const [errorBooking, setErrorBooking] = useState(false)
  const {state} = useContextGlobal()

  useEffect(() =>{
    const getBookingsByUser = async () =>{
      try {
        const response = await fetch(
          state.URL_API.urlBase +
          state.URL_API.bookings + 
          state.URL_API.bookingsByUser +
          state.user.data.email, {
            headers: {
              Authorization: `Bearer ${state.user.token}`
            }
          }
        )
        if(response.ok){
          const data = await response.json()
          setBookings(data)
          setErrorBooking(false)

        }else{
          const data = await response.text()
          setErrorBooking(data)
          console.log('Error: ', data);
        }
      } catch (error) {
        console.log('booking server error: ', error);
      }
      
    }
    getBookingsByUser()
  },[state.user, state.URL_API])
  return (
    <section className="user-bookings">
      <h3 className='user-bookings_title mb-3'>Tus Reservas:</h3>

      <div className="user-bookings_container">
        {bookings &&
          bookings.map(booking => 
            <BookingCard 
              key={booking.id} 
              data={booking}
            />)
        }
        {errorBooking &&
          <p className='error-message'>{errorBooking}</p>
        }
      </div>
    </section>
  )
}

export default UserBookings