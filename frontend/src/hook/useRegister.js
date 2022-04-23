import {useState, useEffect} from "react";
import {firestore, auth, timestamps} from "../config/firebase";
import {useContextHook} from "../hook/useContext";
import * as Types from "../constant/action-type";
import bcrypt from "bcryptjs";

export const useRegister= () => {
  
  const [isPending, setPending] = useState(false)
  const [isError, setError] = useState(null)
  const [isSuccess, setSuccess]= useState(false)
  const [isStateChange, setStateChange] = useState(false)
  const {dispatch} = useContextHook()

  const signUp=async(name, email, password) =>{
    setError(null)
    setPending(true)
    setSuccess(false)
    try{
      const res= await auth.createUserWithEmailAndPassword(email, password)
      if(!res){
        throw new Error('Not Authorization')
      }
      await res.user.updateProfile({ displayName: name })
      dispatch({ type: Types.REGISTER, payload: res.user })

      let hash= await bcrypt.genSalt(10)
      let hashPassword= await bcrypt.hash(password, hash)
      const timestamp= timestamps.fromDate(new Date())
      await firestore.collection('user').doc(res.user.uid).set({
        id: res.user.uid,
        name,
        email,
        password:hashPassword,
        createdAt: timestamp,
        isOnline:true,
        isAdmin:false
      })

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

  return { isPending, isError,isSuccess, signUp }
}
