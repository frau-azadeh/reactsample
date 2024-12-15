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
  
  const indexOfLastPage = currentPage * postPerPage;
  const indexOFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts.slice(indexOFirstPage, indexOfLastPage);

  const pagininate = (pageNumber : number)=>{
    setCurrentPage(pageNumber);
  }

  const handlePostPerPageChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setPostPerPage(Number(e.target.value));
    setCurrentPage(1);
  }

  if(loading) return <p>بارگذاری پست</p>
  if(error) return <p>نمایش خطا : {error}</p>
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h5 className='text-2xl font-bold text-center text-gray-800 mb-6'>صفحه بندی</h5>
      <div className='mb-6 flex items-center justify-between'>
        <label htmlFor="postPerPage" className="text-gray-700">تعداد پستها در هر صفحه : </label>
        <select
          id="postPerPage"
          value={postPerPage}
          onChange={handlePostPerPageChange}
          className='border border-gray-300 rounded-lg p-2'
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

    </div>
  )
}
