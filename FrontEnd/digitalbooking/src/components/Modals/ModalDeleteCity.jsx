import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useContextGlobal } from '../../context/global.context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const ModalDeleteCity = ({id, cityName, deleteId}) => {
  
  const {state} = useContextGlobal()
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (e) => {
    if(e && e.target.innerHTML === 'Eliminar'){
      const url = `${state.URL_API.urlBase}/city/${id}`
      fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${state.user.token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al realizar la petición DELETE');
        }
        setShow(false)
        setError(false)
        deleteId(id)

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
          <Modal.Title>Eliminar Ciudad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar la ciudad: {cityName}?
          {error && <p style={{color: "red"}}>Ocurrió un error al intentar eliminar la ciudad</p>}
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

export default ModalDeleteCity

ModalDeleteCity.propTypes = {
  id: PropTypes.number.isRequired,
  cityName: PropTypes.string.isRequired,
  deleteId: PropTypes.func.isRequired
  
};
