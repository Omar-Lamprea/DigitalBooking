import './RegisterProduct.scss'
import { useEffect, useRef, useState } from 'react';
import { validateForm } from './ValidateForm';
import Loader from '../../components/Loader/Loader';
import { useContextGlobal } from '../../context/global.context';
import Default from '../../assets/images/default.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { initialTemplate } from './initialForm';


const RegisterProduct = () => {
  const [category, setCategory] = useState('')
  const {state, dispatch} = useContextGlobal()
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialTemplate)
  const [errorsForm, setErrorsForm] = useState({})
  const [serverResponse, setServerResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    const fieldValue = type === 'file' ? files : value;

    // let updatedFormData;
    if (type === 'checkbox') {
      const updatedAmenities = formData.amenities.map((amenity) => {
        if (amenity.name === name) {
          return {
            ...amenity,
            available: checked,
          };
        }
        return amenity;
      })
      const updatedFormData = { ...formData, amenities: updatedAmenities}
      setFormData(updatedFormData);

    } else {
      const updatedFormData = {...formData, [name]: fieldValue}
      setFormData(updatedFormData);
    }
  
    if (typeof fieldValue === 'object') {
      const file = e.target.files[0]
      const reader = new FileReader()
      const img = e.target.previousElementSibling.previousElementSibling;
      reader.onload = (e) => img.src = e.target.result
      reader.readAsDataURL(file);
    }
    setErrorsForm({ ...errorsForm, [name]: "" });
  }

  const hanbleSubmit = async (e) =>{
    e.preventDefault()
    const isValid = validateForm(formData)

    if(isValid.ok){
      setIsLoading(true)
      const formToSend = new FormData();
      const homeRulesArray = formData.homeRules.split(",").map((rule) => rule.trim())
      const healthPoliticArray = formData.healthPolitic.split(",").map((rule) => rule.trim())
      const jsonBody = {
        codeProduct: parseInt(formData.codeProduct),
        name: formData.productName,
        description: formData.description,
        score: parseInt(formData.score),
        price: parseFloat(formData.price),
        locationUrl: formData.location,
        country: formData.country,
        city: formData.city,
        category: parseInt(formData.category),
        amenities: formData.amenities,
        // politic: {
        //   homeRules: homeRulesArray,
        //   healthPolitic: healthPoliticArray,
        //   cancelationPolitic: formData.cancelationPolitic
        // }
      }
      console.log(jsonBody, formData.productImage);
      Array.from(formData.productImage).forEach(file => 
        formToSend.append('images', file))
      formToSend.append('stringProduct',JSON.stringify(jsonBody))
      try {
        const response = await fetch(state.URL_API.urlBase + state.URL_API.product, {
          method: 'POST',
          headers: {
            Authorization : `Bearer ${state.user.token}`
          },
          body: formToSend
        })
        const data = await response.json()
        if (!response.ok) {
          console.log('Response: ', [response, data])
          let text = 'Petición fallida'
          if(data.HttpStatusCode){
            text = data.ErrorMessage || data.Message
            if(response.status === 403){
              text = "Permisos insuficientes"
            }
          }

          setServerResponse({
            text: text + ' Status: ' + data.HttpStatusCode || response.status,
            className: 'errorResponse'
          })
          setIsLoading(false)
          // throw new Error('Error al realizar la solicitud');
        
        }else{
          console.log('producto registrado con éxito');
          dispatch({ type: 'APIdata', payload: [data]})
          setFormData(initialTemplate)
          setErrorsForm({})
          setIsLoading(false)
          formRef.current.reset();
          setServerResponse({
            text: 'Alojamiento registrado con éxito!',
            className: ''
          })
          setList()
        }
  
      } catch (error) {
        console.log('Error en el envio:');
        console.error(error);
        setIsLoading(false)
        setServerResponse({
          text: "Lo sentimos, tenemos problemas para establecer la conexión con nuestros servidores, por favor intenta mas tarde!",
          className: "errorResponse"
        })
      }
    }else{
      setErrorsForm(isValid.newErrors)
    }
  }

  const setList = async()=>{
    dispatch({type: "setProducts"})
    try {
      const res = await fetch(state.URL_API.urlBase + state.URL_API.productsAll,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: 'APIdata', payload: data })
      } else {
        console.log('Error: ', data)
        dispatch({ type: 'APIdata', payload: res })
      }
    } catch (error) {
      console.log('Context error:', error)
    }
  }

  useEffect(()=>{
    if(state.categories){
      setCategory(state.categories)
    }
  },[state.categories])

  return (
    <form className="form-register-product my-5" onSubmit={hanbleSubmit} ref={formRef}>
      
      <div className="form-column">

        <div className="form-row-container">
          
          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="productName">Nombre del producto*</label>
              <input type="text" name="productName" id="productName" onChange={handleChange}/>
              {errorsForm && <span>{errorsForm.productName}</span>}
            </div>
          </div>

          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="codeProduct">Código de producto</label>
              <input type="text" name="codeProduct" id="codeProduct" onChange={handleChange}/>
              {errorsForm && <span>{errorsForm.codeProduct}</span>}
            </div>
            
            <div className="form-row">
              <label htmlFor="category">Categoría*</label>
              <select name="category" id="category" onChange={handleChange}>
                <option value=""></option>
                {category &&
                  category.map((el) => <option key={el.categoryId} value={el.categoryId}>{el.name}</option>)
                }
              </select>
              {errorsForm && <span>{errorsForm.category}</span>}
            </div>
          </div>
          
          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="score">Calificación</label>
              <input type="number" name="score" id="score" onChange={handleChange}/>
              {errorsForm && <span>{errorsForm.score}</span>}
            </div>
            <div className="form-row">
              <label htmlFor="price">Precio por noche</label>
              <input type="number" name="price" id="price" onChange={handleChange}/>
              {errorsForm && <span>{errorsForm.price}</span>}
            </div>
          </div>

          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="country">País</label>
              <input type="text" name="country" id="country" onChange={handleChange}/>
              {errorsForm && <span>{errorsForm.country}</span>}
            </div>
            <div className="form-row">
              <label htmlFor="city">Ciudad</label>
              <input type="text" name="city" id="city" onChange={handleChange}/>
              {errorsForm && <span>{errorsForm.city}</span>}
            </div>
          </div>

          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="location">Url de la ubicación en google maps</label>
              <input type="text" name="location" id="location" onChange={handleChange}/>
              {errorsForm && <span>{errorsForm.location}</span>}
            </div>
          </div>

          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="description">Descripción</label>
              <textarea name="description" id="description" rows="3" onChange={handleChange}></textarea>
              {errorsForm && <span>{errorsForm.description}</span>}
            </div>
          </div>
        </div>

        <div className="form-row-container">
          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="titles">Características del alojamiento</label>
              <fieldset>
                <div className="checklist-items">
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="wifi" 
                      id="wifi" 
                      
                      onChange={handleChange}/>
                    <label htmlFor="wifi">Wifi</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="kitchen" 
                      id="kitchen" 
                      
                      onChange={handleChange}/>
                    <label htmlFor="kitchen">Cocina</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="airConditioning" 
                      id="airConditioning" 
                      
                      onChange={handleChange}/>
                    <label htmlFor="airConditioning">Aire Acondicionado</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="pet" 
                      id="pet" 
                      
                      onChange={handleChange}/>
                    <label htmlFor="pet">Pet fliendly</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="tv" 
                      id="tv" 
                      
                      onChange={handleChange}/>
                    <label htmlFor="tv">Televisor</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="parkingLot" 
                      id="parkingLot" 
                      
                      onChange={handleChange}/>
                    <label htmlFor="parkingLot">Estacionamiento</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="form-register-row">
            <div className="form-row">
              <label></label>
              <img src={Default} alt="demo" />
              <label htmlFor="productImage" className='labelProductImage'>
                <FontAwesomeIcon icon={faCloudArrowUp} />
              </label>
              <input 
                type="file" 
                name="productImage" 
                id="productImage" 
                className='d-none' 
                onChange={handleChange} 
                accept='image/*' 
                multiple/>
              {errorsForm && <span className='text-center'>{errorsForm.productImage}</span>}
            </div>
          </div>
        </div>
      </div>


      <div className="form-column mt-3">
        <div className="form-row-container">
          <h2 className='fs-5'>Ubicación del alojamiento</h2>
          <div className="form-register-row">
            <div className="form-row">
              Map
            </div>
          </div>

        </div>

        <div className="form-row-container">
          <h2 className='fs-5'>Políticas de uso:</h2>
          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="homeRules">Normas de la casa</label>
              <input 
                type="text" 
                name="homeRules" 
                id="homeRules" 
                placeholder="Ej: no fumar, no fiestas..."
                onChange={handleChange}
              />
              {errorsForm && <span>{errorsForm.homeRules}</span>}
            </div>
          </div>

          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="healthPolitic">Salud y seguridad</label>
              <input 
                type="text" 
                name="healthPolitic" 
                id="healthPolitic" 
                placeholder="Ej: Detector de humo, depósito de seguridad"
                onChange={handleChange}
              />
              {errorsForm && <span>{errorsForm.healthPolitic}</span>}
            </div>
          </div>

          <div className="form-register-row">
            <div className="form-row">
              <label htmlFor="cancelationPolitic">Política de Cancelación</label>
              <textarea 
                name="cancelationPolitic" 
                id="cancelationPolitic" 
                cols="3" 
                rows="10"
                onChange={handleChange}>
              </textarea>
              {errorsForm && <span>{errorsForm.cancelationPolitic}</span>}
            </div>
          </div>

        </div>

      </div>

     
      <div className="responseForm mt-3 text-center">
        {!isLoading
          ? <button>Registrar</button>
          : <Loader />
        }
        {serverResponse !== null && 
          <p className={serverResponse.className + " text-center"}>
            {serverResponse.text}
          </p>
        }
      </div>
    </form>
  )
}

export default RegisterProduct