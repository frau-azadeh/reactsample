'use client'
import React, { useState } from 'react'

export const Categories:React.FC = () => {
    const[expandCategory, setExpandCategory]= useState<number| null>(null);
    
    const toggleCategory =(index:number)=>{
        setExpandCategory(expandCategory === index ? null:index);
    };

    const categories =[
        {name:'Electeronics', items:['Laptop', 'Mobile', 'Headphone']},
        { name: 'Clothing', items: ['T-Shirt', 'Jeans', 'Jacket'] },
        { name: 'Books', items: ['Fiction', 'Biography', 'Science'] },
    ];


    return (
    <div className='p-4 bg-gray-100'>
        <h2 className='text-white text-lg'>List of Categories</h2>
            {categories.map((category, index)=>(
                <div
                    className='mb-2 border border-gray-950 rounded-lg overflow-hidden'
                    key={index}
                >
                    <button
                        className='w-full bg-blue-300 text-white p-2 text-left'
                        onClick={(e)=>toggleCategory(index)}
                    >
                        {category.name}
                    </button>
                    {expandCategory === index &&(
                        <ul className='p-2 bg-blue-200'>
                            {category.items?.map((item, id)=>(
                                <li key={id} className='p-1'>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
    </div>
  )
}
