import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextGlobal } from "../../context/global.context";
import Loader from "../../components/Loader/Loader";

const CreateAccount = () => {
  const navigate = useNavigate()
  const {state} = useContextGlobal()
  const [isLoading, setIsLoading] = useState(false)
  const [formValuesState, setFormValuesState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [responseForm, setResponseForm] = useState({
    ok: false,
    text: "Usuario creado con éxito",
    class: "alert alert-success"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Handler for show password
  const toggleShowPassword = (evt) => {
    evt.preventDefault();
    setShowPassword(!showPassword);
  };

  // Handler for show confirm password
  const toggleShowConfirmPassword = (evt) => {
    evt.preventDefault();
    setShowConfirmPassword(!showConfirmPassword)
  };

  // General Handler for all fields
  const handleFormChange = (evt) => {
    console.log('Fields change values', evt.target.name);
    const {name, value} = evt.target;
    setFormValuesState({
      ...formValuesState,
      [name]: value
    });
    setFormErrors({ ...formErrors, [evt.target.name]: "" });
  };
  
  // Handle submit form create account
  const handlerCreateAccountSubmit = async (evt) => {
    evt.preventDefault();
    const isValidForm = validateCreateForm();
    if (isValidForm) {
      setIsLoading(true)
      const jsonBody = {
        name: formValuesState.firstname,
        lastName: formValuesState.lastname,
        email: formValuesState.email,
        password: formValuesState.confirmPassword,
        role: "ROLE_USER",
        username: ""
      }
      console.log('Form valido');
      console.log(jsonBody);


      try {
        const response = await fetch(state.URL_API.urlBase + state.URL_API.users, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBody)
        })
        const data = await response.json()
        
        if(response.ok){
          console.log('user: ', data);
          setIsLoading(false)
          setFormValuesState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
          })
          setResponseForm({...responseForm, ok: true})
          setTimeout(() => {
            navigate('../login')
          }, 3000)

        }else{
          console.log('Error en la petición: ');
          console.log(response, data);
          setIsLoading(false)
          setResponseForm({
            ok: true,
            text: "Error al crear el usuario, status:" + response.status,
            class: "alert alert-danger"
          })

        }
      } catch (error) {
        console.log('Error conectando al servidor');
        console.log(error);
        setIsLoading(false)
        setResponseForm({
          ok: true,
          text: "Error conectando al servidor",
          class: "alert alert-danger"
        })
      }
    }
    else {
      if(formErrors) console.log('formErrors', formErrors);
    }
  };

  // Handler onBlur form fields validations
  const handlerCreateAccountOnBlur = () => {
    // validateCreateForm();
  };

  // Form field validations
  const validateCreateForm = () => {
    const errors = {};

    //Firstname Validation
    if (formValuesState.firstname === '') {
      errors.firstname = 'El campo de nombre no puede estar vacío.'
    }

    if (formValuesState.lastname === '') {
      errors.lastname = 'El campo de apellido no puede esta vacío.'
    }

    if (!formValuesState.email) {
      errors.email = "El campo de correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formValuesState.email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }else if (/\s/.test(formValuesState.email)) {
      errors.email = "El correo electrónico no puede contener espacios en blanco";
    }
  
    if (!formValuesState.password) {
      errors.password = "El campo de contraseña es obligatorio";
    }else if(formValuesState.password.trim().length < 6) {
      errors.password = "El campo de contraseña debe contar con al menos 6 caracteres";
    }else if (/\s/.test(formValuesState.password)) {
      errors.password = "La contraseña no puede contener espacios en blanco";
    }

    if (!formValuesState.confirmPassword) {
      errors.confirmPassword = 'Debes confirmar tu contraseña.';
    } else if (formValuesState.confirmPassword.trim().length < 6) {
      errors.confirmPassword = 'El campo de confirmar contraseña debe contar con al menos 6 caracteres';
    } else if (/\s/.test(formValuesState.confirmPassword)) {
      errors.confirmPassword = 'El campo no puede contener espacios en blanco.';
    }

    if (formValuesState.password !== formValuesState.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas deben coincidir.';
    }

    console.log('errors', errors);
    setFormErrors(errors);
    const existsNoErrors = Object.keys(errors).length === 0;
    console.log('existsNoErrors', existsNoErrors);
    return existsNoErrors;
  };

  return (
    <section className="form-createAccount__container">
      <h1 className="form-createAccount__title">Crear cuenta</h1>
      <form onSubmit={handlerCreateAccountSubmit} onBlur={handlerCreateAccountOnBlur} className="form-createAccount__form">
        <div className="form-createAccount__wapper-field">
          <fieldset className="form-createAccount__field">
              <label htmlFor="firstname" className="form-createAccount__field-label">Nombre</label>
              <input
                id="firstname" 
                type="text"
                name="firstname"
                value={formValuesState.firstname}
                onChange={handleFormChange}
                className="form-createAccount__input"
              />
              {formErrors && formErrors.firstname && <span className="error-message">{formErrors.firstname}</span>}
          </fieldset>
          <fieldset className="form-createAccount__field">
              <label htmlFor="lastname" className="form-createAccount__field-label">Apellido</label>
              <input 
                id="lastname" 
                type="text"
                name="lastname"
                value={formValuesState.lastname}
                onChange={handleFormChange}
                className="form-createAccount__input"
              />
              {formErrors && formErrors.lastname && <span className="error-message">{formErrors.lastname}</span>}
          </fieldset>
        </div>
          <fieldset className="form-createAccount__field">
              <label htmlFor="email" className="form-createAccount__field-label">Correo electrónico</label>
              <input 
                id="email" 
                type="text"
                name="email"
                value={formValuesState.email}
                onChange={handleFormChange}
                className="form-createAccount__input"
              />
              {formErrors && formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </fieldset>
          <fieldset className="form-createAccount__field password-field">
              <label htmlFor="password" className="form-createAccount__field-label">Contraseña</label>
              <input 
                id="password" 
                type={!showPassword ? "password" : "text"}
                name="password"
                value={formValuesState.password}
                onChange={handleFormChange}
                className="form-createAccount__input"
              />
              <button onClick={toggleShowPassword} type="button" className="form-createAccount__toggle-icon">
                {!showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
              {formErrors && formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </fieldset>
          <fieldset className="form-createAccount__field password-field">
              <label htmlFor="confirmPassword" className="form-createAccount__field-label">Confirmar contraseña</label>
              <input 
                id="confirmPassword" 
                type={!showConfirmPassword ? "password" : "text"}
                name="confirmPassword"
                value={formValuesState.confirmPassword}
                onChange={handleFormChange}
                className="form-createAccount__input"
              />
              <button onClick={toggleShowConfirmPassword} type="button" className="form-createAccount__toggle-icon">
                {!showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
              {formErrors && formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
          </fieldset>
          <div className="form-createAccount__actions">
            {!isLoading
              ? <button type="submit" className="button button__primary form-createAccount__btn">Crear cuenta</button>
              : <Loader />
            }
            <p className="form-createAccount__redirect">¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
          </div>
      </form>
      {responseForm.ok &&
        <div className={responseForm.class} role="alert">{responseForm.text}</div> 
      }
    </section>
  );
}

export default CreateAccount;