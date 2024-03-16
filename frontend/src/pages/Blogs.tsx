import React from 'react'
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks/useBlogs';
import BlogSkeleton from '../components/BlogSkeleton';

const Blogs = () => {
  const {loading,blogs} = useBlogs();

  if (loading){
    return (
      <>
      <Appbar/>
      <div className='w-full flex flex-col justify-center items-center'>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
      </div>
      </>
    )
  }
  
  return (
    <div>
      <Appbar/>
      <div >
          <div className='flex flex-col justify-center items-center'>

            {blogs.map(blog =><BlogCard 
                              id={blog.id}
                              title={blog.title}
                              content={blog.content}
                              authorName={blog.author.name || "Anonymous"}
                              publishedDate="2nd Feb 2024"/>)}

          </div>

      </div>
    </div>
  )
}

export default Blogs