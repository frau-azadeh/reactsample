import { UserCardProps } from '@/types/userTypes'
import React from 'react'

export const UserCard: React.FC<UserCardProps> = ({user}) => {

  return (
    <div className='p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition'>
        <h2 className='text-lg text-blue-500'>{user.name}</h2>
        <p className='text-gray-600'>{user.email}</p>
        <p className='text-gray-600'>{user.phone}</p>
        <p className='text-gray-600'>{user.website}</p>
    </div>
  )
}
