import React from 'react'
import { Link } from 'react-router-dom'

interface blogcardprops {
    authorName : string
    title : string
    content : string
    publishedDate : string
    id : number
}

const BlogCard = ({authorName,title,content,publishedDate,id}:blogcardprops) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className='border-b border-zinc-200 p-4 w-screen max-w-screen-md cursor-pointer'>
            <div className='flex space-x-4'>
                <Avatar authorName={authorName} size="small"/>
                <div className='flex flex-col justify-center font-semibold'>{authorName} </div>
                <div className='flex flex-col justify-center font-extralight text-sm '>{publishedDate}</div>
            </div>
            <div className='font-bold text-xl pt-1 text-left'>{title}</div>
            <div className='pt-3'>{content.slice(0,100)}</div>
            <div className='text-zinc-500 text-sm font-extralight pt-2'>{`${Math.ceil(content.length/100)} minutes`}</div>
        </div>
    </Link>
  )
}

interface Avatarprops {
    authorName : string
    size : string
}

export const Avatar = ({authorName,size="small"}:Avatarprops)=>{
    return(
        
    <div className={`relative ${size=="small"?"w-8 h-8":"w-10 h-10"} inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
    </div>

    )
}
export default BlogCard