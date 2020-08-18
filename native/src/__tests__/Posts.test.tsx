import React from 'react';
import renderer, { create, act } from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';
import 'isomorphic-fetch';
import useGetPostService from '../services/useGetPostService';
import { Service } from '../types/Service';
import { Post } from '../types/Post';
import Posts from '../components/Posts';

jest.mock('../services/useGetPostService');
const mockedService = mocked(useGetPostService, true);

describe('<Posts /> ', () => {
  describe('snapshots', () => {
    it('shows loading screen while service status is still loading', async () => {
      const expectedResult: Service<Post[]> = {
        status: 'loading',
      };
      mockedService.mockReturnValueOnce(expectedResult);

      const tree = renderer.create(<Posts />).toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });

    it('shows error screen for service status error', async () => {
      const expectedResult: Service<Post[]> = {
        status: 'error',
        error: new Error(),
      };
      mockedService.mockReturnValueOnce(expectedResult);

      const tree = renderer.create(<Posts />).toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });

    it('shows post list screen when results have loaded', async () => {
      const expectedResult: Service<Post[]> = {
        status: 'loaded',
        payload: [],
      };
      mockedService.mockReturnValueOnce(expectedResult);

      const tree = renderer.create(<Posts />).toJSON();
      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('component', () => {
    it('renders ActivityIndicator component during status of loading', () => {
      const expectedResult: Service<Post[]> = {
        status: 'loading',
      };
      mockedService.mockReturnValueOnce(expectedResult);

      const tree = renderer.create(<Posts />).toJSON().children[0];

      expect(tree.type).toBe('ActivityIndicator');
    });

    it('displays error message when loaded with error', () => {
      const expectedResult: Service<Post[]> = {
        status: 'error',
        error: new Error(),
      };
      mockedService.mockReturnValueOnce(expectedResult);

      const tree = renderer.create(<Posts />).toJSON().children[0];

      expect(tree.type).not.toBe('ActivityIndicator');
      expect(tree.children[0]).toBe('Oops, I did it again.');
    });

    it('displays post list when results have loaded', () => {
      const postData = [
        {
          title: 'tater tots',
          body: 'po \n\n## ta **toes**',
          author: {
            name: 'samwise',
            id: '1',
          },
          id: 'a',
          publishedAt: new Date('01-02-2020'),
        },
      ];

      const expectedResult: Service<Post[]> = {
        status: 'loaded',
        payload: postData,
      };
      mockedService.mockReturnValueOnce(expectedResult);

      const tree = renderer.create(<Posts />).toJSON().children[0].children[0];

      expect(tree.children[0]).toBe(
        `Press an author's name to only show their posts.`
      );
    });
  });
});
