import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { LatinPosts } from '../services/useGetLatinPostService';

const PostList: React.FC<any> = (postList: LatinPosts) => {
  const formatSummary = (body: string) => body.split(/\n\n/)[1].slice(2, 40);

  return (
    <FlatList
      data={postList.posts}
      renderItem={({ item }) => (
        <View style={styles.list}>
          <Text>Title: {item.title}</Text>
          <Text>Summary: {formatSummary(item.body)}</Text>
          <Text>Author: {item.author.name}</Text>
          <Text>Date: {item.publishedAt}</Text>
        </View>
      )}
    />
  );
};

export default PostList;

const styles = StyleSheet.create({
  list: {
    margin: 10,
  },
});
