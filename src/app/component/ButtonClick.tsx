'use client';

import React, { useState } from 'react';

export const ButtonClick: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count > 0 ? count - 1 : 0);
  };

  return (
    <div>
      <h4>Count: {count}</h4>
      <button className="bg-blue-500 text-white rounded-lg m-2 p-2" onClick={increaseCount}>
        Increase
      </button>
      <button className="bg-yellow-500 text-white rounded-lg m-2 p-2" onClick={decreaseCount}>
        Decrease
      </button>
    </div>
  );
};
