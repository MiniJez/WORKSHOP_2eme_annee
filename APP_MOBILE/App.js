/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FinishedActions from './src/components/finishedActions';
import NeededActions from './src/components/neededActions';

const App = () => {
  return (
    <View style={styles.fontColor}>
      <ScrollView>
          <View style={styles.body}>
            <NeededActions />
            <FinishedActions />
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fontColor:{
    flex: 1,
    // backgroundColor: "#fae1c8" // Set your own custom Color
  },
});

export default App;
