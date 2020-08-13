import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import useGetLatinPostService from '../services/useGetLatinPostService';
import PostList from './PostList';

const LatinPosts: React.FC<{}> = () => {
  const service = useGetLatinPostService();

  return (
    <View style={styles.container}>
      {service.status === 'loading' && <ActivityIndicator />}
      {service.status === 'loaded' && <PostList posts={service.payload} />}
      {service.status === 'error' && <Text>Oops, I did it again.</Text>}
    </View>
  );
};

export default LatinPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
