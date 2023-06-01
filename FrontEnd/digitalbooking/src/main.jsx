import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import ContextProvider from './context/global.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <ContextProvider>
      <App/>
    </ContextProvider>
  //</React.StrictMode>
)
