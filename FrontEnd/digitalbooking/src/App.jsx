import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout'
import Home from './pages/Home'
import RegisterProduct from './components/RegisterProduct/RegisterProduct'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import EditProducts from './components/EditProducts/EditProducts'
import Detalle from './pages/Detalle'
import Login from './pages/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path='admin' element={<Admin />}>
        <Route index element={<EditProducts />}/>
        <Route path='registrar' element={<RegisterProduct />}/>
      </Route>
      <Route path='producto/:id' element={<Detalle />}/>
      <Route path='login' element={<Login />}/>
      <Route path='*' element={<NotFound />}/>
    </Route>
  )
)

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App
