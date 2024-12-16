export interface Post{
    id: number;
    title: string;
    body: string;
}

export interface UseFetchPostsReturn {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

export interface PostsListProps{
    posts: Post[];
}

export interface PaginationProps{
   totalPosts: number;
   postsPerPage: number;
   currentPage: number;
   paginate: (pageNumber: Number) => void;
}