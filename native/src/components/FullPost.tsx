import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';

//TODO: button to go back to full list
type FullPostRouteProp = RouteProp<
  RootStackParamList,
  'FullPost'
>;

type Props = {
  route: FullPostRouteProp;
};

const FullPost: React.FC<Props> = ({ route }) => {
  return (
    <SafeAreaView>
      <Text>{route.params.title}</Text>
      <Text>{route.params.body}</Text>
    </SafeAreaView>
  );
};

export default FullPost;
