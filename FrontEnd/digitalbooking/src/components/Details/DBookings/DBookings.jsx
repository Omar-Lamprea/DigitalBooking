import { Calendar, DateObject } from 'react-multi-date-picker'
import './DBookings.scss'
import 'react-multi-date-picker/styles/layouts/mobile.css';
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { useState } from 'react';

const DBookings = () => {
  
  const inService = [
    [new DateObject().setDay(12).format(), new DateObject().setDay(13).format()],
    [new DateObject().setDay(27).format(), new DateObject().setDay(27).format()],
  ];
  
  
  const initialValue = [...inService];
  const [values, setValues] = useState(initialValue);

  function isInService(strDate) {
    return inService.some(([start, end]) => strDate >= start && strDate <= end);
  }

  return (
    <section className="bookings">
      <h3 className='bookings__title'>Fechas disponibles</h3>
      <div className="calendar-container">
        {/* <Calendar
          className="mobile-calendar rmdp-mobile"
          name='date'
          // range
          numberOfMonths={1}
          renderDays={renderDays}
          // disabled
          // disabledDates={new Date('2023-06-23')}
        /> */}

      <Calendar
        className="mobile-calendar rmdp-mobile"
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
          if (isInService(strDate)) className = "in-service";
          if (className) return { className };
        }}
        disabled
      />

      </div>
    </section>
  )
}

export default DBookings