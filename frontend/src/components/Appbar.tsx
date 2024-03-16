
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'

const Appbar = () => {
  return (
    <div className='flex justify-between m-1 mx-2 p-2 border-b border-zinc-400'>
      <Link to="/blogs">
        <div className='flex flex-col justify-center cursor-pointer'>Medium</div>
      </Link>
      <div>
        <Link to="/publish" >
          <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
        </Link>
        <Avatar authorName='Sujin' size="big"/>
      </div>
    </div>
  )
}

export default Appbar