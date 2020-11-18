import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
import { Card } from 'react-native-elements';

class FinishedActions extends Component {
    render() {
      return (
        <Card>
          <Card.Title style={{color: 'blue'}}>Actions traitées</Card.Title>
          <Card.Divider style={{backgroundColor: 'blue', height:2}}/>
          <View>
            <Text>Test</Text>
          </View>
        </Card>
      );
    }
  }
  
export default FinishedActions;