import { PaginationProps } from '@/types/postTypes'
import React from 'react'

export const Pagination:React.FC<PaginationProps> = ({
    totalPosts,
    currentPage,
    paginate,
    postsPerPage,

}) => {
const pageNumbers = [];
for(let i=1 ; i<=Math.ceil(totalPosts /postsPerPage);i++){
  pageNumbers.push(i);
}
  return (
    <div>
      <nav className='flex justify-center items-center space-x-2'>
        {pageNumbers.map((number, index)=>(
          <button
            onClick={(e)=>paginate(number)}
            key={index}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"

            }transition`}
          >{number}</button>
        ))}
      </nav>
     
    </div>
  )
}
