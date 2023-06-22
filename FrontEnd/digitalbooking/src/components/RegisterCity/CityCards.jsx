import PropTypes from 'prop-types';
import ModalDeleteCity from '../Modals/ModalDeleteCity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CityCards = (props) => {
  const [changeInput, setChangeInput] =useState(false)
  const [cityName, setCityName] = useState(props.data.name)
  const [cityUpdated, setCityUpdated] = useState(props.data.name)

  const handleChange = (e) => {
    setCityName(e.target.value)
  }

  const handleSubmit = () =>{
    if(cityName === cityUpdated){
      setChangeInput(false)
    }else{
      console.log('updating name to: ', cityName);
      setCityUpdated(cityName)
      setChangeInput(false)
    }
  }


  return (
    <section className='city'>
      <div className="city-data">
        <p>Pais: <br />
          <span>{props.data.country.name}</span>
        </p>
        <p>Ciudad: <br />
          {!changeInput
            ? <span>{cityUpdated}</span>
            : <input 
                type="text" 
                id='input-city'
                defaultValue={cityUpdated}
                onChange={handleChange}
                onKeyUp={(e)=> {
                  if(e.key === 'Enter') handleSubmit(cityName)
                }}
              />
          }
          
        </p>
      </div>
      <div className="city-actions">
        <div className="update">
          {!changeInput
            ? <FontAwesomeIcon icon={faPenToSquare} onClick={() => setChangeInput(true)}/>
            : <FontAwesomeIcon icon={faCheck} onClick={handleSubmit}/>
          }
        </div>

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