import './RegisterProduct.scss'

const RegisterProduct = () => {

  const hanbleSubmit = (e) =>{
    e.preventDefault()
  }
  return (
    <form className="form-register-product my-5" onSubmit={hanbleSubmit}>
      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="productName">Nombre del producto*</label>
          <input type="text" name="productName" id="productName" />
        </div>
        <div className="form-row">
          <label htmlFor="category">Categoría*</label>
          <select name="category" id="category">
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
          <input type="number" name="score" id="score" />
        </div>
        <div className="form-row">
          <label htmlFor="price">Precio por noche</label>
          <input type="number" name="price" id="price" />
        </div>
      </div>

      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="country">País</label>
          <input type="text" name="country" id="country" />
        </div>
        <div className="form-row">
          <label htmlFor="city">Ciudad</label>
          <input type="text" name="city" id="city" />
        </div>
      </div>

      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="location">Url de la ubicación en google maps</label>
          <input type="url" name="location" id="location" />
        </div>
      </div>

      <div className="form-register-row">
        <div className="form-row">
          <label htmlFor="description">Descripción</label>
          <textarea name="description" id="description" rows="3"></textarea>
        </div>
      </div>

      <div className="form-register-row mt-3">
        <div className="form-row">
          <label htmlFor="productImage" className='labelProductImage'>
            <p>Subir imagen</p>
            <i className="fa-sharp fa-solid fa-upload"></i>
          </label>
          <input type="file" name="productImage" id="productImage" className='d-none'/>
        </div>
      </div>
      <button>Registrar</button>
    </form>
  )
}

export default RegisterProduct