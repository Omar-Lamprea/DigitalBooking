import './RegisterProduct.scss'
import { useRef, useState } from 'react';
import { validateForm } from './ValidateForm';import Loader from '../Loader/Loader';
5


const RegisterProduct = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    score: '',
    price: '',
    country: '',
    city: '',
    location: '',
    description: '',
    productImage: null,
  })
  const [errorsForm, setErrorsForm] = useState({})
  const [serverResponse, setServerResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));

    if(typeof(fieldValue) === 'object'){
      const labelImg = e.target.previousElementSibling
      labelImg.children[0].innerHTML="Imagen Cargada"
    }
    setErrorsForm({ ...errorsForm, [name]: "" })
  };

  const hanbleSubmit = async (e) =>{
    e.preventDefault()
    const isValid = validateForm(formData);
    
    if(isValid.ok){
      console.log('data: ');
      console.log(formData);
      setIsLoading(true)

      console.log('sending data...');

      const formToSend = new FormData();
      const jsonBody = {
        name: formData.productName,
        description: formData.description,
        score: formData.score,
        price: formData.price,
        locationUrl: formData.location,
        country: formData.country,
        city: formData.city,
        category: formData.category,
      }

      formToSend.append('file', formData.productImage)
      formToSend.append('stringProduct',JSON.stringify(jsonBody))

      try {
        const response = await fetch('http://18.218.175.122:8080/digital-booking/product', {
          method: 'POST',
          body: formToSend
        });
        // const response = await fetch('http://18.218.175.122:8080/digital-booking/product/all', {});
  
        if (!response.ok) {
          setServerResponse({
            text: 'Error al realizar la solicitud',
            className: 'errorResponse'
          })
          throw new Error('Error al realizar la solicitud');
        }
  
        //const data = await response.json();
        // console.log('Se han guardado los datos');
        // console.log(data);

        setFormData({
          productName: '',
          category: '',
          score: '',
          price: '',
          country: '',
          city: '',
          location: '',
          description: '',
          productImage: null,
        })
        setErrorsForm({})
        setIsLoading(false)
        formRef.current.reset();
        setServerResponse({
          text: 'Se ha registrado el producto con éxito!',
          className: ''
        })

      } catch (error) {
        console.log('error en el envio:');
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
      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="productName">Nombre del producto*</label>
          <input type="text" name="productName" id="productName" onChange={handleChange}/>
          {errorsForm && <span>{errorsForm.productName}</span>}
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

      <div className="form-register-row mt-3">
        <div className="form-row">
          <label htmlFor="productImage" className='labelProductImage'>
            <p>Subir imagen</p>
            <i className="fa-sharp fa-solid fa-upload"></i>
          </label>
          <input type="file" name="productImage" id="productImage" className='d-none' onChange={handleChange} accept='image/*'/>
          {errorsForm && <span className='text-center'>{errorsForm.productImage}</span>}
        </div>
      </div>
      <div className="responseForm mt-3 text-center">
        {!isLoading
          ? <button>Registrar</button>
          : <Loader />
        }
        {serverResponse && 
          <p className={serverResponse.className}>
            {serverResponse.text}
          </p>
        }
      </div>
    </form>
  )
}

export default RegisterProduct