import { useEffect, useState } from 'react';
import { LatinPost } from '../types/LatinPost';
import { Service } from '../types/Service';

export interface LatinPosts {
  posts: LatinPost[];
}

const useGetLatinPostService = () => {
  const [result, setResult] = useState<Service<LatinPosts>>({
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

export default useGetLatinPostService;
