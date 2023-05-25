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
      const currentBtn = Array.from(btns).filter(btn => btn.value === path)[0]
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
          <Link to="/admin">
            <button 
              className="btn-action-admin"
              value=""
              onClick={toggleActionAdmin}>
                Roles y Usuarios
            </button>
          </Link>
          <Link to="/admin/categorias">
            <button 
              className="btn-action-admin" 
              value="categorias"
              onClick={toggleActionAdmin}>
                Categorías
            </button>
          </Link>
        </div>
        <div className="row-buttons">
          <Link to="/admin/registrar">
            <button 
              className="btn-action-admin" 
              value="registrar"
              onClick={toggleActionAdmin}>
                Crear Producto
            </button>
          </Link>
          <Link to="/admin/editarProductos">
            <button 
              className="btn-action-admin"
              value="editarProductos"
              onClick={toggleActionAdmin}>
                Editar Producto
            </button>
          </Link>
        </div>
      </div>
      <Outlet />

    </section>
  )
}

export default Admin