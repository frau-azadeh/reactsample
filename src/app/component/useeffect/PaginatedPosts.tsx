'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Post {
  id:number;
  title: string;
  body: string;
}

export const PaginatedPosts:React.FC = () => {
  const [posts, setPosts] = useState <Post[]> ([]);
  const [loading, setLoading] = useState <boolean> (true);
  const [error, setError] = useState <string | null> (null);
  const [currentPage, setCurrentPage] = useState <number> (1);
  const [postPerPage, setPostPerPage] = useState <number> (10)

  useEffect (()=>{
    const fetchData = async () =>{
      setLoading(true);
      setError(null);
    try{
     const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
     setPosts(response.data)
    }
    catch(err){
      if(err instanceof Error ){
        setError(err.message);
      }else{
        setError("خطای ناشناخته");
      }
    }
    finally{
      setLoading(false);
    }
    }
    fetchData();
  },[]);
  
  return (
    <div>PaginatedPosts</div>
  )
}
