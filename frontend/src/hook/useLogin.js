import {useState, useEffect} from "react";
import {firestore, auth} from "../config/firebase";
import {useContextHook} from "../hook/useContext";
import * as Types from "../constant/action-type";

export const useLogIn = () =>{

  const [isPending, setPending] = useState(false)
  const [isError, setError] = useState(null)
  const [isSuccess, setSuccess]= useState(false)
  const [isStateChange, setStateChange] = useState(false)
  const {dispatch} = useContextHook()

  const logIn = async (email, password) =>{
    setPending(true)
    setError(null)
    setSuccess(false)
    try{
      const res= await auth.signInWithEmailAndPassword(email, password)
      if(!res){
        throw new Error('Not Authorize...!')
      }
      dispatch({ type: Types.LOG_IN, payload: res.user })

      await firestore.collection('user').doc(res.user.uid).update({ isOnline:true })
      if(!isStateChange){
        setSuccess(true)
        setPending(false)
        setError(null)
      }
    }catch(err){
      if(!isStateChange){
        setPending(false)
        setSuccess(false)
        setError(err.message)
      }
    }
  }

  useEffect(() =>{
    return () => setStateChange(true)
  }, [])

  return { isPending, isError, isSuccess, logIn }
}