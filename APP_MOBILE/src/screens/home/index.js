import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import ActionCard from '../../components/ActionCard'
import Divider from '../../components/Divider'
import Colors from '../../constants/Colors';

const Home = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionTitle}>Actions requises</Text>
                    <Divider/>
                    <ActionCard text='Ouvrir la fenêtre'/>
                    <ActionCard text='Ouvrir la fenêtre'/>
                </View>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionTitle}>Actions taitées</Text>
                    <Divider/>
                    <ActionCard text='Ouvrir la fenêtre'/>
                    <ActionCard text='Ouvrir la fenêtre'/>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blanc
    },
    actionContainer: {
        margin: 20
    },
    actionTitle: {
        fontSize: 20,
        color: Colors.marron,
    }
});

export default Home;