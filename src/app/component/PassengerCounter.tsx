import React, { useState } from 'react'

type PassengerData = [
    string,
    number,
    React.Dispatch<React.SetStateAction<number>>
];

export const PassengerCounter:React.FC = () => {
    const [adults, setAdults]=useState<number>(1);
    const [children, setChildren]=useState<number>(0);
    const [infants, setInfants]=useState<number>(0);

    const increment = (setter:React.Dispatch<React.SetStateAction<number>>) => {
        setter((prev)=> prev +1);
    };
    
    const decrement = (setter:React.Dispatch<React.SetStateAction<number>>) => {
        setter((prev)=>(prev>0 ? prev-1 : 0));
    };

    const data:PassengerData[] = [
        ['Adults', adults, setAdults],
        ['Children', children, setChildren],
        ['Infants', infants, setInfants],
    ];

  return (
    <div className='p-4 bg-gray-100 max-w-md mx-auto rounded-lg'>
        <h4 className='text-2xl mb-4 text-white'>Passenger Count</h4>
        <div className='flex flex-col space-y-4'>
            {data.map(([lable, count, setter], index)=>(
                <div key={index} className="flex justify-between items-center">
                    <span className='text-lg'>{lable}</span>
                    <div className='flex items-center'>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded-l"
                            onClick={() => decrement(setter)}
                            >
                                -
                        </button>
                        <span className="px-4">{count}</span>
                        <button
                            className="bg-green-500 text-white px-2 py-1 rounded-r"
                            onClick={() => increment(setter)}
                        >
                                +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
