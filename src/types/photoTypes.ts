export interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface PhotoCardProps {
    photo: Photo;
}