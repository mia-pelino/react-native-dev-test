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

describe('<Posts />', () => {
  const postData = [
    {
      title: 'titular title',
      body: 'bod \n\n## stuff',
      author: {
        name: 'me',
        id: '1',
      },
      id: 'a',
      publishedAt: new Date('01-01-2020'),
    },
    {
      title: 'boring title',
      body: 'bod1 \n\n## stuff',
      author: {
        name: 'you',
        id: '2',
      },
      id: 'b',
      publishedAt: new Date(),
    },
  ];

  it('renders ActivityIndicator component while loading', () => {
    const expectedResult: Service<Post[]> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<Posts />).toJSON().children[0];

    expect(tree.type).toBe('ActivityIndicator');
  });

  //TODO: find a way to actually assert on results
  it('displays post list reverse chronologically when loaded', () => {
    const expectedResult: Service<Post[]> = {
      status: 'loaded',
      payload: postData,
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<Posts />).toJSON().children[0];

    expect(tree.type).not.toBe('ActivityIndicator');
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

  it('matches the snapshot', async () => {
    const expectedResult: Service<Post[]> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<Posts />).toJSON();
    await act(async () => {expect(tree).toMatchSnapshot(); })
  });

  it('matches the snapshot', async () => {
    const expectedResult: Service<Post[]> = {
      status: 'error',
      error: new Error(),
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<Posts />).toJSON();
    await act(async () => {expect(tree).toMatchSnapshot(); })
  });

  it('matches the snapshot', async () => {
    const expectedResult: Service<Post[]> = {
      status: 'loaded',
      payload: postData,
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<Posts />).toJSON();
    await act(async () => {expect(tree).toMatchSnapshot(); })
  });
});
