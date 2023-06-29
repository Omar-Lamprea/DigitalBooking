import { useEffect, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import PropTypes from 'prop-types';
import moment from 'moment';
import { useContextGlobal } from "../../context/global.context";
import { useContextBookings } from "../../context/bookings.context";


const CalendarCommon = ({ calendarConfig }) => {
  const {dispatch} = useContextGlobal();
  const {dispatchBooking} = useContextBookings()
  const [initialSelectedDates, setInitialSelectedDates] = useState([]);
  const [inService, setInService] = useState([]);

  const setGlobalDates = (date) =>{
    if(date.length > 1){
      const startDate = new Date(date[0])
      const endtDate = new Date(date[1])
      
      const datesFormated = [moment(startDate).format("YYYY-MM-DD"), moment(endtDate).format("YYYY-MM-DD")]
      if(location.href.includes('/reservas')){
        dispatchBooking({type:'setCheckIn', payload: datesFormated[0]})
        dispatchBooking({type:'setCheckOut', payload: datesFormated[1]})
      }else{
        dispatch({type:'setBookingDates', payload: datesFormated})
      }
    }
  }



  useEffect(() =>{
    if(calendarConfig.initialDates.length > 0){
      const dates = calendarConfig.initialDates;
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1]);
      setInitialSelectedDates([
        new DateObject()
          .setYear(startDate.getFullYear())
          .setMonth(startDate.getMonth() + 1)
          .setDay(startDate.getDate() + 1)
          .format(), 
        new DateObject()
          .setYear(endDate.getFullYear())
          .setMonth(endDate.getMonth() + 1)
          .setDay(endDate.getDate() + 1)
      ])
    }

    if(calendarConfig.reservedDate?.length > 0){
      const arrayDates = []
      calendarConfig.reservedDate.forEach((date) =>{
        const checkIn = moment(date.checkInDate)
        const checkOut = moment(date.checkOutDate)
        arrayDates.push([
          new DateObject()
            .setYear(checkIn.format('YYYY'))
            .setMonth(checkIn.format('MM'))
            .setDay(checkIn.format('DD'))
            .format(), 
          new DateObject()
            .setYear(checkOut.format('YYYY'))
            .setMonth(checkOut.format('MM'))
            .setDay(checkOut.format('DD'))
            .format()
        ])
      })
      setInService(arrayDates);
    }

  }, [calendarConfig.initialDates, calendarConfig.reservedDate])

    return (
      <>
        <Calendar
          className={calendarConfig.classes}
          numberOfMonths={calendarConfig.numberOfMonths}
          range={calendarConfig.range}
          value={initialSelectedDates}
          onChange={dates => setGlobalDates(dates)}
          mapDays={({ date }) => {
            const currentDate = new Date();
            if (date < currentDate){
              return {
                disabled: true,
                style: { color: "#ccc"},
              }
            }

            for (const [start, end] of inService) {
              if (date >= new DateObject(start) && date <= new DateObject(end)) {
                return {
                  disabled: true,
                  style: { 
                    color: "#ccc",
                    textDecoration: "line-through"
                  }
                }
              }
            }
            
          }}
        />
      </>
    );
};


export default CalendarCommon;

CalendarCommon.propTypes = {
  calendarConfig: PropTypes.shape({
    classes: PropTypes.string,
    numberOfMonths: PropTypes.number,
    multiple: PropTypes.any,
    range: PropTypes.any,
    mapDays: PropTypes.any,
    onChangeEvent: PropTypes.any,
    initialDates: PropTypes.any,
    readOnly: PropTypes.any,
    reservedDate: PropTypes.any
  }).isRequired
};