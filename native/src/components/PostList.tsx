import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Post } from '../types/Post';

type Props = {
  postList: Post[];
  isFiltered: boolean;
  pressAuthorHandler: (name: string) => void;
  pressPostHandler: (title: string, body: string) => void;
  displayAllPostsHandler: () => void;
};

const PostList: React.FC<Props> = ({
  postList,
  isFiltered,
  pressAuthorHandler,
  pressPostHandler,
  displayAllPostsHandler,
}) => {
  const formatSummary = (body: string): string =>
    body.split(/\n\n/)[1].slice(2, 40);

  const formatDate = (dateString: string): string => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  };

  return (
    <View>
      {isFiltered ? (
        <TouchableOpacity onPress={displayAllPostsHandler}>
          <Text style={styles.instruction}>
            Press here to show the full list again.
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.instruction}>
          Tap an author's name to only show their posts.
        </Text>
      )}
      <FlatList
        style={styles.list}
        data={postList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.posts}
            onPress={() => {
              pressPostHandler(item.title, item.body);
            }}
          >
            <Text>Title: {item.title}</Text>
            <Text>Summary: {formatSummary(item.body)}</Text>
            <TouchableOpacity
              onPress={() => pressAuthorHandler(item.author.name)}
            >
              <Text style={styles.author}>Author: {item.author.name}</Text>
            </TouchableOpacity>
            <Text>Date: {formatDate(item.publishedAt.toString())}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
  },
  posts: {
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: '#84DCC6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  author: {
    color: '#000',
    fontWeight: 'bold',
  },
  instruction: {
    color: '#FFA69E',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
});
