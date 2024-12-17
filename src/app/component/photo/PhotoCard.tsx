import { PhotoCardProps } from '@/types/photoTypes'
import React from 'react'

export const PhotoCard: React.FC <PhotoCardProps> = ({photo}) => {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition bg-white p-4">
        <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            className='w-full h-32 object-cover rounded mb-2'
        />
      <h3 className="text-sm font-semibold text-gray-700">{photo.title}</h3>
      </div>
  )
}
