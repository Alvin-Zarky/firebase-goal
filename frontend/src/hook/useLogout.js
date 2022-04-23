import {useState, useEffect} from "react";
import {firestore, auth} from "../config/firebase";
import {useContextHook} from "../hook/useContext";
import * as Types from "../constant/action-type";

export const useLogout = () =>{

  const [isPending, setPending] = useState(false)
  const [isError, setError] = useState(null)
  const [isSuccess, setSuccess]= useState(false)
  const [isStateChange, setStateChange] = useState(false)
  const {dispatch, user} = useContextHook()

  const logOut = async () =>{
    try{
      await auth.signOut()
      dispatch({ type: Types.LOG_OUT })
      await firestore.collection('user').doc(user.uid).update({isOnline:false})

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

  return {isPending, isError, isSuccess, logOut}
}