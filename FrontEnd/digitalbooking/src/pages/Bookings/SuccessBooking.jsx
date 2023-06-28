
import './SuccessBooking.scss'
import {BsFillPatchCheckFill} from 'react-icons/bs'
const SuccessBooking = () => {


  return (
    <div className='SuccesBooking'>
      <div className="SuccesBooking-main">  
        <BsFillPatchCheckFill className='check-icon'/>
        <h3>¡Muchas gracias!</h3>
        <p>Su reserva se ha realizado con éxito</p>
        <button className="custom-button">Ok</button>
      </div>
    </div>
  )
}

export default SuccessBooking