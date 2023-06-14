
import { useContextGlobal } from "../../context/global.context";
import { useCallback, useEffect, useState, useRef } from "react";
import CityCards from "./CityCards"
import { GLOBAL_API } from "../../utils/constants";
import Loader from "../Loader/Loader";

const RegisterCity = () => {
    const {state} = useContextGlobal();
    const [cities, setCities] = useState([]);
    const [countries, setCountries] =useState(false)
    const formRef = useRef(null);
    const [formData, setFormData] = useState(initialTemplate);
    const [errorsForm, setErrorsForm] = useState({});
    const [serverResponse, setServerResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getCityList = useCallback(async() => {
        try {
            const res = await fetch(GLOBAL_API.urlBase + GLOBAL_API.citiesAll, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.user.token}`
                }
            });
            const cities = await res.json();
            if (res.ok) { 
                console.log('cities', cities);
                setCities(cities);
            }
        } catch (error) {
            console.error('Error usuarios: ', error);   
        }


    }, [state.user.token]);
    
    useEffect( () => {
        getCityList();
    }, [getCityList]);

    const initialTemplate = {
        city: "",
        country: ""
      };

      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const fieldValue = type === "file" ? files : value;
        let updatedFormData;
        updatedFormData = {
          ...formData,
          [name]: fieldValue,
        };
    
        setFormData(updatedFormData);
        setErrorsForm({ ...errorsForm, [name]: "" });
      };
    
      const hanbleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(formData);
        if (isValid.ok) {
          setIsLoading(true)
          setServerResponse(null)
          const jsonBody = {
            name: formData.city,
            country: formData.country,
          }
    
          try {
            const response = await fetch(state.URL_API.urlBase + "/city",{
                method: "POST",
                headers: {
                  Authorization: `Bearer ${state.user.token}`,
                },
                body: JSON.stringify(jsonBody),
              }
            )
            const data = await response.json();
            if (!response.ok) {
              console.log("Response: ", [response, data]);
              let text = "Petición fallida";
    
              if (response.status >= 400 && response.status <= 500) {
                text = data.ErrorMessage || data.Message || text;
                setServerResponse({
                  text: text + " Status: " + response.status,
                  className: "errorResponse",
                });
                setIsLoading(false);
                throw new Error('Error al realizar la solicitud');
              }
            } else {
              setServerResponse({
                text: "Se ha registrado el producto con éxito!",
                className: "",
              })
              setFormData(initialTemplate);
              setErrorsForm({});
              setIsLoading(false);
              formRef.current.reset()
            }
          } catch (error) {
              console.log("Error en el envio:");
              console.error(error);
              setIsLoading(false);
              setServerResponse({
                text: "Lo sentimos, tenemos problemas para establecer la conexión con nuestros servidores, por favor intenta mas tarde!",
                className: "errorResponse",
              })
          }
        } else {
          setErrorsForm(isValid.newErrors);
        }
      };
    
    
      const validateForm = (formData) => {
        const newErrors = {};
        if (!formData.country)
          newErrors.country = 'El país es requerido';
    
        return {
          ok: Object.keys(newErrors).length === 0,
          newErrors: newErrors,
        };
      };

      useEffect(()=>{
        const getCountries = async () =>{
          try {
            const response = await fetch(state.URL_API.urlBase + state.URL_API.countriesAll,{
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.user.token}`
              }
            })
            const data = await response.json()
            if(response.ok){
              setCountries(data)
            }else{
              console.log(data);
            }
          } catch (error) {
            console.log(error);
          }
        }
        getCountries()
      },[state])

  return (
    <div>
        <div className="prueba">
            <div>
            <form className="form-register-city" onSubmit={hanbleSubmit}
            ref={formRef}>
                <div className="form-register-row">
                        <div className="form-row">
                            <label htmlFor="country">País</label>
                            <select name="country" id="country" onChange={handleChange}>
                                <option value=""></option>
                                {countries && 
                                countries.map(country =>
                                    <option key={country.countryId} value={country.name}>{country.name}</option>
                                )
                                }
                            </select>
                            {errorsForm && <span>{errorsForm.country}</span>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="city">Ciudad*</label>
                            <input type="text" name="city" id="city" onChange={handleChange}/>
                            {errorsForm && <span>{errorsForm.city}</span>}
                        </div>
                        <div className="container-button text-center">
                            <div>
                                {!isLoading ? (
                                <button className="add-category">Guardar Ciudad</button>
                                ) : (
                                <Loader />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                {serverResponse && (
                <p className={serverResponse.className + " text-center mt-2"}>
                    {serverResponse.text}
                </p>
                )}
            </div>
            <div className="container-city my-5">

                {cities ? (
                    cities.map((city, i) => (
                    <CityCards data={city} key={city.cityId + '-' + i} />
                    ))
                ) : (
                    <p>No existen ciudades aún</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default RegisterCity