import React from 'react';
import {
  sortPosts,
  sortPostsReverseChronologically,
} from '../services/useGetPostService';
import { Post } from '../types/Post';

describe('useGetPostService', () => {
  let olderPost = {
    title: 'green beans',
    body: 'in buttery sauces',
    author: {
      name: 'carol',
      id: '1',
    },
    id: 'a',
    publishedAt: new Date('01-02-2020'),
  };

  let newerPost = {
    title: 'broccoli',
    body: 'with lots of garlic',
    author: {
      name: 'eugene',
      id: '2',
    },
    id: 'b',
    publishedAt: new Date('01-04-2020'),
  };

  let unsortedTestPosts = [olderPost, newerPost];

  let mockSetPostHandler = jest.fn((posts: Post[]) => {});

  describe('sortPosts', () => {
    it('sorts posts reverse chronologically', () => {
      const result = sortPosts(unsortedTestPosts, mockSetPostHandler);

      expect(result).toEqual([newerPost, olderPost]);
    });

    it('calls setPostHandler with sorted posts', () => {
      expect(mockSetPostHandler).toHaveBeenCalledWith([newerPost, olderPost]);
    });
  });

  describe('sortPostsReverseChronologically', () => {
    it('sorts post reverse chronologically', () => {
      const result = sortPostsReverseChronologically(unsortedTestPosts);

      expect(result).toEqual([newerPost, olderPost]);
    });
  });
});
