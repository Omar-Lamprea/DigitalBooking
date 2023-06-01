import './RegisterProduct.scss'
import { useRef, useState } from 'react';
import { validateForm } from './ValidateForm';
import Loader from '../../components/Loader/Loader';
import { useContextGlobal } from '../../context/global.context';
import Default from '../../assets/images/default.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';



const RegisterProduct = () => {
  const initialTemplate = {
    codeProduct: '',
    productName: '',
    category: '',
    score: '',
    price: '',
    country: '',
    city: '',
    location: '',
    description: '',
    productImage: null,
    titles: {
      wifi: false,
      kitchen: false,
      airConditioning: false,
      pet: false,
      tv: false,
      parkingLot: false,
    }
  }

  const {state, dispatch} = useContextGlobal()
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialTemplate)
  const [errorsForm, setErrorsForm] = useState({})
  const [serverResponse, setServerResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    const fieldValue = type === 'file' ? files : value;
    let updatedFormData;
    if (type === 'checkbox') {
      updatedFormData = {
        ...formData,
        titles: {
          ...formData.titles,
          [name]: checked,
        },
      };
    } else {
      updatedFormData = {
        ...formData,
        [name]: fieldValue,
      };
    }
  
    setFormData(updatedFormData)
  
    if (typeof fieldValue === 'object') {
      console.log(files)
      const file = e.target.files[0]
      const reader = new FileReader()
      const img = e.target.previousElementSibling.previousElementSibling;
      reader.onload = (e) => {
        img.src = e.target.result
      }
  
      reader.readAsDataURL(file);
    }
  
    setErrorsForm({ ...errorsForm, [name]: "" });
  };

  const hanbleSubmit = async (e) =>{
    e.preventDefault()
    const isValid = validateForm(formData);
    if(isValid.ok){
      const formToSend = new FormData();
      const jsonBody = {
        codeProduct: parseInt(formData.codeProduct),
        name: formData.productName,
        description: formData.description,
        score: parseInt(formData.score),
        price: parseFloat(formData.price),
        locationUrl: formData.location,
        country: formData.country,
        city: formData.city,
        category: formData.category,
        //titles: formData.titles
      }

      Array.from(formData.productImage).forEach(file => 
        formToSend.append('images', file))
      
      formToSend.append('stringProduct',JSON.stringify(jsonBody))

      try {
        const response = await fetch(state.URL_API.urlBase + state.URL_API.product, {
          method: 'POST',
          body: formToSend
        })
        const data = await response.json()
        if (!response.ok) {
          console.log('Response: ', [response, data])
          let text = 'Petición fallida'
          if(response.status >= 400 && response.status <= 410)
            text = data.ErrorMessage || data.Message

          setServerResponse({
            text: text + ' Status: ' + response.status,
            className: 'errorResponse'
          })
          setIsLoading(false)

          // throw new Error('Error al realizar la solicitud');
        }else{
          console.log('todo bien');
          dispatch({ type: 'APIdata', payload: [data]})
          setFormData(initialTemplate)
          setErrorsForm({})
          setIsLoading(false)
          formRef.current.reset();
          setServerResponse({
            text: 'Se ha registrado el producto con éxito!',
            className: ''
          })
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
                <option value="hotel">Hotel</option>
                <option value="hotel">Departamento</option>
                <option value="hotel">Cabaña</option>
                <option value="hotel">Carpa</option>
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
                      defaultChecked={formData.titles.wifi}
                      onChange={handleChange}/>
                    <label htmlFor="wifi">Wifi</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="kitchen" 
                      id="kitchen" 
                      defaultChecked={formData.titles.kitchen}
                      onChange={handleChange}/>
                    <label htmlFor="kitchen">Cocina</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="airConditioning" 
                      id="airConditioning" 
                      defaultChecked={formData.titles.airConditioning}
                      onChange={handleChange}/>
                    <label htmlFor="airConditioning">Aire Acondicionado</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="pet" 
                      id="pet" 
                      defaultChecked={formData.titles.pet}
                      onChange={handleChange}/>
                    <label htmlFor="pet">Pet fliendly</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="tv" 
                      id="tv" 
                      defaultChecked={formData.titles.tv}
                      onChange={handleChange}/>
                    <label htmlFor="tv">Televisor</label>
                  </div>
                  <div className="item">
                    <input 
                      type="checkbox" 
                      name="parking-lot" 
                      id="parking-lot" 
                      defaultChecked={formData.titles.preventDefault}
                      onChange={handleChange}/>
                    <label htmlFor="parking-lot">Estacionamiento</label>
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
     
      <div className="responseForm mt-3">
        {!isLoading
          ? <button>Registrar</button>
          : <Loader />
        }
        {serverResponse && 
          <p className={serverResponse.className + " text-center"}>
            {serverResponse.text}
          </p>
        }
      </div>
    </form>
  )
}

export default RegisterProduct