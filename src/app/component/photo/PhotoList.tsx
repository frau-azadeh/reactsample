'use client'
import { useFetchPhotos} from '@/app/hooks/useFetchPhotos'
import React from 'react'
import { PhotoCard } from './PhotoCard';

export const PhotoList : React.FC = () => {
    const { photos, loading, error } = useFetchPhotos();

    if (loading) return <p>در خال بارگذاری</p>
    if (error) return <p>{error}</p>
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {photos.map((photo, index)=>(
            <PhotoCard key={index} photo={photo}/>
        ))}
    </div>
  )
}
