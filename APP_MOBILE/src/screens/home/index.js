import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native'
import ActionCard from '../../components/ActionCard'
import Divider from '../../components/Divider'
import Colors from '../../constants/Colors';
import Images from '../../constants/Images'

const Home = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image 
                source={Images.logo}
                style={styles.image1}
                resizeMode="contain"
            />
            <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Actions requises</Text>
                <Divider />
                <ActionCard text='Ouvrir la fenêtre' />
                <ActionCard text='Ouvrir la fenêtre' />
            </View>
            <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Actions traitées</Text>
                <Divider />
                <ActionCard text='Ouvrir la fenêtre' />
                <ActionCard text='Ouvrir la fenêtre' />
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blanc,
    },
    actionContainer: {
        margin: 20,
    },
    actionTitle: {
        fontSize: 20,
        color: Colors.marron,
    },
    image1: {
        position: 'absolute',
        width: '30%',
        height: '25%',
        bottom: 0,
        right: 0
    }
});

export default Home;