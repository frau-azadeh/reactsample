'use client'
import React, { useState } from "react";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import {PostsList} from "./PostsList";
import {Pagination} from "./Pagination";
import {PostsPerPageSelector} from "./PostsPerPageSelector";

const PaginatedPosts1: React.FC = () => {
  const { posts, loading, error } = useFetchPosts();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  // محاسبه ایندکس‌های شروع و پایان برای هر صفحه
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // تغییر صفحه
  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center text-blue-600 text-lg font-semibold">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-600 text-lg font-semibold">خطا: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">لیست پست‌ها (صفحه‌بندی)</h1>
      <PostsPerPageSelector postsPerPage={postsPerPage} setPostsPerPage={setPostsPerPage} />
      <PostsList posts={currentPosts} />
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        paginate={handlePaginate}
      />
    </div>
  );
};

export default PaginatedPosts1;
