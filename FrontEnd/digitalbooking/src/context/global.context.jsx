import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { GLOBAL_API } from "../utils/constants";

const initialState = {
  URL_API: GLOBAL_API,
  APIdata: [],
  user: {
    data: JSON.parse(localStorage.getItem('user'))?.data || false,
    token: JSON.parse(localStorage.getItem('user'))?.token || false,
  }
}

const ContextGlobal = createContext('')

const reducer = (state, action) => {
  switch (action.type){
    case 'APIdata':
      return  {...state, APIdata: [...state.APIdata, ...action.payload]}
    case 'deleteLodging':
      return {...state, APIdata: state.APIdata.filter(lodging => lodging.idProduct !== action.payload)}
    case 'setUser':
        localStorage.setItem('user', JSON.stringify(action.payload))
        return {...state, user: action.payload}
    case 'logout':
      localStorage.removeItem('user')
      return {...state, user: false}
      default:
        throw new Error('action type error')
  }
}


const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const getList = useCallback(async () => {
    // console.log('callback API...');
    try {
      const res = await fetch(GLOBAL_API.urlBase + GLOBAL_API.productsAll,{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: 'APIdata', payload: data })
      } else {
        console.log('Error: ', data)
        dispatch({ type: 'APIdata', payload: res })
      }
    } catch (error) {
      console.log('Context error:', error)
    }
  }, []);


  useEffect(() =>{
    getList()
  },[getList, dispatch])
  
  
  return (
    <ContextGlobal.Provider value={{state, dispatch}}>
      {children}
    </ContextGlobal.Provider>
  )
}

export default ContextProvider
export const useContextGlobal = () => useContext(ContextGlobal)

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}