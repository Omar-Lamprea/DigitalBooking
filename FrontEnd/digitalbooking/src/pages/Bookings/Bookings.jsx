import { useParams } from "react-router-dom"
import DHeader from "../../components/Details/DHeader/DHeader"
import { useEffect, useState } from "react"
import { useContextGlobal } from "../../context/global.context"
import DPolitic from "../../components/Details/DPolitic/DPolitic"
import './Bookings.scss'
// import { useContextBookings } from "../../context/bookings.context"
import BookingPreview from "../../components/DBookings/BookingPreview/BookingPreview"
import BookingUserForm from "../../components/DBookings/BookingUserForm/BookingUserForm"
import CalendarCommon from "../../components/CalendarCommon/CalendarCommon"

const Bookings = () => {

  const {id} = useParams()
  const [lodging, setLodging] = useState(null)
  const {state} = useContextGlobal()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 620);
  // const {stateBooking} = useContextBookings()

  useEffect(() =>{
    let lodgingFiltered;
    state.APIdata 
      ? lodgingFiltered = state.APIdata.find(lodgingId => lodgingId.productId === parseInt(id))
      : lodgingFiltered = null
    setLodging(lodgingFiltered)

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 620);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
    
  }, [state, id, isSmallScreen])

  return (
    <>
      {lodging && 
        <>
          <DHeader data={
            {
              category: lodging.category.name, 
              city: lodging.city,
              name: lodging.name,
              score: lodging.score
            }
          }/>
          <div className="container-bookings-main">
            <section className="container-bookings">
              <div className="container-bookings_edit-components">
                <BookingUserForm />

                <CalendarCommon calendarConfig = {{
                    classes: "mobile-calendar rmdp-mobile",
                    numberOfMonths: isSmallScreen ? 1 : 2,
                    multiple: true,
                    range: true,
                    initialDates: state.bookingsDates,
                    readOnly: false,
                    reservedDate: lodging.bookings
                  }}
                />
              </div>
              
              <div className="container-bookings_preview-booking">
                <BookingPreview data={
                  {
                    id: lodging.productId,
                    category: lodging.category.name, 
                    city: lodging.city,
                    name: lodging.name,
                    images: lodging.images,
                    productCode: lodging.codeProduct
                  }
                }/>
              </div>
            </section>
          </div>

          <DPolitic politic={lodging.politic || {}}/>
        </>
      }
    </>
  )
}

export default Bookings