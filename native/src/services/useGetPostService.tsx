import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Service } from '../types/Service';

const useGetPostService = (setPostHandler: (posts: Post[]) => void) => {
  const [result, setResult] = useState<Service<Post[]>>({
    status: 'loading',
  });

  useEffect(() => {
    fetch('http://10.0.0.21:4000/posts')
      .then((response) => response.json())
      .then((response) =>
        setResult({
          status: 'loaded',
          payload: sortPosts(response, setPostHandler),
        })
      )
      .catch((error) => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useGetPostService;

export const sortPosts = (
  posts: Post[],
  setPostHandler: (posts: Post[]) => void
) => {
  const sortedPosts = sortPostsReverseChronologically(posts);
  setPostHandler(sortedPosts);
  return sortedPosts;
};

export const sortPostsReverseChronologically = (posts: Post[]): Post[] => {
  return [].slice
    .call(posts)
    .sort(
      (newer: Post, older: Post): number =>
        new Date(older.publishedAt).getTime() -
        new Date(newer.publishedAt).getTime()
    );
};
