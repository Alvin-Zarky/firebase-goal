import React, {useState, useEffect} from 'react';
import MainNavbar from '../../components/main-navbar';
import { useRegister } from '../../hook/useRegister';
import {BiLogIn} from "react-icons/bi";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function Register() {

  const [frmData, setFrmData] = useState({
    name:'',
    email:'',
    password:'',
    cfPassword:''
  })
  const {name, email, password, cfPassword} = frmData
  const {signUp, isPending, isError, isSuccess} = useRegister()
  const history= useHistory()

  const onChange= (e) =>{
    setFrmData((prevState) =>{
      return{
        ...prevState,
        [e.target.name] : e.target.value
      }
    })
  }

  useEffect(() =>{
    if(isSuccess){
      history.push('/')
    }
  }, [isSuccess, history])

  const submitForm = (e) =>{
    e.preventDefault()

    if(password !== cfPassword || cfPassword !== password){
      toast.error('Confirm Password does not match...!')
      return
    }
    signUp(name, email, password)
  }

  return (
    <>
      <MainNavbar />
      <div className="overview-page">
        <div className="title-page">
          <span><BiLogIn /> Register</span>
        </div>
        <div className="detail">
          <p>Register and start setting goals</p>
        </div>
        <form onSubmit={submitForm}>
          <div>
            <input type="text" name="name" id="name" value={name} onChange={onChange} placeholder='Enter your name' required />
          </div>
          <div>
            <input type="email" name="email" id="email" value={email} onChange={onChange} placeholder='Enter your email' required />
          </div>
          <div>
            <input type="password" name="password" id="password" value={password} onChange={onChange} placeholder='Enter your password' required />
          </div>
          <div>
            <input type="password" name="cfPassword" id="cfPassword" value={cfPassword} onChange={onChange} placeholder='Confirm your password' required  />
          </div>
          {isPending ? <button>Submiting...</button> : <button>Submit</button>}
        </form>
        {isError && (
          <div className="err-box-msg">
            <span>{isError}</span>
          </div>
        )}
      </div>
    </>
  );
}
