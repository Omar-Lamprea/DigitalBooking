import PropTypes from 'prop-types';
import ModalDeleteCity from '../Modals/ModalDeleteCity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useContextGlobal } from '../../context/global.context';

const CityCards = (props) => {
  const {state} = useContextGlobal()
  const [changeInput, setChangeInput] =useState(false)
  const [cityName, setCityName] = useState(props.data.name)
  const [cityUpdated, setCityUpdated] = useState(props.data.name)
  const[errorUpdate, setErrorUpdate] = useState(false)

  const handleChange = (e) => {
    setCityName(e.target.value)
  }

  const handleSubmit = async() =>{
    if(cityName === cityUpdated){
      setChangeInput(false)
    }else{
      try {
        const response = await fetch(
          state.URL_API.urlBase + 
          state.URL_API.city + 
          `/?idCity=${props.data.cityId}&nameToUpdate=${cityName}`,{
            method: "PUT",
            headers: {
              Authorization: `Bearer ${state.user.token}`
            }
        })
        if(response.ok){
          setCityUpdated(cityName)
          setChangeInput(false)
          setErrorUpdate(false)
        }else{
          setErrorUpdate(true)
        }
      } catch (error) {
        setErrorUpdate(true)
        console.log(error);
      }
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
          {errorUpdate &&
            <>
              <br />
              <span 
                style={{color:'var(--error-message-color)'}}>
                  Error al actualizar la ciudad
              </span>
            </>
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