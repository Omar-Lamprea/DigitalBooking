import './DBookings.scss'
import 'react-multi-date-picker/styles/layouts/mobile.css';
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { useEffect, useState } from 'react';
import { useContextGlobal } from '../../../context/global.context';
import { Link } from 'react-router-dom';
import CalendarCommon from '../../CalendarCommon/CalendarCommon';
import PropTypes from 'prop-types';


const DBookings = ({bookingsDates, lodgingFilteredCode}) => {
  const {state, dispatch} = useContextGlobal()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 620);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 620);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isSmallScreen]);

  const handleToSetLodgingFiltered = () => {
    dispatch({type: 'lodgingFiltered', payload: lodgingFilteredCode ? lodgingFilteredCode : null});
  };

  return (
    <section className="bookings">
      <div className="calendar-container">
        <h3 className='bookings_title'>Fechas disponibles</h3>
        <div className="calendar_filtered">
          <div>
            <CalendarCommon calendarConfig = {{
                classes: "mobile-calendar rmdp-mobile",
                numberOfMonths: isSmallScreen ? 1 : 2,
                multiple: true,
                range: true,
                initialDates: state.bookingsDates,
                readOnly: false,
                reservedDate: bookingsDates
              }}
            />
          </div>

          <div className='bookings-action'>
            <p>¡Reserva tus fechas hospedaje para obtener los mejores precios!</p>
            <Link to={'./reservas'} onClick={handleToSetLodgingFiltered}>
              <button>¡Reserva ahora! </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DBookings

DBookings.propTypes = {
  bookingsDates: PropTypes.array.isRequired,
  lodgingFilteredCode: PropTypes.number.isRequired
};