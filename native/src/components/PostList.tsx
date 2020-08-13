import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Posts } from '../services/useGetPostService';
import { Post } from '../types/Post';

const PostList: React.FC<any> = (postList: Posts) => {
  const sortPostsReverseChronologically = (posts: Post[]): Post[] => {
    return [].slice
      .call(posts)
      .sort(
        (newer: Post, older: Post): number =>
          new Date(older.publishedAt).getTime() -
          new Date(newer.publishedAt).getTime()
      );
  };

  const sortedPosts = sortPostsReverseChronologically(postList.posts);

  const [posts, setPosts] = useState<Post[]>(sortedPosts);

  const filterByAuthor = (authorName: string) => {
    setPosts(posts.filter((post) => post.author.name == authorName));
  };

  const formatSummary = (body: string): string =>
    body.split(/\n\n/)[1].slice(2, 40);

  const formatDate = (dateString: string): string => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  };

  return (
    <FlatList
      style={styles.list}
      data={posts}
      renderItem={({ item }) => (
        <View style={styles.posts}>
          <Text>Title: {item.title}</Text>
          <Text>Summary: {formatSummary(item.body)}</Text>
          <TouchableOpacity onPress={() => filterByAuthor(item.author.name)}>
            <Text style={styles.author}>Author: {item.author.name}</Text>
          </TouchableOpacity>
          <Text>Date: {formatDate(item.publishedAt.toString())}</Text>
        </View>
      )}
    />
  );
};

export default PostList;

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  posts: {
    margin: 15,
  },
  author: {
    color: '#FF0054',
  },
});
