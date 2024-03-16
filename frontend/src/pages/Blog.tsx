import React from 'react'
import { useBlog } from '../hooks/useBlogs'
import FullBlog from '../components/FullBlog'
import { useParams } from 'react-router-dom'
import Appbar from '../components/Appbar'
import Spinner from '../components/Spinner'



const Blog = () => {
  const{id} = useParams()

  const {loading,blog} = useBlog({
    id : id || ""
  })

  if(loading){
    return (
      <>
      <Appbar/>
      <div className='flex flex-col justify-center items-center mt-[18%]'>
          <Spinner/>
      </div>
      </>
    )
  }

  return blog ? (
    <div>
        <FullBlog blog={blog}/>
    </div>
  ): (
    <div>
      Blog not found
    </div>
  )
}

export default Blog