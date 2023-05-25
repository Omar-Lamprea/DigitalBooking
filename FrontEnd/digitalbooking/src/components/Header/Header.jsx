import { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useContextGlobal } from '../../context/global.context';

const Header = () => {
  const path = location.pathname

  const {state} = useContextGlobal()

  const [user, setUser] = useState(state.user)
  const [drodownHeaderIsOpen, setDrodownHeaderIsOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogOut = () => {
    setDrodownHeaderIsOpen(false)
    navigate('/')
    //lógica para cerrar sesión....
  }

  const initialNavBar = () =>{
    return(
      <>
        <Navbar className='dropdown-hamburger' expand="lg" expanded={isNavbarOpen} onToggle={setIsNavbarOpen}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='btn-hamburger' />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="menu">
              <Link to="/crearCuenta" onClick={() =>{setIsNavbarOpen(false)}}>Crear cuenta</Link>
              {path !== '/login' && <Link to="/login">Iniciar sesión</Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }

  const userNavBar = () =>{
    
    return(
      <>
        <Dropdown className='align-self-center' show={drodownHeaderIsOpen} onToggle={setDrodownHeaderIsOpen}>
          <Dropdown.Toggle id="dropdown-custom-components" className='dropdown-user'>
            <div className="initialName">BR</div>
            <div className="userName">
              <p className='name'>{user.name} {user.apellido}</p>
              <p className='role'>{user.rol}</p>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdown-user-items'>
            {user.rol === "Admin" && 
              <Link to="/admin" className='dropdown-item'onClick={() =>{setDrodownHeaderIsOpen(false)}} >Administrar página</Link>
            }
            <Link to="/cuenta" className='dropdown-item'onClick={() =>{setDrodownHeaderIsOpen(false)}} >Administrar cuenta</Link>
            <Link to="" className='dropdown-item' onClick={handleLogOut}>Cerrar sesión</Link>
          </Dropdown.Menu>
        </Dropdown>
      </>
    )
  }

  useEffect(()=>{
    setUser(state.user)
  }, [state])

  return (
    <header className="header">
      <Navbar expand="md">
        <Container className="align-items-start">
          <Link to="/" className='logo'>
            <img src={Logo} alt="" />
            <span>Sentite como en tu hogar</span>
          </Link>
          {user
            ? userNavBar()
            :initialNavBar()
          }
        </Container>
      </Navbar>
    </header>
  );
}

export default Header