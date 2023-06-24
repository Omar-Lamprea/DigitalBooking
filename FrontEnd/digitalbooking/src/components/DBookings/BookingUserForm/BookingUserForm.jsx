import { useContextBookings } from "../../../context/bookings.context";
import './BookingUserForm.scss'

const BookingUserForm = () => {
  const {stateBooking, dispatchBooking} = useContextBookings()
  const template = {
    name: stateBooking.user.name,
    lastName: stateBooking.user.lastName,
    comments: stateBooking.user.comments,
    email: stateBooking.user.email,
    city: stateBooking.user.city
  }
  const handleChange = (e) =>{
    if(e.target.name === 'city') template.city = e.target.value
    if(e.target.name === 'comments') template.comments = e.target.value
    dispatchBooking({type: 'userData', payload: template})

  }
  return (
    <section className="booking-user-form">
      <h3>Tus datos:</h3>
      <form>
        <fieldset>
          <div className="inputUser">
            <label htmlFor="name">Nombre:*</label>
            <input type="text" name="name" id="name" defaultValue={stateBooking.user.name} disabled/>
          </div>
          <div className="inputUser">
            <label htmlFor="lastName">Apellido:*</label>
            <input type="text" name="lastName" id="lastName" defaultValue={stateBooking.user.lastName} disabled/>
          </div>
        </fieldset>

        <fieldset>
          <div className="inputUser">
            <label htmlFor="email">Email:*</label>
            <input type="text" name="email" id="email" defaultValue={stateBooking.user.email} disabled/>
          </div>
          <div className="inputUser">
            <label htmlFor="city">Ciudad:</label>
            <input type="text" name="city" id="city" onChange={handleChange}/>
          </div>
        </fieldset>

        <textarea name="comments" id="comments" rows="2" placeholder="Commentarios" onChange={handleChange}></textarea>

      </form>
    </section>
  )
}

export default BookingUserForm