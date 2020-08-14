import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';

type FullPostRouteProp = RouteProp<RootStackParamList, 'FullPost'>;

type FullPostNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FullPost'
>;

type Props = {
  route: FullPostRouteProp;
  navigation: FullPostNavigationProp;
};

const FullPost: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View style={styles.fullPost}>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('Home');
        }}
      >
        <Text style={styles.navigateBack}>{'<'} Return to List of Posts</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{route.params.title}</Text>
        <Text style={styles.body}>{route.params.body}</Text>
      </View>
    </View>
  );
};

export default FullPost;

const styles = StyleSheet.create({
  fullPost: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    paddingBottom: 25,
    paddingTop: 25,
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
  },
  body: {
    color: '#FFF',
    fontSize: 18,
  },
  navigateBack: {
    paddingTop: 10,
    color: '#FFF',
  },
});
