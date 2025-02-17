import React, { useState } from 'react'

const Login = () => {
  const [state,setState]= useState("Login");

  const [formData,setFormData]= useState({
    username:"",
    password:"",
    email:"",
  })
  const changeHandler =  (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
 }
  const login = async ()=>{
     console.log("Login function executed",formData);
     let responseData;
    await fetch("http://localhost:4000/login",{
      method:'POST',
      headers:{
        Accept:'application/formData',
        'content-type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors);
    }
  }
  const signup = async ()=>{
    console.log("Signup function executed",formData)
    let responseData;
    await fetch("http://localhost:4000/signup",{
      method:'POST',
      headers:{
        Accept:'application/formData',
        'content-type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors);
    }
  }
  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div  className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
        <h3  className="h3">{state}</h3>
        <div  className=" flex flex-col gap-4 mt-7">
          { state==="Sign Up"?<input name ="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name"  className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl" />:""}
          <input name="email" value={formData.email} onChange={changeHandler} type="E-mail" placeholder="E-mail Address"  className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"/>
          <input name="password" value={formData.password} onChange={changeHandler}type="Password" placeholder="Your Password"  className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} className="btn_dark_rounded  my-5  w-full !rounded-md">continue</button>
        {state==="Sign Up"? <p className="text-black font-bold">Already Have an account? <span onClick={()=>{setState("Login") }} className="text-secondary underline cursor-pointer">Login here</span></p> : <p className="text-black font-bold">Create an account? <span onClick={()=>{setState("Sign Up") }} className="text-secondary underline cursor-pointer">Click here</span></p>}
        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to terms of use $ privacy policy</p>
        </div>
      </div>
    </section>
  )
}

export default Login
