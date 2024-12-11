'use client'
import React, { useState } from 'react'

export const PageViews:React.FC = () => {
    const [view, setView]=useState<number>(0);

    const incrementView = () =>{
        setView(view+1);
    }
  return (
    <div>
        <p>Page View : {view}</p>
        <button onClick={incrementView} className='bg-blue-500 text-white rounded-lg m-2 p-2'>view page</button>
    </div>
  )
}
