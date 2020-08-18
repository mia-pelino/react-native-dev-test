import React from 'react';
import renderer, { create, act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import FullPost from '../components/FullPost';

describe('<FullPost /> snapshots', () => {
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
});

describe('interactivity', () => {
  it('makes call to navigate to post list when message is pressed', async () => {
    const mockNavigation = jest.fn();
    const wrapper = render(
      <FullPost
        route={{
          params: {
            title: 'hash browns',
            body: 'crispy with hot sauce',
          },
        }}
        navigation={{
          navigate: mockNavigation,
        }}
      />
    );

    fireEvent.press(wrapper.getByText('< Return to List of Posts'));

    expect(mockNavigation).toHaveBeenCalledTimes(1);
  });
});
