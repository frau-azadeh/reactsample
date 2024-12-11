'use client'
import React, { useState } from 'react'

export const ChangeBackGround:React.FC = () => {
    const [bgcolor,setBgcolor]=useState<string>('white');

    const toRed = () =>{
        setBgcolor('red');
    }

    const toBlue = ()=>{
        setBgcolor('Blue');
    }
  return (
    <div style={{background:bgcolor}}>
        <p>color is : {bgcolor}</p>
        <button className='bg-red-500 rounded-lg text-white m-2 p-2' onClick={toRed}>red</button>
        <button className='bg-blue-500 rounded-lg text-white m-2 p-2' onClick={toBlue}>blue</button>
    </div>
  )
}
