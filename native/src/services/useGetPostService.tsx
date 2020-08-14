import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Service } from '../types/Service';


const useGetPostService = (setPostHandler: (posts: Post[]) => void) => {
  const [result, setResult] = useState<Service<Post[]>>({
    status: 'loading',
  });

  const sortPosts = (posts: Post[]): Post[] => {
    const sortedPosts = sortPostsReverseChronologically(posts);
    setPostHandler(sortedPosts);
    return sortedPosts;
  }

  const sortPostsReverseChronologically = (posts: Post[]): Post[] => {
    return [].slice
      .call(posts)
      .sort(
        (newer: Post, older: Post): number =>
          new Date(older.publishedAt).getTime() -
          new Date(newer.publishedAt).getTime()
      );
  };

  useEffect(() => {
    fetch('http://10.0.0.21:4000/posts')
      .then((response) => response.json())
      .then((response) => setResult({ status: 'loaded', payload: sortPosts(response) }))
      .catch((error) => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useGetPostService;
