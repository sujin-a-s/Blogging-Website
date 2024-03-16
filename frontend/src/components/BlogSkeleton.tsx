import React from 'react'
import { Avatar } from './BlogCard'
import Appbar from './Appbar'

const BlogSkeleton = () => {
  return (
    
    <>
    <div className='border-b border-zinc-200 p-4 w-screen max-w-screen-md cursor-pointer'>
    <div className='flex space-x-4'>
         <div className="h-8 w-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className='flex flex-col justify-center font-semibold'>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        </div>
        <div className='flex flex-col justify-center font-extralight text-sm '>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        </div>
    </div>
    <div className='font-bold text-xl pt-1 text-left'>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    </div>
    <div className='pt-3'>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    </div>
    <div className='text-zinc-500 text-sm font-extralight pt-2'>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    </div>
</div>

</>


  )
}

export default BlogSkeleton