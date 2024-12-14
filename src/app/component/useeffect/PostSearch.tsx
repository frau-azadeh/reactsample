'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

// تعریف نوع برای پست‌ها
interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsSearch: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // ذخیره لیست پست‌ها
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // پست‌های فیلتر شده
  const [loading, setLoading] = useState<boolean>(true); // وضعیت بارگذاری
  const [error, setError] = useState<string | null>(null); // پیام خطا
  const [searchQuery, setSearchQuery] = useState<string>(""); // متن جستجو

  // واکشی داده‌ها از API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data);
        setFilteredPosts(response.data); // مقداردهی اولیه فیلتر
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

  // مدیریت تغییرات جستجو
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPosts(
      posts.filter((post) => post.title.toLowerCase().includes(query)) // فیلتر پست‌ها بر اساس جستجو
    );
  };

  // مدیریت بارگذاری مجدد
  const reloadPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data);
      setFilteredPosts(response.data);
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

  // نمایش بارگذاری یا خطا
  if (loading) return <p className="text-center text-blue-600 text-lg font-semibold">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-600 text-lg font-semibold">خطا: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">جستجوی پست‌ها</h1>

      {/* بخش جستجو */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="عنوان را جستجو کنید..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={reloadPosts}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          بارگذاری مجدد
        </button>
      </div>

      {/* نمایش پست‌ها */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
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

export default PostsSearch;
