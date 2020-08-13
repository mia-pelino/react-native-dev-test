import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Service } from '../types/Service';

export interface Posts {
  posts: Post[];
}

const useGetPostService = () => {
  const [result, setResult] = useState<Service<Posts>>({
    status: 'loading',
  });

  useEffect(() => {
    fetch('http://10.0.0.122:4000/posts')
      .then((response) => response.json())
      .then((response) => setResult({ status: 'loaded', payload: response }))
      .catch((error) => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useGetPostService;
