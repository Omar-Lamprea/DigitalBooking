import PropTypes from 'prop-types';
import ModalDeleteCity from '../Modals/ModalDeleteCity';

const CityCards = ({data}) => {
  return (
    <section className='city'>
      <div className="city-data">
        <p>Pais: <br />
          <span>{data.country.name}</span>
        </p>
        <p>Ciudad: <br />
          <span>{data.name}</span>
        </p>
      </div>
      <div className="city-actions">
        <div className="delete">
          <ModalDeleteCity id={data.cityId} cityName={data.name}/>
        </div>
      </div>
    </section>
  )
}

export default CityCards


CityCards.propTypes = {
  data: PropTypes.object.isRequired,
};