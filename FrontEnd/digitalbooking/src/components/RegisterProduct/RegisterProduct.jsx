import './RegisterProduct.scss'
import { useRef, useState } from 'react';
import { validateForm } from './ValidateForm';5


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
  const [errors, setErrors] = useState({})


  
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
  };

  const hanbleSubmit = (e) =>{
    e.preventDefault()
    const isValid = validateForm(formData).isValid;
    
    if(isValid){
      console.log('data: ');
      console.log(formData);
      formRef.current.reset();
    }else{
      console.log(errors);
      console.log(validateForm(formData).newErrors);
    }

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
    });

    setErrors({});



  }

  return (
    <form className="form-register-product my-5" onSubmit={hanbleSubmit} ref={formRef}>
      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="productName">Nombre del producto*</label>
          <input type="text" name="productName" id="productName" onChange={handleChange}/>
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
        </div>
      </div>
      
      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="score">Calificación</label>
          <input type="number" name="score" id="score" onChange={handleChange}/>
        </div>
        <div className="form-row">
          <label htmlFor="price">Precio por noche</label>
          <input type="number" name="price" id="price" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="country">País</label>
          <input type="text" name="country" id="country" onChange={handleChange}/>
        </div>
        <div className="form-row">
          <label htmlFor="city">Ciudad</label>
          <input type="text" name="city" id="city" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="location">Url de la ubicación en google maps</label>
          <input type="url" name="location" id="location" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="description">Descripción</label>
          <textarea name="description" id="description" rows="3" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-register-row mt-3">
        <div className="form-row">
          <label htmlFor="productImage" className='labelProductImage'>
            <p>Subir imagen</p>
            <i className="fa-sharp fa-solid fa-upload"></i>
          </label>
          <input type="file" name="productImage" id="productImage" className='d-none' onChange={handleChange}/>
        </div>
      </div>
      <button>Registrar</button>
    </form>
  )
}

export default RegisterProduct