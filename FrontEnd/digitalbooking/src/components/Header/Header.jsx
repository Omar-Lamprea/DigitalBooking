import { useState } from 'react';
import Logo from '../../assets/logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  const header = document.querySelector('.header')
  const isLogin = localStorage.getItem('user')
 
  !isLogin && localStorage.setItem('user', false)
  const [user, setUser] = useState(JSON.parse(isLogin))

  const closeNav = () => header.click()
  
  const handleLogin = () => {
    const userParsed = JSON.parse(localStorage.getItem('user'))
    if(!userParsed){
      localStorage.setItem('user', true)
      setUser(true)
    }else{
      localStorage.removeItem('user')
      setUser(false)
      window.location.href = '/'
    }
  }

  const initialNavBar = () =>{
    return(
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='btn-hamburger' />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="menu">
            <Link to="/crearCuenta">Crear cuenta</Link>
            <Link to="#" onClick={handleLogin}>Iniciar sesión</Link>
          </Nav>
        </Navbar.Collapse>
      </>
    )
  }

  const userNavBar = () =>{
    return(
      <>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-custom-components" className='dropdown-user'>
            <div className="initialName">BR</div>
            <div className="userName">
              <p className='name'>Bruno Rodríguez</p>
              <p className='role'>Admin</p>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdown-user-items'>
          <Link to="" className='dropdown-item' onClick={handleLogin}>Cerrar sesión</Link>
          <Link to="/admin" className='dropdown-item' onClick={closeNav}>Administrar página</Link>
          </Dropdown.Menu>
        </Dropdown>
      </>
    )
  }

  

  return (
    <header className="header">
      <Navbar expand="md">
        <Container className="">
          <Link to="/">
            <Navbar className="logo">
              <img src={Logo} alt="" />
            </Navbar>
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