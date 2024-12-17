import { Photo } from "@/types/photoTypes";
import axios from "axios";

const BAS_URL = "https://jsonplaceholder.typicode.com/photos"

export const getPhotos = async () : Promise<Photo[]> =>{
    const response = await axios.get<Photo[]>(BAS_URL);
    return response.data;
}