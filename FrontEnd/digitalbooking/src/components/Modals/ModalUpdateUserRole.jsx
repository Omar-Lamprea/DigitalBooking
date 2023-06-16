import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useContextGlobal } from '../../context/global.context';
import { GLOBAL_API } from '../../utils/constants';

const ModalUpdateUserRole = (props) => {

    const {state} = useContextGlobal();
    const [show, setShow] = useState(props.show);
    const [error, setError] = useState();
    const [updatedRole, setUpdatedRole] = useState(false);
    const user = props.originalUser;


    const handleClose = async (e) => {
      console.log('event modal', e.target);
      if (e && e.target.innerHTML == 'Actualizar') {
        const urlRequest = `${GLOBAL_API.urlBase}${GLOBAL_API.users}/${props.toUpdateUser.email}/?role=${props.toUpdateUser.role}`;
        console.log('url', urlRequest);
        try {
          const response = await fetch(urlRequest, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.user.token}`
            }
          });

          const data = await response.text();
          if (response.ok) {
            console.log('data', data);
            setUpdatedRole(true);
          }
        } catch (error) {
          console.log('Error: ', error);
          setUpdatedRole(false);
        }
      }
    };

    return (
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar ususario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Deseas actualizar el rol del usuario {user?.email}?</p>
          {/* {!updatedRole && <p>¿Deseas actualizar el rol del usuario {user?.email}?</p>}
          {updatedRole && <div>
            <p>¡El rol del usuario se ha actualizado con exito!</p>
          </div>} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
              Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
              Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    )
};

export default ModalUpdateUserRole;