import React from 'react';
import renderer, { act, create } from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';
import 'isomorphic-fetch';
import useGetLatinPostService from './services/useGetLatinPostService';
import { Service } from './types/Service';
import { LatinPost } from './types/LatinPost';
import { App } from './App';

jest.mock('./services/useGetLatinPostService');
const mockedService = mocked(useGetLatinPostService, true);

describe('<App />', () => {
  test('renders without crashing', () => {
    const expectedResult: Service<LatinPost> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON();

    expect(tree).not.toBeNull();
  });

  it('renders ActivityIndicator component while loading', () => {
    const expectedResult: Service<LatinPost> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON();

    expect(tree.children[0].type).toBe('ActivityIndicator');
    expect(tree.children[0].type).not.toBe('Text');
  });

  it('displays number of posts returned when loaded', () => {
    const expectedResult: Service<LatinPost> = {
      status: 'loaded',
      payload: [{}, {}, {}],
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON().children[0];
    console.log(tree);

    expect(tree.type).not.toBe('ActivityIndicator');
    expect(tree.children[0] + tree.children[1]).toBe('3 posts have loaded!');
  });

  it('displays error message when loaded with error', () => {
    const expectedResult: Service<LatinPost> = {
      status: 'error',
      error: new Error(),
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON().children[0];

    expect(tree.type).not.toBe('ActivityIndicator');
    expect(tree.children[0]).toBe('Oops, I did it again.');
  });

  it('matches the snapshot', () => {
    const expectedResult: Service<LatinPost> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
