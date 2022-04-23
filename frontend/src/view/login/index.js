import React, {useState, useEffect} from 'react';
import MainNavbar from '../../components/main-navbar';
import {BiLogIn} from "react-icons/bi";
import { useHistory } from 'react-router-dom';
import { useLogIn } from '../../hook/useLogin';
import './login.scss';

export default function Login() {

  const [frmData, setFrmData] = useState({
    email:'',
    password:''
  })
  const {email, password} = frmData
  const history= useHistory()
  const {logIn, isSuccess, isError, isPending} = useLogIn()

  const onChange= (e) =>{
    setFrmData((prevState) =>{
      return{
        ...prevState,
        [e.target.name] : e.target.value
      }
    })
  }

  useEffect(() => {
    if(isSuccess){
      history.push('/')
    }
  }, [isSuccess, history])

  const onLogIn = (e) =>{
    e.preventDefault()

    logIn(email, password)
  }

  return (
    <>
      <MainNavbar />
      <div className="overview-page">
        <div className="title-page">
          <span><BiLogIn /> Login</span>
        </div>
        <div className="detail">
          <p>Login and start setting goals</p>
        </div>
        <form onSubmit={onLogIn}>
          <div>
            <input type="email" name="email" id="email" value={email} onChange={onChange} placeholder='Enter your email' required />
          </div>
          <div>
            <input type="password" name="password" id="password" value={password} onChange={onChange} placeholder='Enter your password' required />
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
