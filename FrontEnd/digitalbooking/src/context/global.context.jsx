import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { GLOBAL_API } from "../utils/constants";

const initialState = {
  URL_API: GLOBAL_API,
  APIdata: [],
  user: {
    data: JSON.parse(localStorage.getItem('user'))?.data || false,
    token: JSON.parse(localStorage.getItem('user'))?.token || false,
  }, 
  categories: [], 
  users: [],
  userToUpdate: {
    updated: false,
    originalUser: {}
  },
  titleProducts: "Alojamientos recomendados",
  bookingsDates: []
}

const ContextGlobal = createContext('')

const reducer = (state, action) => {
  switch (action.type){
    case 'APIdata':
      return  {...state, APIdata: [...state.APIdata, ...action.payload]}
    case 'deleteLodging':
      return {...state, APIdata: state.APIdata.filter(lodging => lodging.productId !== action.payload)}
    case 'setUser':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {...state, user: action.payload}
    case 'categories':
      return  {...state, categories: [...state.categories, ...action.payload]}
    case 'setCategories':
      return {...state, categories: []}
    case 'deleteCategory':
      return {...state, categories: state.categories.filter(category => category.categoryId !== action.payload)}
    case 'logout':
      localStorage.removeItem('user')
      return {...state, user: false}
    case 'setProducts':
      return {...state, APIdata: []}
    case 'users':
      return {...state, users: [...state.users, ...action.payload]}
    case 'titleProducts':
      return {...state, titleProducts: action.payload}
    case 'userToUpdate':
      return {...state, userToUpdate: action.payload}
    case 'setBookingDates':
      return {...state, bookingsDates: action.payload}
    case 'lodgingFiltered':
      return{...state, lodgingFilteredCode: action.payload}
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
        dispatch({ type: 'APIdata', payload: [] })
      }
    } catch (error) {
      console.log('Context error:', error)
    }
  }, []);


  // Get all categories
  const getCatetoryList = useCallback(async () => {
    const res =  await fetch(GLOBAL_API.urlBase + GLOBAL_API.categoryAll, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: 'categories', payload: data})
    } else {
      console.log('Error');
    }
  }, []);

  useEffect(() =>{
    getList();
    getCatetoryList();
  },[])
  
  
  return (
    <ContextGlobal.Provider value={{state, dispatch}}>
      {children}
    </ContextGlobal.Provider>
  )
}

export default ContextProvider
// eslint-disable-next-line react-refresh/only-export-components
export const useContextGlobal = () => useContext(ContextGlobal)

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}