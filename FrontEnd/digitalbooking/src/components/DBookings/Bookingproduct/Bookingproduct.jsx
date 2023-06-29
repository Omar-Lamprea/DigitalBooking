import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const Bookingproduct = ({data}) => {
  return (
    <div className="product-data">
        <p className='category'>{data.category}</p>
        <h3>{data.name}</h3>
        <p>
          <FontAwesomeIcon icon={faLocationDot} className='me-1' style={{color:"var(--second-bg-color)"}}/>
          {data.city.name} - {data.city.country.name}
        </p>
    </div>
  )
}

export default Bookingproduct


Bookingproduct.propTypes = {
  data: PropTypes.object.isRequired,
}