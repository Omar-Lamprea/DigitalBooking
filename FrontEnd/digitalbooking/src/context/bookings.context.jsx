import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { useContextGlobal } from "./global.context";

const ContextBookings = createContext('')

const reducer = (state, action) => {
  switch (action.type){
    case 'userData':
      return {...state, user: action.payload}
    case 'setCheckIn':
      return {...state, checkIn: action.payload}
    case 'setCheckOut':
      return {...state, checkOut: action.payload}
    default:
        throw new Error('action type error')
  }
}

const ContextProviderBookings = ({ children }) => {
  const {state} = useContextGlobal()
  const userData =  state.user.data
  const initialState = {
    checkIn: state?.bookingsDates[0] || '',
    checkOut: state?.bookingsDates[1] || '',
    product: '',
    user:{
      name: userData?.name,
      lastName: userData?.lastName,
      comments: '',
      email: userData?.email,
      phoneNumber: ''
    },
  }
  const [stateBooking, dispatchBooking] = useReducer(reducer, initialState)

  useEffect(()=>{},[])
  
  return (
    <ContextBookings.Provider value={{stateBooking, dispatchBooking}}>
      {children}
    </ContextBookings.Provider>
  )
}

export default ContextProviderBookings
// eslint-disable-next-line react-refresh/only-export-components
export const useContextBookings = () => useContext(ContextBookings)

ContextProviderBookings.propTypes = {
  children: PropTypes.node.isRequired,
}