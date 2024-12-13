'use client'
import React, { useState } from 'react';

export const ProductFilter: React.FC = () => {
    const products = [
        { name: 'Laptop', category: 'Electronics' },
        { name: 'T-Shirt', category: 'Clothing' },
        { name: 'Mobile', category: 'Electronics' },
        { name: 'Jeans', category: 'Clothing' },
    ];

    const [filter, setFilter] = useState<string>('All');

    const filteredProducts = filter === 'All'
        ? products 
        : products.filter((product) => product.category === filter);

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">Product Filter</h1>
            <div className="mb-4 space-x-2">
                <button
                    onClick={(e) => setFilter('All')}
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                    All
                </button>
                <button
                    onClick={(e) => setFilter('Electronics')}
                    className="bg-green-500 text-white px-3 py-2 rounded"
                >
                    Electronics
                </button>
                <button
                    onClick={(e) => setFilter('Clothing')}
                    className="bg-yellow-500 text-white px-3 py-2 rounded"
                >
                    Clothing
                </button>
            </div>
            <ul className="list-disc pl-5">
                {filteredProducts.map((product, index) => (
                    <li key={index} className="py-1">
                        {product.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
