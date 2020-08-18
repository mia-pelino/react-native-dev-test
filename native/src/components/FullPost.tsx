import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import Markdown from 'react-native-markdown-display';

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
    <ScrollView style={styles.fullPost}>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('Home');
        }}
      >
        <Text style={styles.navigateBack}>{'<'} Return to List of Posts</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{route.params.title}</Text>
        <Markdown style={markdownStyle}>{route.params.body}</Markdown>
      </View>
    </ScrollView>
  );
};

export default FullPost;

const styles = StyleSheet.create({
  fullPost: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  title: {
    color: '#A5FFD6',
    paddingTop: 20,
    paddingBottom: 15,
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#FFF',
    fontSize: 16,
    opacity: 1,
    paddingHorizontal: 10,
  },
  navigateBack: {
    paddingTop: 10,
    color: '#FFA69E',
  },
});

const markdownStyle = {
  body: {
    ...styles.body,
    fontSize: 14,
  },
  heading1: {
    ...styles.body,
    fontSize: 22,
  },
  heading2: {
    ...styles.body,
    fontSize: 20,
  },
};
