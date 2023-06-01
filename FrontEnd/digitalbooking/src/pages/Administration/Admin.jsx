import { useEffect } from "react"
import { Link, Outlet} from "react-router-dom"
const Admin = () => {

  const toggleActionAdmin = (e) =>{
    const btns = document.querySelectorAll('.btn-action-admin')
    btns.forEach(btn => {
      btn.classList.remove('active')
    })
    if(e){
      const currentBtn = e.target
      currentBtn.classList.add('active')
    }else{
      const path = location.pathname.substring(7);
      const currentBtn = Array.from(btns).filter(btn => btn.getAttribute('value') === path)[0]
      currentBtn.classList.add('active')
    }
  }
  useEffect(()=>{
    toggleActionAdmin()
  }, [])
  
  return (
    <section className="admin">
      <div className="admin-actions">
        <div className="row-buttons">
          <Link 
            to="/admin"
            className="btn-action-admin"
            value=""
            onClick={toggleActionAdmin}>
              Productos
          </Link>

          <Link 
            to="/admin/registrar"
            className="btn-action-admin" 
            value="registrar"
            onClick={toggleActionAdmin}>
              Crear Producto
          </Link>
        </div>
        <div className="row-buttons">
        <Link 
            to="/admin/categorias"
            className="btn-action-admin" 
            value="categorias"
            onClick={toggleActionAdmin}>
              Categorías
          </Link>

          <Link 
            to="/admin/usuarios" 
            className="btn-action-admin"
            value="usuarios"
            onClick={toggleActionAdmin}>
              Roles y Usuarios
          </Link>
        </div>
      </div>
      <Outlet />

    </section>
  )
}

export default Admin