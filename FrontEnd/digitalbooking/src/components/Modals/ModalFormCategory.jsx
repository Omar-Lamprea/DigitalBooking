import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useContextGlobal } from '../../context/global.context';


const ModalFormCategory = () => {
//   const {state, dispatch} = useContextGlobal()
  const [show, setShow] = useState(false);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate()

//   const handleClose = (e) => {
//     if(e && e.target.innerHTML === 'Eliminar'){
//       const url = `${state.URL_API.urlBase}${state.URL_API.product}/${id}`
//       fetch(url, {method: 'DELETE'})
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Error al realizar la petición DELETE');
//         }
//         dispatch({type: "deleteLodging", payload: parseInt(id)})
//         setShow(false)
//         // setError(false)
//         navigate('/');
//       })
//       .catch(error => {
//         console.error('Error:', error)
//         // setError(true)
//       })
//     }else{
//       setShow(false)
//     //   setError(false)
//     }
//   };
  const handleShow = () => setShow(true);



  return (
    <>
      <button className="" onClick={handleShow}>
        Agregar categoría
      </button>

      <Modal show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="form-register-category">  
            <div className="form-register-row">
                <div className="form-row">
                    <label htmlFor="nameCategory">Nombre de la categoría*</label>
                    <input type="text" name="nameCategory" id="nameCategory"/>
                    {/* {errorsForm && <span>{errorsForm.score}</span>} */}
                </div>
                <div className="form-row">
                    <label htmlFor="description">Descripción*</label>
                    <textarea name="description" id="description" rows="3"></textarea>
                    {/* {errorsForm && <span>{errorsForm.description}</span>} */}
                </div>
            </div>
            <div className="form-register-row">
                <div className="form-row">
                    <label htmlFor="categoryImage" className='labelProductImage'>
                    <FontAwesomeIcon icon={faCloudArrowUp} style={{color: "#f0e919",}} />
                    </label>
                    <input type="file" name="productImage" id="productImage" className='d-none' accept='image/*'/>
                
                    {/* {errorsForm && <span className='text-center'>{errorsForm.productImage}</span>} */}
                </div>
            </div>
            {/* ¿Estás seguro de eliminar el producto {id}?
            {error && <p style={{color: "red"}}>Ocurrió un error al intentar eliminar el producto</p>} */}
        </form>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Cancelar
          </Button>
          <Button className='buttons'>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default ModalFormCategory