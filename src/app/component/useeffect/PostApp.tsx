'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

// تعریف نوع برای پست‌ها
interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsApp: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // لیست پست‌ها
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // پست انتخاب شده
  const [loading, setLoading] = useState<boolean>(false); // وضعیت بارگذاری
  const [error, setError] = useState<string | null>(null); // پیام خطا

  // واکشی لیست پست‌ها
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

  // واکشی جزئیات یک پست
  const fetchPostDetails = async (postId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setSelectedPost(response.data);
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

  // بازگشت به لیست
  const goBackToList = () => {
    setSelectedPost(null);
  };

  // نمایش بارگذاری یا خطا
  if (loading) return <p className="text-center text-blue-600 text-lg font-semibold">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-600 text-lg font-semibold">خطا: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* نمایش جزئیات پست */}
      {selectedPost ? (
        <div>
          <button
            onClick={goBackToList}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            بازگشت به لیست
          </button>
          <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>
            <p className="text-gray-700">{selectedPost.body}</p>
          </div>
        </div>
      ) : (
        /* نمایش لیست پست‌ها */
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">لیست پست‌ها</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <li
                key={post.id}
                onClick={() => fetchPostDetails(post.id)}
                className="p-4 bg-white shadow rounded-lg border border-gray-200 hover:shadow-md cursor-pointer transition"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{post.title}</h3>
                <p className="text-gray-600 truncate">{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostsApp;
