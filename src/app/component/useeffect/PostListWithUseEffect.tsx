'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Post {
    id: number;
    title: string;
    body: string;
}
export const PostListWithUseEffect: React.FC = () => {
    const [posts, setPosts] = useState <Post[]> ([]);
    const [loading, setLoading] = useState <boolean> (true);
    const [error, setError] = useState <string | null > (null);

    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true);
            setError(null);
       
            try{
                const response = await axios.get <Post[]>("https://jsonplaceholder.typicode.com/posts")
                setPosts(response.data);
            }
            catch (err){
                if (err instanceof Error){
                    setError(err.message);
                }
            
            else {
                setError ("خطا ناشناخته")
    
            }
        }
            finally{
                setLoading(false);
            }
    };

    fetchData(); 
    },[]);

    if (loading) return <p>بارگذاری داده</p>
    if (error) return <p>نمایش خطا :{error}</p>
  return (
    <div>
        <h4>PostListWithUseEffect</h4>
        <ul>
            {posts.map((post, index)=>(
                <li key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
