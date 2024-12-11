'use client'
import React, { useState } from 'react'

export const RemoveButton:React.FC = () => {
    const [count, setCount]=useState<number>(0);

    const buttonClickIncres = () =>{
        setCount(count + 1);
    }
    const buttonClickDecrese = () =>{
        setCount(count>0 ? count-1:0);
    }
  return (
    <div>
        <p>count is : {count}</p>
        <button className='bg-red-500 rounded-lg text-white m-2 p-2' onClick={buttonClickDecrese}>Decrese</button> 
        <button className='bg-green-500 rounded-lg text-white m-2 p-2' onClick={buttonClickIncres}>Increse</button>
    </div>
  )
}
