import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContextGlobal } from '../../context/global.context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const ModalDeleteProduct = ({id, productName}) => {
  const {state, dispatch} = useContextGlobal()
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleClose = (e) => {
    if(e && e.target.innerHTML === 'Eliminar'){
      const url = `${state.URL_API.urlBase}${state.URL_API.product}/${id}`
      fetch(url, {method: 'DELETE'})
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al realizar la petición DELETE');
        }
        dispatch({type: "deleteLodging", payload: parseInt(id)})
        setShow(false)
        setError(false)
        location.pathname !== "/admin/editarProductos"
          ? navigate('/')
          : false
      })
      .catch(error => {
        console.error('Error:', error)
        setError(true)
      })
    }else{
      setShow(false)
      setError(false)
    }
  };
  const handleShow = () => setShow(true);



  return (
    <>
      <button className="delete-product" onClick={handleShow}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Alojamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el alojamiento: {productName}?
          {error && <p style={{color: "red"}}>Ocurrió un error al intentar eliminar el producto</p>}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteProduct

ModalDeleteProduct.propTypes = {
  id: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
