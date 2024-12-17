import { PostsPerPageSelectorProps } from '@/types/postTypes'
import React from 'react'

export const PostsPerPageSelector:React.FC <PostsPerPageSelectorProps> = ({
    postsPerPage,
    setPostsPerPage,
}) => {
  return (
    <div className='mb-6 flex items-center justify-between'>
        <label htmlFor='postsPerPage' className='text-gray-700'>
            تعداد پست در هر صفحه : 
        </label>
        <select
            id="postsPerPage"
            value={postsPerPage}
            onChange={(e) => setPostsPerPage(Number(e.target.value))}
        >
         <option value={5}>5</option>   
         <option value={10}>10</option>   
         <option value={20}>20</option>   
        </select>
    </div>
  )
}
