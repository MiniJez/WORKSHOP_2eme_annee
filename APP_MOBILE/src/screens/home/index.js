import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native'
import ActionCard from '../../components/ActionCard'
import Divider from '../../components/Divider'
import Colors from '../../constants/Colors';
import Images from '../../constants/Images'
import { Button } from 'react-native-elements'
import { logout } from '../../redux/actions/loginActions'
import { sensor, sensorUpdate } from '../../redux/actions/sensorActions'
import { connect } from 'react-redux'

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


const Home = (props) => {

    const { logout, sensor, sensorUpdate, alert } = props
    const [fakeDataState, setFakeDataState] = useState(alert.alert);
    console.log(alert.alert)
    useEffect( () => {
        sensor()
    }, [])

    useEffect( () => {
        console.log('hey')
    }, [alert])


    const onPress = (check) => {
        fakeDataState.forEach((value, index) => {
            if (value.alertType === check.alertType) {
                let obj = [...fakeDataState]
                obj[index].checked = !obj[index].checked
                setFakeDataState(obj);
            }
        })
        sensorUpdate(fakeDataState)
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
                {fakeDataState && fakeDataState.map((value, index) => {
                    if (!value.checked) return <ActionCard key={index} alert={value} onPress={onPress} />
                    else return null
                })}
            </View>
            <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Actions traitées</Text>
                <Divider />
                {fakeDataState && fakeDataState.map((value, index) => {
                    if (value.checked) return <ActionCard key={index} alert={value} onPress={onPress} />
                    else return null
                })}
            </View>
            <Button
                title="Deconnexion"
                containerStyle={styles.button}
                buttonStyle={{ backgroundColor: Colors.orange }}
                onPress={() => logout()}
            />
        </ScrollView>
    );
};


const mapStateToProps = state => ({
    state, 
    alert: state.sensorReducer
});


const mapDispatchToProps = {
    logout,
    sensor,
    sensorUpdate
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);


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
    },
    button: {
        position: 'absolute',
        bottom: 0,
        margin: 30,
        borderRadius: 5
    }
});