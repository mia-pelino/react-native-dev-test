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

describe('<Posts /> snapshots', () => {
  //I'd really like to learn how to successfully fire events to capture state change && navigation in snapshots
  it('displays ActivityIndicator while service status is still loading', async () => {
    const expectedResult: Service<Post[]> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<Posts />).toJSON();
    await act(async () => {
      expect(tree).toMatchSnapshot();
    });
  });

  it('displays error message for error service status', async () => {
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

  it('displays post list when results have loaded', async () => {
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

it('renders ActivityIndicator component while loading', () => {
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
