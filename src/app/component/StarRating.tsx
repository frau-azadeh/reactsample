'use client'
import React, { useState } from 'react';

export const StarRating = () => {
    const [rating, setRating] = useState<number>(0);

    const handleRating = (value: number) => {
        setRating(value);
    };

    return (
        <div className='flex flex-col items-center bg-gray-100 rounded-lg m-4 p-4'>
            <h1 className='text-xl'>Rating: {rating} / 5</h1>
            <div className='flex'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`m-1 p-2 rounded-full ${star <= rating ? 'bg-yellow-400' : 'bg-gray-300'}`}
                        onClick={() => handleRating(star)}
                    >
                        ⭐
                    </button>
                ))}
            </div>
        </div>
    );
};