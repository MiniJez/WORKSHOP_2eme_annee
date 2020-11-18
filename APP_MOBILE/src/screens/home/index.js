import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native'
import ActionCard from '../../components/ActionCard'
import Divider from '../../components/Divider'
import Colors from '../../constants/Colors';
import Images from '../../constants/Images'

let fakeData = [
    {
        type: 'CO2',
        text: 'Ouvrir la fenêtre',
        checked: false
    },
    {
        type: 'Temperature',
        text: "Monter le chauffage",
        checked: false
    }
]


const Home = () => {

    const [fakeDataState, setFakeDataState] = useState(fakeData);

    const onPress = (alert) => {
        console.log(alert)
        fakeDataState.forEach((value, index) => {
            if(value.type === alert.type) {
                let obj = [...fakeDataState]
                obj[index].checked = !obj[index].checked
                setFakeDataState(obj);
            }
        })
    }

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
                {fakeDataState.map((value, index) => {
                    if(!value.checked) return <ActionCard key={index} alert={value} onPress={onPress} />
                    else return null
                })}
            </View>
            <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Actions traitées</Text>
                <Divider />
                {fakeDataState.map((value, index) => {
                    if(value.checked) return <ActionCard key={index} alert={value} onPress={onPress} />
                    else return null
                })}
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