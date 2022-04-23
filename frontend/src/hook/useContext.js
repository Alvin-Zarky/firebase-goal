import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useContextHook= () =>{
  const context= useContext(AuthContext)
  if(!context){
    throw new Error('Context Should be in the context provider...!')
  }
  return context;
}