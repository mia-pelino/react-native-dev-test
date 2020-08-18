import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer, { create, act } from 'react-test-renderer';
import PostList from '../components/PostList';

describe('<PostList />', () => {
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
    {
      title: 'mashed potatoes',
      body: 'boil \n\n## em',
      author: {
        name: 'gamgee',
        id: '2',
      },
      id: 'b',
      publishedAt: new Date('01-01-2020'),
    },
  ];

  describe('snapshot', () => {
    it('lists all posts and displays message to tap author for filtering when list is not filtered', async () => {
      const tree = renderer
        .create(
          <PostList
            postList={postData}
            isFiltered={false}
            pressAuthorHandler={() => {}}
            pressPostHandler={() => {}}
            displayAllPostsHandler={() => {}}
          />
        )
        .toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });

    it('only lists post by author and displays message to view all posts when list is filtered', async () => {
      const tree = renderer
        .create(
          <PostList
            postList={[postData[0]]}
            isFiltered={true}
            pressAuthorHandler={() => {}}
            pressPostHandler={() => {}}
            displayAllPostsHandler={() => {}}
          />
        )
        .toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });

    it('lists a single post list when loaded result size is one', async () => {
      const tree = renderer
        .create(
          <PostList
            postList={[postData[0]]}
            isFiltered={false}
            pressAuthorHandler={() => {}}
            pressPostHandler={() => {}}
            displayAllPostsHandler={() => {}}
          />
        )
        .toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });

    it('shows an empty post list when loaded results are empty', async () => {
      const tree = renderer
        .create(
          <PostList
            postList={[]}
            isFiltered={false}
            pressAuthorHandler={() => {}}
            pressPostHandler={() => {}}
            displayAllPostsHandler={() => {}}
          />
        )
        .toJSON();

      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('interactivity', () => {
    let testIsFiltered: boolean = false;
    let mockPressAuthor = jest.fn(() => (testIsFiltered = true));
    let mockPressPost = jest.fn();
    let mockDisplayAllPosts = jest.fn(() => (testIsFiltered = false));

    it('calls pressAuthorHandler when author is selected', () => {
      const wrapper = render(
        <PostList
          postList={postData}
          isFiltered={testIsFiltered}
          pressAuthorHandler={mockPressAuthor}
          pressPostHandler={mockPressPost}
          displayAllPostsHandler={mockDisplayAllPosts}
        />
      );

      fireEvent.press(wrapper.getByText('Author: samwise'));

      expect(mockPressAuthor).toHaveBeenCalledTimes(1);
    });

    it('calls pressPostHandler when author is selected', () => {
      const wrapper = render(
        <PostList
          postList={postData}
          isFiltered={testIsFiltered}
          pressAuthorHandler={mockPressAuthor}
          pressPostHandler={mockPressPost}
          displayAllPostsHandler={mockDisplayAllPosts}
        />
      );

      fireEvent.press(wrapper.getByText('Title: tater tots'));

      expect(mockPressPost).toHaveBeenCalledTimes(1);
    });

    it('calls displayAllPostsHandler when instruction is pressed', () => {
      const wrapper = render(
        <PostList
          postList={postData}
          isFiltered={testIsFiltered}
          pressAuthorHandler={mockPressAuthor}
          pressPostHandler={mockPressPost}
          displayAllPostsHandler={mockDisplayAllPosts}
        />
      );

      fireEvent.press(
        wrapper.getByText('Press here to show the full list again.')
      );

      expect(mockDisplayAllPosts).toHaveBeenCalled();
    });
  });
});
