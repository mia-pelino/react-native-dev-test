import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { LatinPosts } from '../services/useGetLatinPostService';
import { LatinPost } from '../types/LatinPost';

const PostList: React.FC<any> = (postList: LatinPosts) => {
  const sortPostsReverseChronologically = (posts: LatinPost[]): LatinPost[] => {
    return [].slice
      .call(posts)
      .sort(
        (newer: LatinPost, older: LatinPost): number =>
          new Date(older.publishedAt).getTime() -
          new Date(newer.publishedAt).getTime()
      );
  };

  const sortedPosts = sortPostsReverseChronologically(postList.posts);

  const formatSummary = (body: string): string =>
    body.split(/\n\n/)[1].slice(2, 40);

  const formatDate = (dateString: string): string => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  };

  return (
    <FlatList
      style={styles.list}
      data={sortedPosts}
      renderItem={({ item }) => (
        <View style={styles.posts}>
          <Text>Title: {item.title}</Text>
          <Text>Summary: {formatSummary(item.body)}</Text>
          <Text>Author: {item.author.name}</Text>
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
});
