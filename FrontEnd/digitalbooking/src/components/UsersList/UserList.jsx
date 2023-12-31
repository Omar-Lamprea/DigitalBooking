import { useCallback, useEffect, useState } from "react";
import { GLOBAL_API } from "../../utils/constants";
import UserListItem from "../UserLIstItem/UserListItem";
import { useContextGlobal } from "../../context/global.context";

const UserList = () => {

    const {state} = useContextGlobal();
    const [users, setUsers] = useState([]);
    const [showAlert, setShowAlert] = useState(true);

    const getUsersList = useCallback(async() => {
        try {
            const res = await fetch(GLOBAL_API.urlBase + GLOBAL_API.users, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.user.token}`
                }
            });
            const users = await res.json();
            if (res.ok) { 
                console.log('users', users);
                setUsers(users);
            }
        } catch (error) {
            console.error('Error usuarios: ', error);   
        }


    }, [state.user.token]);

    setTimeout(() => {
        setShowAlert(false);
    }, 3000);
    
    useEffect( () => {
        getUsersList();
    }, [getUsersList]);

    return (
        <div className="users-list__container">
            <div className="user-list__wrapper">
                {users.map((user, index) => (
                    <UserListItem key={index} user={user} />
                ))}
                {state.userToUpdate.updated && showAlert && <div className="alert alert-success success-msg">¡El rol del usuario se actualizo con exito.!</div>}
            </div>
        </div>
    )
};


export default UserList;