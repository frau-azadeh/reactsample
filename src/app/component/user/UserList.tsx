import { useFetchUsers } from '@/app/hooks/useFetchUsers'
import React from 'react'
import { UserCard } from './UserCard';
export const UserList:React.FC = () => {
    const {users, loading, error} = useFetchUsers();

    if (loading) return <p className='text-center text-blue-500'> در حال بارگذاری</p>;
    if (error) return <p className='text-center text-red-500'>{error}</p>;

    return (
    <div className='max-w-6xl mx-auto grid grid-col-1 sm:grid-col-2 md:grid-col-3 gap-6 p-4'>
        {users.map((user, index)=>(
            <UserCard key={index} user={user}/>
        ))}
    </div>
  )
}
