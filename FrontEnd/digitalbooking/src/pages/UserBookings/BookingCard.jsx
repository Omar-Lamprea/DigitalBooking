import PropTypes from 'prop-types';
import { useContextGlobal } from '../../context/global.context';
import { useCallback, useEffect, useState } from 'react';


const BookingCard = ({data}) => {
  const {state} = useContextGlobal()
  const [product, setProduct] = useState(false)

  const getProductById = useCallback( async ()=>{
    const res = await fetch(state.URL_API.urlBase + state.URL_API.product + "/" + data.idProduct,{
      headers: {
        Authorization: `Bearer ${state.user.token}`,
        'Content-Type': 'application/json'
      }
    })
    const dataProduct = await res.json()
    if(res.ok){
      setProduct(dataProduct)
    }
  },[data.idProduct, state.URL_API, state.user]) 

  useEffect(()=>{
    getProductById()
  },[getProductById])
  
  return (
    <article className='user-bookings_booking'>
      {product &&
        <>
          <img src={product.images[0].url} alt="" />
          <aside className='booking-data'>
            <p className='booking-data_categoty'>{product.category.name}</p>
            <p className='booking-data_name'>{product.name}</p>
            
            {data.comments &&
              <p className='booking-data_comments'>
                <strong>Comenterios:</strong>
                <br />
                {data.comments}
              </p>
            }
            {data.phoneNumber &&
              <p className='booking-data_tel'>
                <strong>tel:</strong> {data.phoneNumber}
              </p>
            }
            <p className='booking-data_dates'><strong>{data.checkInDate} / {data.checkOutDate}</strong></p>
          </aside>
        </>
      }
      
    </article>
  )
}

export default BookingCard

BookingCard.propTypes = {
  data: PropTypes.object.isRequired,
};