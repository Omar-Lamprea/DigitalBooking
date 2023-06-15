import PropTypes from 'prop-types';
import { ROLE_TYPE } from '../../utils/user.contants';
import { useState } from 'react';
import ModalUpdateUserRole from '../Modals/ModalUpdateUserRole';

const UserListItem = ({user}) => {

  const [selectedRole, setSelectedRole] = useState();
  const [showUpdateModal, setShowUpdateModal] = useState();
  const [originalUser, setOriginalUser] = useState();
  const [toUpdateUser, setToUpdateUser] = useState();

  
  const handleOnChangeRole = (e) => {
    let initialUser = {...user};
    let currentUser = user;
    console.log('event change', e.target.value);
    setSelectedRole(e.target.value);
    console.log('user', user);
    // initialUser = user;
    setOriginalUser(initialUser);
    console.log('original', initialUser);

    currentUser.role = e.target.value;
    console.log('updateUserRole', currentUser);

    const changedUsersRole = [];

    changedUsersRole.push(currentUser);
    console.log('user modified', changedUsersRole);

    setToUpdateUser(user);
    setShowUpdateModal(true);
    console.log('showUpdateModal', showUpdateModal);
    // updateUserSelectedRole(user);

  };


  // const updateUserSelectedRole  = (user) => {
  //   setShowUpdateModal(true);
  // };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

    return (
      <div className="user-list-item__container">
        <div className="user-list-item__wrapper">
            <div className="user-list-item__initials-name">
                {user?.name.substring(0, 1).toUpperCase() + user?.lastName.substring(0, 1).toUpperCase()}
            </div>
            <div className="user-list-item__name-data">
              <div>
                  <span className="user-list-item__label">Nombre:</span><br/>
                  <span className="user-list-item__text">{user.name}</span>
              </div>
              <div>
                <span className="user-list-item__label">Apellido:</span><br/>
                <span className="user-list-item__text">{user.lastName}</span>
              </div>
            </div>
            <div className="user-list-item__email">
              <span className="user-list-item__label">Email:</span><br/>
              <span className="user-list-item__text">{user.email}</span>
            </div>
            <div className="user-list-item__role">
              <span className="user-list-item__label">Rol:</span>
              <select className="form-select" aria-label="Default select example" value={selectedRole} defaultValue={user.role == ROLE_TYPE.admin ? ROLE_TYPE.admin : ROLE_TYPE.user} onChange={handleOnChangeRole}>
                  <option value={ROLE_TYPE.admin}>Administrador</option>
                  <option value={ROLE_TYPE.user}>Usuario</option>
              </select>
            </div>
        </div>
        {/* <button className='button button__with-border'>Actualizar roles</button> */}
        <div className='update-user'>
          <ModalUpdateUserRole show={showUpdateModal} close={handleCloseUpdateModal} originalUser={originalUser} toUpdateUser={toUpdateUser}></ModalUpdateUserRole>
        </div>
      </div>
    )
};

export default UserListItem;

UserListItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
};