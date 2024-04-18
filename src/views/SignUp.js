import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function Signup() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    name:"",
    email:"",
    password:"",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(values)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,values.email,values.password);
      // const user =auth.currentUser;
      // console.log("hbsv",user)
      if(userCredential){
        
        navigate("/");
        toast.success(`Signup successfully`);
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <div className='login'>
      <div>
        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
        <input typeof="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter your name"  onChange={(e)=> setValues((prev)=>( {...prev,name:e.target.value}))}/>
      </div> 
      <div className=' mt-4'>
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={(e)=> setValues((prev)=>( {...prev,email:e.target.value}))}/>
      </div>
      <div className=' mt-4'>
        <label htmlFor="inputPassword5" className="form-label ">Password</label>
        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"  onChange={(e)=> setValues((prev)=>( {...prev,password:e.target.value}))}/>
      </div>
      <div className='  mt-4 d-grid gap-3'>
        <button className="btn btn-primary" typeof="submit" onClick={handleSubmit}>SignUp</button>
        <div>Already signup ?<Link to={"/"}>Login</Link></div>
      </div>
    </div>
    </div>
  )
}

export default Signup