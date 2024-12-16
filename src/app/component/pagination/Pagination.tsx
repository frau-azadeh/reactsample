import { PaginationProps } from '@/types/postTypes'
import React from 'react'

export const Pagination:React.FC<PaginationProps> = ({
    totalPosts,
    currentPage,
    paginate,
    postsPerPage,

}) => {

  return (
    <div>Pagination</div>
  )
}
