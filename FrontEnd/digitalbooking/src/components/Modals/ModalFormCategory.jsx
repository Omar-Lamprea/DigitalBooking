import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Default from '../../assets/images/default.png'
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextGlobal } from '../../context/global.context';


const ModalFormCategory = () => {
    const initialTemplate = {
        nameCategory: '',
        description: '',
        categoryImage: "null",
    }
    const {state,dispatch} = useContextGlobal()
    const formRef = useRef(null);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(initialTemplate)
    const [errorsForm, setErrorsForm] = useState({})
    const [serverResponse, setServerResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false);
    const navigate = useNavigate()

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
        console.log(updatedFormData)
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
        console.log(isValid)
        if(isValid.ok){
        const formToSend = new FormData();
        const jsonBody = {
            nameCategory: formData.nameCategory,
            description: formData.description,
        }
        formToSend.append('stringCategory',JSON.stringify(jsonBody))
        Array.from(formData.categoryImage)
        formToSend.append("image", formData.categoryImage[0])

        try {
                const response = await fetch('http://18.218.175.122:8080/digital-booking/category', {
                    method: "POST",
                    Authorization : `Bearer ${state.user.token}`,
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
                    dispatch({ type: 'http://18.218.175.122:8080/digital-booking/category', payload: [data]})
                    setFormData(initialTemplate)
                    setErrorsForm({})
                    setIsLoading(false)
                    formRef.current.reset();
                    setServerResponse({
                        text: 'Se ha registrado el producto con éxito!',
                        className: ''
                    })
                }
            }
            catch (error) {
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

    const handleShow = () => setShow(true);

    const validateForm = (formData) => {
        const newErrors = {}
    
        if (!formData.nameCategory.trim()) 
        newErrors.nameCategory = 'El nombre de la categoria es requerida';

        if (formData.description.trim() === '')
        newErrors.description = 'La descripción de la categoria es requerida.';
    
        if (formData.categoryImage === null)
        newErrors.categoryImage = 'Debes agregar una foto de la categoria a guardar';
    
        return {
        ok: Object.keys(newErrors).length === 0,
        newErrors: newErrors
        }
    };

    const handleClose = (e) => {
        if(e && e.target.innerHTML === 'Registrar'){
            setShow(false)
            setError(false)
            navigate('/');
        }else{
        setShow(false)
        setError(false)
        }
    };

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
            <form className="form-register-category" onSubmit={hanbleSubmit} ref={formRef}>  
                <div className="form-register-row">
                    <div className="form-row">
                        {error && <p style={{color: "red"}}>Ocurrió un error al intentar eliminar el producto</p>}
                        <label htmlFor="nameCategory">Nombre de la categoría*</label>
                        <input type="text" name="nameCategory" id="nameCategory" onChange={handleChange}/>
                        {errorsForm && <span>{errorsForm.nameCategory}</span>}
                    </div>
                    <div className="form-row">
                        <label htmlFor="description">Descripción*</label>
                        <textarea name="description" id="description" onChange={handleChange}></textarea>
                        {errorsForm && <span>{errorsForm.description}</span>}
                    </div>
                </div>
                <div className="form-register-row">
                    <div className="form-row">
                    <img src={Default} alt="demo" />
                    <label htmlFor="categoryImage" className='labelCategoryImage'>
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                    </label>
                    <input 
                        type="file" 
                        name="categoryImage" 
                        id="categoryImage" 
                        className='d-none' 
                        onChange={handleChange} 
                        accept='image/*'/>
                    {errorsForm && <span className='text-center'>{errorsForm.categoryImage}</span>}
                    </div>
                </div>
                {!isLoading
          ? <button>Registrar</button>
          : <Loader />
        }
        {serverResponse && 
          <p className={serverResponse.className + " text-center"}>
            {serverResponse.text}
          </p>
        }
            {/* <Modal.Footer>
            <Button onClick={handleClose} variant="secondary">
                Cancelar
            </Button>
            
            {!isLoading
            ? <Button className='buttons'>Guardar</Button>
            : <Loader />
            }
            {serverResponse && 
            <p className={serverResponse.className + "text-center"}>
                {serverResponse.text}
            </p>
            }
            </Modal.Footer> */}
            </form>  
            </Modal.Body>
        </Modal>
        </>
    );
}



export default ModalFormCategory