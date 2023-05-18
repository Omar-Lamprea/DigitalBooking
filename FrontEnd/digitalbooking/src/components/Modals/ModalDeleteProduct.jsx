import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import PropTypes from 'prop-types';


const ModalDeleteProduct = ({id}) => {

  const url = 'http://18.218.175.122:8080/digital-booking/product/' + id
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (e) => {
    if(e){
      if(e.target.innerHTML === 'Eliminar'){
        fetch(url, {method: "DELETE"})
        .then(response => {
          if (!response.ok) throw new Error('Error al intentar eliminar el producto');
          return response.json();
        })
        .then(data => {
          console.log(data);
          setShow(false)
          setError(false)
          location.pathname = "/"
        })
        .catch(error => {
          console.error('Error:', error);
          setError(true)
        });
      }else{
        setShow(false)
        setError(false)

      }
    }else{
      setShow(false)
        setError(false)

    }

  };
  const handleShow = () => setShow(true);



  return (
    <>
      <button className="delete-product" onClick={handleShow}>
        Eliminar
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el producto {id}?
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

ModalDeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ModalDeleteProduct