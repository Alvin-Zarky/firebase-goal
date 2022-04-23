import {createContext, useReducer, useEffect} from "react";
import { auth } from "../config/firebase";
import * as Types from "../constant/action-type";

export const AuthContext= createContext()

const contextReducer = (state, action) =>{
  switch(action.type){
    case Types.REGISTER:
      return { ...state, user: action.payload }
    case Types.LOG_IN:
      return { ...state, user: action.payload }
    case Types.LOG_OUT:
      return { ...state, user:null }
    case Types.AUTH_IS_READY:
      return {...state, user: action.payload, isAuth:true}
    default:
      return state
  }
}
const ContextProvider = ({children}) =>{
  const [state, dispatch] = useReducer(contextReducer, {
    user:null,
    theme:'red',
    language: 'en',
    isSuccess:false,
    isAuth:false
  })
  useEffect(() =>{
    const unsub= auth.onAuthStateChanged((res) =>{
      dispatch({type: Types.AUTH_IS_READY, payload: res})
      unsub()
    })
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

export default ContextProvider