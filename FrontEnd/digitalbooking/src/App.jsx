import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout'
import Home from './pages/Home'
import RegisterProduct from './pages/RegisterProduct/RegisterProduct'
import Admin from './pages/Administration/Admin'
import NotFound from './pages/NotFound'
import EditProducts from './pages/EditProducts/EditProducts'
import Detalle from './pages/Details/Detalle'
import Role from './components/Role/Role'
import RegisterCategory from './components/RegisterCategory/RegisterCategory'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path='admin' element={<Admin />}>
        <Route index element={<Role />}/>
        <Route path='categorias' element={<RegisterCategory />}/>
        <Route path='registrar' element={<RegisterProduct />}/>
        <Route path='editarProductos' element={<EditProducts />}/>
      </Route>
      <Route path='producto/:id' element={<Detalle />}/>
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
