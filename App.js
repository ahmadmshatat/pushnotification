/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LocalNotification from './src/utils/LocalNotification';

class App extends Component {
  componentDidMount() {
    LocalNotification.register();
  }

  componentWillUnmount() {
    LocalNotification.unregister();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Welcome Push notification</Text>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default App;
