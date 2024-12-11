'use client'
import React, { useState } from 'react'

export const TestButtomClick:React.FC = () => {
    const [addItem, setAddItem]=useState<number>(0);
    const addClick =()=>{
        setAddItem(addItem + 1);
    }
  return (
    <div>
        <p>Count is: {addItem}</p>
        <button className='bg-green-500 rounded-lg m-2 p-2 text-white' onClick={addClick}>Add Count</button>
    </div>
    
  )
}
