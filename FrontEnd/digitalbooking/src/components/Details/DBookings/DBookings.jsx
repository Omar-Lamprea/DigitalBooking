import { Calendar, DateObject } from 'react-multi-date-picker'
import './DBookings.scss'
import 'react-multi-date-picker/styles/layouts/mobile.css';
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { useEffect, useState } from 'react';
import { useContextGlobal } from '../../../context/global.context';
import { Link } from 'react-router-dom';


const DBookings = () => {
  const {state} = useContextGlobal()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 620);


  const inService = [
    [new DateObject().setDay(12).format(), new DateObject().setDay(13).format()],
    [new DateObject().setDay(27).format(), new DateObject().setDay(27).format()],
    [new DateObject().setMonth(7).setDay(27).format(), new DateObject().setMonth(7).setDay(30).format()],
  ];
  const initialValue = [...inService];
  const [values, setValues] = useState(initialValue);

  function isInService(strDate) {
    return inService.some(([start, end]) => strDate >= start && strDate <= end);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 620);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isSmallScreen]);

  return (
    <section className="bookings">
      <div className="calendar-container">
        <h3 className='bookings_title'>Fechas disponibles</h3>
        <div className="calendar_filtered">
          <Calendar
            className="mobile-calendar rmdp-mobile"
            numberOfMonths={isSmallScreen ? 1 : 2}
            multiple
            range
            value={values}
            onChange={(ranges) => {
              const isClickedOutsideUnAvailbleDates = initialValue.every(
                ([start, end]) => ranges.some((range) => range[0]?.format?.() === start && range[1]?.format?.() === end)
              );
              if (!isClickedOutsideUnAvailbleDates) return false;
              setValues(ranges);
            }}
            mapDays={({ date }) => {
              let className;
              const strDate = date.format();
              const currentDate = new Date();

              if (isInService(strDate)) className = "in-service";
              if (className) return { className }
              if (date < currentDate) 
              return {
                disabled: true,
                style: { color: "#ccc" },
              }
            }}
            readOnly
          />

          {state?.user?.data && 
            <div className='bookings-action'>
              <p>¡Reserva tus fechas hospedaje para obtener los mejores precios!</p>
              <Link to={'./reservas'}>
                <button>¡Reserva ahora! </button>
              </Link>
            </div>
          }
        </div>

      </div>
    </section>
  )
}

export default DBookings