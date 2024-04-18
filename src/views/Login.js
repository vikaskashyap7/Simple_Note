import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signup from "./SignUp"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { toast } from "react-toastify";

function Login() {
  
  // const [email, setEmail] = useState('');

  // const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [values,setValues] = useState({
    email:"",
    password:"",
  });
  const handleSubmited = async(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,values.email,values.password)
    .then(async(res)=>{
      // console.log(res)
      navigate("/home");
      toast.success(`Login successfully`);
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }
  return (
    <div className='login'> 
      <div>
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input typeof="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={(e)=> setValues((prev)=>( {...prev,email:e.target.value}))}/>
        </div>
      <div className=' mt-4'>
        <label htmlFor="inputPassword5" className="form-label ">Password</label>
        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"  onChange={(e)=> setValues((prev)=>( {...prev,password:e.target.value}))}/>
      </div>
      <div className='  mt-4 d-grid gap-3'>
        <button className="btn btn-primary" typeof="submit" onClick={handleSubmited}>Login</button>
        <div className=''>create an account <Link to={"/signup"}>SignUp</Link></div>
      
      </div>
    </div>
  )
}

export default Login