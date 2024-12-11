'use client'
import React, { useState } from 'react'

export const CartCounter:React.FC = () => {
    const[count, setCount]=useState<number>(0);

    const addCart = ()=>{
        setCount(count+1);
    }
    const removeCart = ()=>{
        setCount(count>0 ? count-1 : 0);
    }
    const resetCart =()=>{
        setCount(0);
    }
  return (
    <div className="flex  justify-center items-center h-screen bg-gray-100">
        <div className='bg-blue-300 rounded-lg flex flex-col space-y-4 md:space-x-4 md-space-y-4 md:flex-row md:items-center m-4 p-4'>
            <h2 className='text-xl'>Cart Counter: {count}</h2>
            <div className='flex flex-col md:flex-row'>
                <button className='text-white  rounded-lg m-2 p-2 bg-green-500 ' onClick={addCart}>Add Product</button>
                <button className='text-white rounded-lg m-2 p-2 bg-red-500' onClick={removeCart}>Remove Product</button>
                <button className='text-white rounded-lg m-2 p-2 bg-blue-500' onClick={resetCart}>Reset Product</button>
            </div>
           </div>
    </div>
    
  )
}
