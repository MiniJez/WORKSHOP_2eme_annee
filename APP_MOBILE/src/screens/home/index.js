import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'

import FinishedActions from '../../components/finishedActions';
import NeededActions from '../../components/neededActions';

const Home = () => {
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
    fontColor: {
        flex: 1,
        // backgroundColor: "#fae1c8" // Set your own custom Color
    },
});

export default Home;