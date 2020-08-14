import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from './components/Posts';
import FullPost from './components/FullPost';
import { RootStackParamList } from './types/RootStackParamList';

const RootStack = createStackNavigator<RootStackParamList>();

export function App() {
  const headerContainerStyle = () =>
    Platform.OS === 'ios'
      ? osStyles.iosHeaderContainer
      : osStyles.androidHeaderContainer;

  const headerStyle = () =>
    Platform.OS === 'ios' ? osStyles.iosHeader : osStyles.androidHeader;

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <View style={headerContainerStyle()}>
          <Text style={headerStyle()}>Latin Daily Reader</Text>
        </View>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="Home" component={Posts} />
          <RootStack.Screen name="FullPost" component={FullPost} />
        </RootStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    backgroundColor: '#FF686B',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  header: {
    fontSize: 20,
    color: '#FFF',
    alignContent: 'center',
    fontWeight: 'bold',
  },
});

const osStyles = StyleSheet.create({
  androidHeaderContainer: {
    ...styles.headerContainer,
    height: '12%',
  },
  iosHeaderContainer: {
    ...styles.headerContainer,
    height: '8%',
  },
  iosHeader: {
    ...styles.header,
    marginTop: 20,
    fontFamily: 'Chalkduster',
  },
  androidHeader: {
    ...styles.header,
    marginTop: 40,
    fontFamily: 'monospace',
  },
});
