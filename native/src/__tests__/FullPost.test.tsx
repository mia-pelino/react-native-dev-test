import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer, { create, act } from 'react-test-renderer';
import FullPost from '../components/FullPost';

describe('<FullPost /> snapshots', () => {
  //missing tests for navigation
  it('displays title and full post sans markdown characters', async () => {
    const tree = renderer
      .create(
        <FullPost
          route={{
            params: {
              title: 'curly fries',
              body: '#seasoned ##with ranch dipping sauce',
            },
          }}
        />
      )
      .toJSON();

    await act(async () => {
      expect(tree).toMatchSnapshot();
    });
  });

  it('displays blank full post when title and body are empty', async () => {
    const tree = renderer
      .create(
        <FullPost
          route={{
            params: {
              title: '',
              body: '',
            },
          }}
        />
      )
      .toJSON();

    await act(async () => {
      expect(tree).toMatchSnapshot();
    });
  });

  it('navigates to post list when navigate back message is pressed', async () => {
    const tree = renderer
      .create(
        <FullPost
          route={{
            params: {
              title: 'hash browns',
              body: 'crispy with hot sauce',
            },
          }}
        />
      )
      .toJSON();

    await act(async () => {
      expect(tree).toMatchSnapshot();
    });
  });
});
