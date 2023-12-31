import { useContextBookings } from "../../../context/bookings.context";
import './BookingUserForm.scss'

const BookingUserForm = () => {
  const {stateBooking, dispatchBooking} = useContextBookings()
  const template = {
    name: stateBooking.user.name,
    lastName: stateBooking.user.lastName,
    comments: stateBooking.user.comments,
    email: stateBooking.user.email,
    phoneNumber: stateBooking.user.phoneNumber
  }
  const handleChange = (e) =>{
    if(e.target.name === 'phoneNumber') template.phoneNumber = e.target.value
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
            <label htmlFor="phoneNumber">Numero de teléfono:</label>
            <input type="number" name="phoneNumber" id="phoneNumber" onChange={handleChange}/>
          </div>
        </fieldset>

        <label htmlFor="comments">Comentarios:</label>
        <textarea name="comments" id="comments" rows="2" placeholder="Commentarios" onChange={handleChange}></textarea>


      </form>
    </section>
  )
}

export default BookingUserForm