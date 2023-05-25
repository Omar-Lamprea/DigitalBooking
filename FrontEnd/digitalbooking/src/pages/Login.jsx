import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader/Loader"


const Login = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const [inputPass, setInputPass] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const sendCredentials = (e) =>{
    e.preventDefault()
    if(validateForm()){
      console.log('data: ');
      console.log(formValues);
      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
      }, 2000);
      
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
    setErrors({ ...errors, [name]: "" })
  }

  const validateForm = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "El campo de correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }else if (/\s/.test(formValues.email)) {
      errors.email = "El correo electrónico no puede contener espacios en blanco";
    }
  
    if (!formValues.password) {
      errors.password = "El campo de contraseña es obligatorio";
    }else if(formValues.password.length < 6) {
      errors.password = "El campo de contraseña debe contar con al menos 6 caracteres";
    }else if (/\s/.test(formValues.password)) {
      errors.password = "La contraseña no puede contener espacios en blanco";
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <section className="login">
      <h4 className="login-title">Iniciar sesión</h4>
      <form className="login-form" onSubmit={sendCredentials}>
        <fieldset>
          <label htmlFor="email">Correo electrónico</label>
          <input 
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInputChange} 
            required/>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <div className="input-pass">
            <input 
              type={!inputPass ? "password" : "text"}
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleInputChange} 
              required/>
            <span onClick={() =>{setInputPass(!inputPass)}}>
              {!inputPass 
                ? <FontAwesomeIcon icon={faEyeSlash} />
                : <FontAwesomeIcon icon={faEye} />
              }
            </span>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </fieldset>
        <div className="form-actions">
          {!isLoading
           ? <button className="btn-login">Ingresar</button>
           : <Loader />
          }
        </div>
      </form>
      <p className="create-account">¿Aún no tenes cuenta? <Link to="/">Registrate!</Link></p>
    </section>
  )
}

export default Login