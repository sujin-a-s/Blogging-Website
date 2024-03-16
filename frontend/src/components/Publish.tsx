import React, { ChangeEvent } from 'react'
import Appbar from './Appbar'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Publish = () => {
    const[title,setTitle] = useState("")
    const[content,setContent] = useState("")
    const navigate = useNavigate()
  return (
    <div>
        <Appbar/>
        <div className='flex flex-col justify-center items-center'>
            <textarea onChange={(e)=>{setTitle(e.target.value)}} className="block pt-5 mt-20 p-2.5 w-5/6 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 -600 " placeholder="title"></textarea>
        </div>
        <div className='flex flex-col justify-center items-center mt-5'>
            <div  className='w-5/6 '><TextEditor onChange={(e)=>{setContent(e.target.value)}}/></div>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <button onClick={async()=>{
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
                },{
                    headers : {
                        Authorization : localStorage.getItem("token")
                    }
                })
                navigate(`/blog/${response.data.id}`)
            }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Publish post
            </button>
        </div>
    </div>
  )
}

export default Publish


function TextEditor ({onChange} : {onChange : (e: ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return (
        
    <form>
    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600 w-full">
        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800 w-full">
            <label  className="sr-only">Publish post</label>
            <textarea onChange={onChange} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} rows={8} className="focus:outline-none w-full whitespace-pre-wrap px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write an article..." required />
        </div>
        </div>
    </div>

    </form>


    )
}