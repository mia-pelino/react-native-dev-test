import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import useGetLatinPostService from '../services/useGetPostService';
import PostList from './PostList';
import { Post } from '../types/Post';
import { RootStackParamList } from '../types/RootStackParamList';

type PostsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation?: PostsScreenNavigationProp;
};

const Posts: React.FC<Props> = ({navigation}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const service = useGetLatinPostService(setPosts);

  const filterByAuthor = (name: string): void => setPosts(posts.filter((post) => post.author.name == name));

  const navigateToFullPost = (title: string, body: string): void => {
    navigation?.navigate('FullPost', { title: title, body: body });
  };

  return (
    <View style={styles.container}>
      {service.status === 'loading' && <ActivityIndicator />}
      {service.status === 'loaded' && <PostList 
        postList={posts}
        pressAuthorHandler={name => {filterByAuthor(name)}}
        pressPostHandler={(title, body) => navigateToFullPost(title, body)} 
      />}
      {service.status === 'error' && <Text>Oops, I did it again.</Text>}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
