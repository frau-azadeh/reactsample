'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

// تعریف نوع برای پست‌ها
interface Post {
  id: number;
  title: string;
  body: string;
}

const PaginatedPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // لیست پست‌ها
  const [currentPage, setCurrentPage] = useState<number>(1); // صفحه فعلی
  const [postsPerPage, setPostsPerPage] = useState<number>(10); // تعداد پست‌ها در هر صفحه
  const [loading, setLoading] = useState<boolean>(true); // وضعیت بارگذاری
  const [error, setError] = useState<string | null>(null); // پیام خطا

  // واکشی داده‌ها از API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
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

  // محاسبه ایندکس‌های شروع و پایان برای هر صفحه
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // پست‌های صفحه فعلی

  // تغییر صفحه
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // مدیریت تعداد پست‌ها در هر صفحه
  const handlePostsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number(e.target.value)); // مقدار جدید تعداد پست‌ها
    setCurrentPage(1); // برگشت به صفحه اول
  };

  // نمایش بارگذاری یا خطا
  if (loading) return <p className="text-center text-blue-600 text-lg font-semibold">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-600 text-lg font-semibold">خطا: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">لیست پست‌ها (صفحه‌بندی)</h1>

      {/* تنظیم تعداد پست‌ها در هر صفحه */}
      <div className="mb-6 flex items-center justify-between">
        <label htmlFor="postsPerPage" className="text-gray-700">تعداد پست‌ها در هر صفحه:</label>
        <select
          id="postsPerPage"
          value={postsPerPage}
          onChange={handlePostsPerPageChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* نمایش لیست پست‌ها */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {currentPosts.map((post) => (
          <li
            key={post.id}
            className="p-4 bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>

      {/* بخش صفحه‌بندی */}
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

// کامپوننت صفحه‌بندی
interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 border rounded-lg ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition`}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default PaginatedPosts;
