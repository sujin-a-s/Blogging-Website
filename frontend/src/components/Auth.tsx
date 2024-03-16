import  { ChangeEvent, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { SignupInput } from '@sujin_a_s/medium-common'
import axios from 'axios'
import { BACKEND_URL } from '../config';

interface Type {
  type: "signup" | "signin";
}
const Auth = ({type} : Type) => {

  const navigate = useNavigate()
  const[postInputs,setPostInputs] = useState<SignupInput>({
    email : "",
    password : "",
    name : ""
  })


  async function handleButtonClick (){

    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
      const jwt = response.data.jwt
      localStorage.setItem("token",`Bearer ${jwt}`)
      navigate("/blogs")
    }catch(e){
      alert("Error while signing up")
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='font-extrabold text-4xl '>Create Account</div>
       
        <div className='text-neutral-400 '>{type === "signup"?"Alread have an account?":"Not registered yet?"}
        <Link className="px-2 underline" to = {type === "signup"?"/signin":"/signup"}>{type === "signup"?"Signin":"Signup"}</Link>
        </div>

        <div className=' md:w-96 p-4 '>
          {type=="signup"?<InputField  label="Name"  placeholder="Sujin" onChange={(e)=>{
            setPostInputs({
              ...postInputs,
              name : e.target.value
          })}}/>:null}

          <InputField  label="Email"  placeholder="sujin@gmail.com" onChange={(e)=>{
            setPostInputs({
              ...postInputs,
              email : e.target.value
          })}}/>

          <InputField  label="Password" type="password" placeholder="12345" onChange={(e)=>{
            setPostInputs({
              ...postInputs,
              password : e.target.value
          })}}/>
        </div>

        <div className='pt-5'>
          <button onClick={handleButtonClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-lg px-10 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up":"Sign In"}</button>
        </div>
        
    </div>
  )
}




interface labelInputFieldType {
  label : string
  placeholder : string
  onChange : (e : ChangeEvent<HTMLInputElement>)=> void
  type?: string
}
const InputField = ({label,placeholder,onChange,type} : labelInputFieldType) => {
  return (
    <div className='p-2'>
      <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">{label}</label>
      <input onChange={onChange} type={type || "text"} id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
  )
}


export default Auth