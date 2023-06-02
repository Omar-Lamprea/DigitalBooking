import Modal from "react-bootstrap/Modal";
// import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Default from "../../assets/images/default.png";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useRef } from "react";
import { useContextGlobal } from "../../context/global.context";
// import { useNavigate } from 'react-router-dom';

const ModalFormCategory = () => {
  const initialTemplate = {
    nameCategory: "",
    description: "",
    categoryImage: null,
  };
  const { state, dispatch } = useContextGlobal();
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialTemplate);
  const [errorsForm, setErrorsForm] = useState({});
  const [serverResponse, setServerResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === "file" ? files : value;
    let updatedFormData;
    updatedFormData = {
      ...formData,
      [name]: fieldValue,
    };

    if (typeof fieldValue === "object") {
      const file = e.target.files[0];
      const reader = new FileReader();
      const img = e.target.previousElementSibling.previousElementSibling;
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    setFormData(updatedFormData);
    setErrorsForm({ ...errorsForm, [name]: "" });
  };

  const hanbleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(formData);
    if (isValid.ok) {
      setIsLoading(true)
      setServerResponse(null)
      const formToSend = new FormData()
      const jsonBody = {
        name: formData.nameCategory,
        description: formData.description,
      }
      formToSend.append("image", formData.categoryImage[0]);
      formToSend.append("stringCategory", JSON.stringify(jsonBody));

      try {
        const response = await fetch(
          "http://18.218.175.122:8080/digital-booking/category",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${state.user.token}`,
            },
            body: formToSend,
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
            // throw new Error('Error al realizar la solicitud');
          }
        } else {
          setServerResponse({
            text: "Se ha registrado el producto con éxito!",
            className: "",
          })
          setCategories()
          setFormData(initialTemplate);
          setErrorsForm({});
          setIsLoading(false);
          formRef.current.reset()
          handleClose()
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

  const handleShow = () => setShow(true);

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.nameCategory.trim())
      newErrors.nameCategory = "El nombre de la categoria es requerida.";

    if (formData.description.trim() === "")
      newErrors.description = "La descripción de la categoria es requerida.";

    if (formData.categoryImage === null)
      newErrors.categoryImage =
        "Debes agregar una foto de la categoria a guardar.";

    return {
      ok: Object.keys(newErrors).length === 0,
      newErrors: newErrors,
    };
  };

  const handleClose = (e) => {
    if (e && e.target.innerHTML === "Guardar") {
      setShow(false);
      setError(false);
      // navigate('/admin/categorias')
    } else {
      setShow(false);
      setError(false);
      // navigate('/admin/categorias')
    }
  };

  const setCategories = async()=>{
    dispatch({type: "setCategories"})

      const res =  await fetch(state.URL_API.urlBase + state.URL_API.categoryAll, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: 'categories', payload: data})
      } else {
        console.log('Error');
      }

  }

  return (
    <>
      <div className="container-button">
        <button className="add-category" onClick={handleShow}>
          Agregar categoría
        </button>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form-register-category"
            onSubmit={hanbleSubmit}
            ref={formRef}
          >
            <div className="form-register-row">
              <div className="form-row">
                {error && (
                  <p style={{ color: "red" }}>
                    Ocurrió un error al intentar eliminar el producto
                  </p>
                )}
                <label htmlFor="nameCategory">Nombre de la categoría*</label>
                <input
                  type="text"
                  name="nameCategory"
                  id="nameCategory"
                  onChange={handleChange}
                />
                {errorsForm && <span>{errorsForm.nameCategory}</span>}
              </div>
              <div className="form-row">
                <label htmlFor="description">Descripción*</label>
                <textarea
                  name="description"
                  id="description"
                  onChange={handleChange}
                ></textarea>
                {errorsForm && <span>{errorsForm.description}</span>}
              </div>
            </div>
            <div className="form-register-row">
              <div className="form-row">
                <img src={Default} alt="demo" />
                <label htmlFor="categoryImage" className="labelCategoryImage">
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </label>
                <input
                  type="file"
                  name="categoryImage"
                  id="categoryImage"
                  className="d-none"
                  onChange={handleChange}
                  accept="image/*"
                />
                {errorsForm && (
                  <span className="text-center">
                    {errorsForm.categoryImage}
                  </span>
                )}
              </div>
            </div>
            <div className="container-button text-center mt-3">
              {!isLoading ? (
                <button className="add-category">Guardar</button>
              ) : (
                <Loader />
              )}
            </div>
            {serverResponse && (
              <p className={serverResponse.className + " text-center mt-2"}>
                {serverResponse.text}
              </p>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalFormCategory;
