'use client'
import React, { useState } from 'react'

type Product = {
    id: number;
    name: string;
}
const products: Product[]=[
    {id: 1, name :'laptop'},
    {id: 2, name :'pen'},
    {id: 3, name :'mobile'},
    {id: 4, name :'watch'},
]
export const ShoppingCart:React.FC = () => {
    const[cart, setCart]=useState<Product[]>([]);
    const addToCart = (product:Product)=>{
        setCart([...cart, product]);
    };
  return (
    <div>
           <div>لیست محصول</div>
            <ul>
                {products.map((product)=>(
                    <li key={product.id}>
                        {product.name}
                        <button className='bg-green-300 rounded-lg m-2 p-3 ' onClick={()=>addToCart(product)}>افزودن به سبد</button>
                    </li>
                ))}
            </ul>
            <h4>سبد خرید</h4>
            <p>تعداد اقلام سبد خرید:{cart.length}</p>
            <ul>
                {cart.map((item, index)=>(
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
    </div>
  )
}
