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