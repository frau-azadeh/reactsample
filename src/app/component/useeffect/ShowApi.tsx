'use client'
import React, { useEffect, useState } from 'react'

interface Post {
    id: number;
    title: string;
    body: string;
}

export const ShowApi:React.FC = () => {
    const [posts, setPosts] = useState <Post[]> ([]);
    const [loading, setLoading] = useState <boolean> (true);
    const [error, setError] = useState <string | null > (null);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch ("https://jsonplaceholder.typicode.com/posts");
                if(!response.ok){
                    throw new Error ("خطا دریافت کردید");
                }
                const data:Post[] = await response.json();
                setPosts(data);
            }
            catch (err:any) {
                setError (err.message || "خطا ناشناخته");
            }
            finally{
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    if (loading) return <p>در حال بارگذاری ... </p>
    if (error) return <p>خطا :{error}</p>

  return (
    <div>
        <h4>show post message</h4>
        <ul>
            {posts.map((post, index)=>(
                <li key={index}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
