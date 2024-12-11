'use client'
import React, { useState } from 'react'

export const Rating:React.FC = () => {
    const [rating, setRating]=useState<number>(0);

    const addStar =()=>{
        setRating(rating<5 ? rating+1:rating);
    }

    const removeStar =()=>{
        setRating(rating>0 ? rating-1 : 0);
    }
  return (
    <div>
        <p>ratting is : {rating}</p>
        <button className='bg-green-500 rounded-lg m-2 p-2 text-white' onClick={addStar}>add Star</button>
        <button className='bg-red-500 rounded-lg m-2 p-2 text-white' onClick={removeStar}>remove Star</button>
    </div>
  )
}
