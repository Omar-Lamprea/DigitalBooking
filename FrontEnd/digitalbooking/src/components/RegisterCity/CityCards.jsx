import PropTypes from 'prop-types';
import ModalDeleteCity from '../Modals/ModalDeleteCity';

const CityCards = (props) => {
  return (
    <section className='city'>
      <div className="city-data">
        <p>Pais: <br />
          <span>{props.data.country.name}</span>
        </p>
        <p>Ciudad: <br />
          <span>{props.data.name}</span>
        </p>
      </div>
      <div className="city-actions">
        <div className="delete">
          <ModalDeleteCity deleteId={props.deleteId} id={props.data.cityId} cityName={props.data.name}/>
        </div>
      </div>
    </section>
  )
}

export default CityCards


CityCards.propTypes = {
  data: PropTypes.object.isRequired,
  deleteId: PropTypes.func.isRequired
};