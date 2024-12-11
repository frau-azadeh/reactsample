'use client';

import React, { useState } from 'react';

type Location = {
  id: number;
  name: string;
};

const locations: Location[] = [
  { id: 1, name: 'میدان آزادی' },
  { id: 2, name: 'ونک' },
  { id: 3, name: 'نیاوران' },
  { id: 4, name: 'شریعتی' },
  { id: 5, name: 'انقلاب' },
];

export const SnapRouteSelector: React.FC = () => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);

  const handleSelectOrigin = (location: Location) => {
    setOrigin(location);
  };

  const handleSelectDestination = (location: Location) => {
    if (origin && location.id === origin.id) {
      alert('مبدا و مقصد نمی‌توانند یکسان باشند!');
      return;
    }
    setDestination(location);
  };

  return (
    <div>
      <h2>انتخاب مسیر</h2>

      <h3>مبدا:</h3>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <button
              className={`m-2 p-3 rounded-lg ${
                origin?.id === location.id ? 'bg-green-300' : 'bg-gray-200'
              }`}
              onClick={() => handleSelectOrigin(location)}
            >
              {location.name}
            </button>
          </li>
        ))}
      </ul>

      <h3>مقصد:</h3>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <button
              className={`m-2 p-3 rounded-lg ${
                destination?.id === location.id ? 'bg-blue-300' : 'bg-gray-200'
              }`}
              onClick={() => handleSelectDestination(location)}
            >
              {location.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h4>مسیر انتخاب‌شده:</h4>
        {origin && destination ? (
          <p>
            از <b>{origin.name}</b> به <b>{destination.name}</b>
          </p>
        ) : (
          <p>لطفاً مبدا و مقصد را انتخاب کنید.</p>
        )}
      </div>
    </div>
  );
};