import { Outlet} from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Layout from './components/Layout'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  )
}

export default App
