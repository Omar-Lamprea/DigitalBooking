import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate} from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import RegisterProduct from './pages/RegisterProduct/RegisterProduct'
import Admin from './pages/Administration/Admin'
import NotFound from './pages/NotFound'
import EditProducts from './pages/EditProducts/EditProducts'
import Detalle from './pages/Details/Detalle'
import RegisterCategory from './components/RegisterCategory/RegisterCategory'
import Login from './pages/Login/Login'
import CreateAccount from './pages/CreateAccount/CreateAccount'
import { useContextGlobal } from './context/global.context'
import { useEffect } from 'react'
import UserList from './components/UsersList/UserList'
import RegisterCity from './components/RegisterCity/RegisterCity'
import Bookings from './pages/Bookings/Bookings'
import SuccessBooking from './pages/Bookings/SuccessBooking'


function App() {
  const {state} = useContextGlobal()
  function Guard({ children, condition, redirect }) {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!condition) {
        navigate(redirect);
      }
    }, [condition, navigate, redirect]);
    return children;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />

      <Route path='admin' element={
        <Guard condition={state.user?.data?.role === "ROLE_ADMIN"} redirect='/'>
          <Admin />
        </Guard>}>
          <Route index element={<EditProducts />} />
          <Route path='registrar' element={<RegisterProduct />} />
          <Route path='usuarios' element={<UserList />} />
          <Route path='categorias' element={<RegisterCategory />} />
          <Route path='ciudades' element={<RegisterCity />} />
      </Route>

      <Route path='producto/:id' element={<Detalle />} />
      <Route path='producto/:id/reservas/exito' element={<SuccessBooking />} />
      <Route path='producto/:id/reservas' element={
        <Guard condition={state.user?.data} redirect='/login'>
          <Bookings />
         </Guard>
      }/>

      <Route path='create-account' element={<CreateAccount />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Route>
    )
  )
  return (
      <RouterProvider router={router} />
  );
}

export default App
