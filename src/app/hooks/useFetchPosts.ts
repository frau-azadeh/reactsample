'use client'
import { UseFetchPostsReturn, Post } from '@/types/postTypes'
import axios from 'axios';
import { useEffect, useState } from 'react'

export const useFetchPosts = () : UseFetchPostsReturn  => {
  const [posts, setPosts] = useState <Post[]> ([]);
  const [loading, setLoading] = useState <boolean> (true);
  const [error, setError] = useState <string | null> (null);

useEffect(() =>{
    const fetchData = async () =>{
        setLoading(true);
        setError(null);
        try{
            const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
            setPosts(response.data);
        }
        catch(err){
            if(axios.isAxiosError(err)){
                setError(err.message||"حطا");
            }
            else{
                setError("خطای ناشناخته");
            }
        }finally{
            setLoading(false);
        }
    };
    fetchData();
},[]);
return{posts, loading, error};
}
