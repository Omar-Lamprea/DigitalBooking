import { useParams } from "react-router-dom"
import DHeader from "../../components/Details/DHeader/DHeader"
import { useEffect, useState } from "react"
import { useContextGlobal } from "../../context/global.context"
import DPolitic from "../../components/Details/DPolitic/DPolitic"
import './Bookings.scss'


const Bookings = () => {

  const {id} = useParams()
  const [lodging, setLodging] = useState(null)
  const {state} = useContextGlobal()

  useEffect(() =>{
    let lodgingFiltered;
    state.APIdata 
      ? lodgingFiltered = state.APIdata.find(lodgingId => lodgingId.productId === parseInt(id))
      : lodgingFiltered = null
    setLodging(lodgingFiltered)
    
  }, [state, id])

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

          <section className="container-bookings">
            Bookings components
          </section>

          <DPolitic politic={lodging.politic || {}}/>
        </>
      }
    </>
  )
}

export default Bookings