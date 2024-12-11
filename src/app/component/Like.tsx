'use client'
import React, { useState } from 'react'

export const Like: React.FC = () => {
  const[like, setLike]=useState<number>(0);
  const[dislike, setDisLike]=useState<number>(0);

    const counterLike =()=>{
        setLike(like+1);
    }

    const counterDisLike=()=>{
        setDisLike(dislike+1);
    }
    return (
    <div>
        <p>like : {like}| dislike : {dislike}</p>
        <button className='bg-green-500 rounded-lg m-2 p-2' onClick={counterLike} >like</button>
        <button className='bg-red-500 rounded-lg m-2 p-2' onClick={counterDisLike} >dislike</button>
    </div>
  )
}
