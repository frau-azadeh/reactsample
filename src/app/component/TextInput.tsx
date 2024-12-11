'use client'
import React, { useState } from 'react'

export const TextInput:React.FC = () => {
    const[text, setText]=useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setText(e.target.value);
    }

  return (
    <div>
        <h1>your text :{text}</h1>
        <input type='text'
            className='rounded-lg p-2 m-2 border border-gray-200'
            placeholder='type ...'
            value={text}
            onChange={handleChange}
       />
    </div>
  )
}
