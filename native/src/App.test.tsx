import React from 'react';
import renderer, { create, act } from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';
import 'isomorphic-fetch';
import useGetPostService from './services/useGetPostService';
import { Service } from './types/Service';
import { Post } from './types/Post';
import { App } from './App';

jest.mock('./services/useGetPostService');
const mockedService = mocked(useGetPostService, true);

describe('<App />', () => {
  it('renders without crashing', () => {
    const expectedResult: Service<Post[]> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON();

    expect(tree).not.toBeNull();
  });

  it('matches the snapshot', async () => {
    const expectedResult: Service<Post[]> = {
      status: 'loading',
    };
    mockedService.mockReturnValueOnce(expectedResult);

    const tree = renderer.create(<App />).toJSON();
    await act(async () => {expect(tree).toMatchSnapshot(); })
  });
});
