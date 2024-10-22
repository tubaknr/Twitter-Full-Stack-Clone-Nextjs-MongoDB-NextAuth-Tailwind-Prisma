"use client";
import useSWR from 'swr';

import fetcher from '@/app/lib/fetcher'; // tells SWR how to fetch data from the API.

const usePosts = (userId?: string) => {
  
  const url = userId ? '/api/posts?userId=' + userId : '/api/posts';
  // const url = `/api/posts?userId=${userId}`
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePosts;
// optionally fetch posts for a specific user if a userId is provided.

// If a userId is passed, it fetches posts for that specific user by constructing the URL with the query parameter userId
// If no userId is provided, it fetches all posts.
// If userId is provided: the URL will be /api/posts?userId=userId.
// If userId is not provided: the URL will be /api/posts.

// return{
    // data, // list of posts or posts for a specific user (if userId is provided). 
    // error, // the error if the request fails. It will be undefined if there are no errors. 
    // isLoading, //whether the request is in loading state 
    // mutate  // manually trigger a re-fetch or update the cached data.
// };
