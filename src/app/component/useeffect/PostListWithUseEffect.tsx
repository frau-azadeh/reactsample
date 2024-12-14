'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";


interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsListWithUseEffect: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); 
      setError(null);

      try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data); 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); 
        } else {
          setError("خطای ناشناخته");
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts(); 
  }, []); 
  if (loading)
    return <p className="text-center text-lg font-semibold text-blue-600">در حال بارگذاری...</p>;
  if (error)
    return <p className="text-center text-lg font-semibold text-red-500">خطا: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">لیست پست‌ها</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsListWithUseEffect;
