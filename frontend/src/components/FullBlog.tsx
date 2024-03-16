import React from 'react'
import Appbar from './Appbar'
import { Blog } from '../hooks/useBlogs'
import { Avatar } from './BlogCard'

const FullBlog = ({blog} : {blog : Blog}) => {
  return (
    <div>
        <Appbar/>
        <div className='flex justify-center'>
            <div className='grid grid-cols-12 px-10 pt-16 w-5/6'>
                <div className='col-span-8 '>
                    <div className='font-bold text-3xl'>{blog.title}</div>
                    <div className='font-thin pt-1 text-slate-500'>12th feb 2024</div>
                    <div className='font-semibold pt-2'>{blog.content}</div>
                </div>
                <div className='col-span-4 '>
                    <div className='font-bold text-xl'>Author</div>
                    <div className='flex'>
                    <div className='pt-1'>
                        <Avatar authorName={blog.author.name || "Anonymous"} size="big"/>
                    </div>
                    <div>
                        <div className='pl-3 pt-1 font-semibold'>{blog.author.name}</div>
                        <div className='pt-2 text-gray-500 pl-3'>this is hte description of the author who is good at catching the attention of his viewers</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default FullBlog