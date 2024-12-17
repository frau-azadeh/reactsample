import { useEffect, useState } from "react";
import { Photo } from "@/types/photoTypes";
import { getPhotos } from "@/api/photoApi";
import { fileURLToPath } from "url";

export const useFetchPosts = () =>{
    const [photos, setPhotos] = useState <Photo[]>([]);
    const [loading, setLoading] = useState <boolean> (true);
    const [error, setError] =useState <string | null> (null);

    useEffect(()=>{
        const fetchData = async () =>{
            setLoading (true);
            setError (null);

            try{
                const data = await getPhotos();
                setPhotos (data.slice(0, 12));
            }
            catch (err){
                if(err instanceof Error){
                    setError(err.message||"خطا در دریافت تصویر");
                }
                else{
                    setError("خطا دارد");
                }
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);
    return{photos, loading, error};
}