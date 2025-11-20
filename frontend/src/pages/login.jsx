import {useEffect, useState} from 'react'
import Axios from 'axios';
import { Route, useNavigate } from 'react-router';
import './login.css'
import api from '../lib/axios';
import Loader from '../components/loader';




const Login = ({SetLoading,loading}) => {
    let navigate = useNavigate();
    const [user,setUser] = useState('')
    const [senha,setSenha] = useState('')
    const [loginName, setLoginName] = useState('')
    const [loginpass, setLoginpass] = useState('')
    const [errMessage,Seterrmesage] = useState(0)
    const [errMessage2,Seterrmesage2] = useState(0)
    


    //const url = 'http://localhost:5000/api/v1/products/register';
    //const urlLogin ='http://localhost:5000/api/v1/products/login';


    const userText = (e) =>{
        setUser(e.target.value)
    }


    const userSenha = (e) =>{
        setSenha(e.target.value)
    }

    const nameLogin = (e) => {
        setLoginName(e.target.value)
    }

    const passwordLogin = (e) => {
        setLoginpass(e.target.value)
    }


    const postUser = async () => {
       // const token = await Axios.post(url,{username:user,password:senha}).catch(()=>{Seterrmesage(1)})
        SetLoading(true);
        const token = await api.post('/register',{username:user,password:senha}).catch(()=>{Seterrmesage(1); SetLoading(false);})
        localStorage.setItem('token',token.data.token);
        Seterrmesage(0);
        SetLoading(false);
        window.location.reload();


        
    }

    const getLogin = async () => {
       // const token = await Axios.post(urlLogin,{username:loginName,password:loginpass}).catch(()=>{Seterrmesage2(1)});
        SetLoading(true);
        const token = await api.post('/login',{username:loginName,password:loginpass}).catch((error) => { Seterrmesage2(1); SetLoading(false); console.log(error.response.data)});
        localStorage.setItem('token',token.data.token);
        Seterrmesage2(0);
        SetLoading(false);
        window.location.reload();



    }


    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            navigate('/')
        }

    })


    const ErorrMessage = () =>{
        if (errMessage){
           return <h1 className="errorMessage">Something went wrong!</h1>
        }
    }

    const ErorrMessage2 = () =>{
        if (errMessage2){
           return <h1 className="errorMessage">Something went wrong!</h1>
        }
    }
    
    return(
          <>
          <title>Login/Register</title>
          <Loader loading={loading}/>
          <div className='lr-container'>
            <div className='regi-container'>
                <h1>Register</h1>
                <input type='text' onChange={userText} placeholder='username' id='i1'></input>
                <input type='password' onChange={userSenha} id='i2' placeholder='senha'></input>
                <input type='button' value='Registrar-se' onClick={postUser} id='i3'></input>
                <ErorrMessage/>
            </div>

            <div className='login-container'>
                <h1>Login</h1>
                <input type='text' onChange={nameLogin} placeholder='username' id='i4'/>
                <input type='password' onChange={passwordLogin} placeholder='senha' id='i5'/>
                <input type='button' onClick={getLogin} value='Login' id='i6'/>
                <ErorrMessage2/>
            </div>
          </div>
          
          
          
          
          
          </>
    )
}

export default Login