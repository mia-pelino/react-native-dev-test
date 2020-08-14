import React from 'react';
import renderer, { create } from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';
import 'isomorphic-fetch';
import useGetPostService, { Posts } from './services/useGetPostService';
import { Service } from './types/Service';
import { App } from './App';

jest.mock('./services/useGetPostService');
const mockedService = mocked(useGetPostService, true);

describe('<App />', () => {
  test('renders without crashing', () => {
    const expectedResult: Service<Posts> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON();

    expect(tree).not.toBeNull();
  });

  it('renders ActivityIndicator component while loading', () => {
    const expectedResult: Service<Posts> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON().children[1].children[0];

    expect(tree.type).toBe('ActivityIndicator');
    expect(tree.type).not.toBe('Text');
  });

  //TODO: find a way to actually assert on results
  it('displays post list reverse chronologically when loaded', () => {
    const expectedResult: Service<Posts> = {
      status: 'loaded',
      payload: {
        posts: [
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
        ],
      },
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON().children[0];

    expect(tree.type).not.toBe('ActivityIndicator');
  });

  it('displays error message when loaded with error', () => {
    const expectedResult: Service<Posts> = {
      status: 'error',
      error: new Error(),
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON().children[1].children[0];

    expect(tree.type).not.toBe('ActivityIndicator');
    expect(tree.children[0]).toBe('Oops, I did it again.');
  });

  it('matches the snapshot', () => {
    const expectedResult: Service<Posts> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
