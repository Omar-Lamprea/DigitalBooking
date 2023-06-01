import PropTypes from 'prop-types';

const UserListItem = ({user}) => {
    return (
      <div className="user-list-item__container">
        <div className="user-list-item__wrapper">
            <div className="user-list-item__initials-name">
                {user?.name.substring(0, 1) + user?.lastName.substring(0, 1)}
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
              <select className="form-select" aria-label="Default select example">
                <option>Selecciona un rol</option>
                <option selected value="1">Admin</option>
                <option value="2">Customer</option>
              </select>
            </div>
        </div>
      </div>
    )
};

export default UserListItem;

UserListItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
};