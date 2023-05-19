import { useEffect } from "react"
import { Link, Outlet} from "react-router-dom"
const Admin = () => {

  const toggleActionAdmin = (e) =>{
    const btns = document.querySelectorAll('.btn-action-admin')
    const currentBtn = e.target
    btns.forEach(btn => {
      btn.classList.remove('active')
    });
    currentBtn.classList.add('active')
  }

  const activeClass = () =>{
    const btns = document.querySelectorAll('.btn-action-admin')
    if(location.pathname === '/admin/registrar'){
      btns.forEach(btn => {
        btn.innerHTML === 'Editar productos' 
          ? btn.classList.remove('active')
          : btn.classList.add('active')
      })
    }else{
      btns.forEach(btn => {
        btn.innerHTML === 'Editar productos'
          ? btn.classList.add('active')
          : btn.classList.remove('active')
      })
    }
  }

  
  useEffect(()=>{
    activeClass()
  }, [])
  

  return (
    <section className="admin">
      <div className="admin-actions">
        <Link to="/admin">
          <button 
            className="btn-action-admin" 
            onClick={toggleActionAdmin}>
              Editar productos
          </button>
        </Link>
        <Link to="/admin/registrar">
          <button 
            className="btn-action-admin" 
            onClick={toggleActionAdmin}>
              Registrar producto
          </button>
        </Link>
      </div>
      
      <Outlet />

    </section>
  )
}

export default Admin