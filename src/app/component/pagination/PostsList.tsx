import { PostsListProps, Post } from '@/types/postTypes'
import React from 'react'

export const PostsList:React.FC<PostsListProps> = ({posts}) => {
  return (
    <div>
        <ul>
            {posts.map((post, index) => (
                <li key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
