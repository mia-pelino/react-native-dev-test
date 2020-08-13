import React from 'react';
import Posts from './components/PostView';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';

export function App() {
  const headerContainerStyle = () => Platform.OS === 'ios'
  ? osStyles.iosHeaderContainer : osStyles.androidHeaderContainer;
  const headerStyle = () => Platform.OS === 'ios'
  ? osStyles.iosHeader : osStyles.androidHeader;

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerContainerStyle()}>
        <Text style={headerStyle()}>Latin Daily Reader</Text>
      </View>
      <Posts />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#A5FFD6',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginLeft: 10,
    color: '#FF0054',
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
  iosHeader:  {
    ...styles.header,
    marginTop: 20,
    fontFamily: 'Chalkduster',
  },
  androidHeader: {
    ...styles.header,
    marginTop: 40,
    fontFamily: 'monospace',
  }
})
