import {useState, useEffect, useReducer} from "react";
import {firestore, timestamps} from "../config/firebase";
import {useContextHook} from "../hook/useContext";
import * as Types from "../constant/action-type";

const initialState={
  document:null,
  isPending:false,
  isError:null,
  isSuccess:false,
  message:null
}

const firestoreReducer = (state, action) =>{
  switch(action.type){
    case Types.IS_PENDING:
      return { isPending:true, document:null, isError:false, isSuccess:false }
    case Types.CREATE:
      return { isPending:false, document: action.paylaod, isError:false, isSuccess:true }
    case Types.UPDATE:
      return { isPending:false, isError:false, isSuccess:true }
      case Types.DELETE:
      return {isPending: false, document:null, isError:false, isSuccess:true}
      case Types.ERROR:
      return { isPending:false, document:null, isError:action.payload, isSuccess:false, message: action.paylaod}
    default:
      return state
  }
}

export const useFirestore = (collection) =>{
  
  const [isClear, setClear] = useState(false)
  const [state, dispatch] = useReducer(firestoreReducer, initialState)
  const {user} = useContextHook()

  const dispatchIsClear = (action) =>{
    if(!isClear){
      dispatch(action)
    }
  }

  const addData = async (goal) =>{
    dispatch({ type: Types.IS_PENDING })
    try{
      const createdAt= timestamps.fromDate(new Date())
      const dataObj={
        user_id: user.uid,
        goal,
        createdAt,
        status:'new'
      }
      const res= await firestore.collection(collection).add(dataObj)
      dispatchIsClear({ type: Types.CREATE, paylaod:res })

    }catch(err){
      dispatchIsClear({ type: Types.ERROR, payload: err.message })
    }
  }

  const updateData = async (data, id) =>{
    dispatch({type:Types.IS_PENDING})
    try{
      await firestore.collection(collection).doc(id).update(data)
      dispatchIsClear({type: Types.UPDATE})
    }catch(err){
      dispatchIsClear({type: Types.ERROR, payload: err.message})
    }
  }

  const deleteData = async (id) =>{
    try{
      await firestore.collection(collection).doc(id).delete()
      dispatchIsClear({type: Types.DELETE})

    }catch(err){
      dispatchIsClear({ type: Types.ERROR, payload: err.message })
    }
  }

  useEffect(() =>{
    return () => setClear(true)
  }, [])

  return { document, state, addData, deleteData, updateData }
}