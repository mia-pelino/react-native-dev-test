import React, { useState } from 'react';
import { FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Post } from '../types/Post';

//TODO: indicator that pressing author sorts
//TODO: button to go back to full list
type Props = {
  postList: Post[];
  pressAuthorHandler: (name: string) => void;
  pressPostHandler: (title: string, body: string) => void;
}

const PostList: React.FC<Props> = ({postList, pressAuthorHandler, pressPostHandler}) => {
  const formatSummary = (body: string): string =>
    body.split(/\n\n/)[1].slice(2, 40);

  const formatDate = (dateString: string): string => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  };

  return (
    <FlatList
      style={styles.list}
      data={postList}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.posts} onPress={() => {pressPostHandler(item.title, item.body)}}>
          <Text>Title: {item.title}</Text>
          <Text>Summary: {formatSummary(item.body)}</Text>
          <TouchableOpacity onPress={() => pressAuthorHandler(item.author.name)}>
            <Text style={styles.author}>Author: {item.author.name}</Text>
          </TouchableOpacity>
          <Text>Date: {formatDate(item.publishedAt.toString())}</Text>
        </TouchableOpacity>
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
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#84DCC6',
    padding: 8,
    borderRadius: 8,
  },
  author: {
    color: '#000',
    fontWeight: 'bold',
  },
});
