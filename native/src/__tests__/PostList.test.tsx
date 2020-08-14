import React from 'react';
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
      publishedAt: new Date('01-01-2020'),
    },
    {
      title: 'mashed potatoes',
      body: 'boil \n\n## em',
      author: {
        name: 'gamgee',
        id: '2',
      },
      id: 'b',
      publishedAt: new Date('01-02-2020'),
    },
  ];

  describe('snapshots', () => {
    it('lists all posts and displays message to tap author for filtering when list is not filtered', async () => {
      const tree = renderer.create(
        <PostList
          postList={postData}
          isFiltered={false}
          pressAuthorHandler={() => {}}
          pressPostHandler={() => {}}
          displayAllPostsHandler={() => {}}
        />).toJSON();
  
      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });
  
    it('only lists post by author and displays message to view all posts when list is filtered', async () => {
      const tree = renderer.create(
        <PostList
          postList={[postData[0]]}
          isFiltered={true}
          pressAuthorHandler={() => {}}
          pressPostHandler={() => {}}
          displayAllPostsHandler={() => {}}
        />).toJSON();
  
      await act(async () => {
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('callback props', () => {
    let tree;
    let mockPressAuthor = jest.fn();
    let mockPressPost = jest.fn();
    let mockDisplayAllPosts = jest.fn();

    beforeAll(() => {
      tree = renderer.create(
        <PostList
          postList={postData}
          isFiltered={false}
          pressAuthorHandler={mockPressAuthor}
          pressPostHandler={mockPressPost}
          displayAllPostsHandler={mockDisplayAllPosts}
        />).toJSON();
    })

    it('calls pressAuthorHandler when author is selected', () => {
      
    });

    it('calls pressPostHandler when author is selected', () => {

    });

    it('calls displayAllPostsHandler when author is selected', () => {

    });
  });
});
