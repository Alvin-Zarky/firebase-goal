import {useState, useEffect, useRef} from "react";
import {firestore} from "../config/firebase";

export const useCollection = (collection, _where, _orderBy) =>{
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)
  const [isSuccess, setSuccess] = useState(false)
  const [isChange, setChange] = useState(false)
  const [emptyData, setEmptyData] = useState(false)

  let where = useRef(_where).current
  let orderBy = useRef(_orderBy).current

  useEffect(() =>{
    setPending(true)
    setError(null)
    setDocument(null)
    setEmptyData(false)

    try{
      let ref= firestore.collection(collection)

      if(where){
        ref= ref.where(...where)
      }
      if(orderBy){
        ref= ref.orderBy(...orderBy)
      }

      ref.onSnapshot(snapshot =>{
        if(!snapshot.empty){
          if(snapshot.docs){
            let data = []
            snapshot.docs.forEach((val) =>{
              data.push({
                ...val.data(),
                id: val.id
              })
            })
            if(!isChange){
              setDocument(data)
              setSuccess(true)
              setPending(false)
              setError(null)
              setEmptyData(false)
            }
          }
        }else{
          if(!isChange){
            setEmptyData(true)
            setDocument(null)
            setPending(false)
          }
        }
      })
    }catch(err){
       if(!isChange){
        setError(err.message)
        setDocument(null)
        setSuccess(false) 
        setEmptyData(false)
        setPending(false)
       }
    }

    return () => setChange(true)
  }, [collection, where, orderBy, isChange])
  
  return {isPending, error, document, isSuccess, emptyData}
}