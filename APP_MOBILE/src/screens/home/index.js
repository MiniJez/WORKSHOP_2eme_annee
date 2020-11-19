import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native'
import ActionCard from '../../components/ActionCard'
import Divider from '../../components/Divider'
import Colors from '../../constants/Colors';
import Images from '../../constants/Images'
import { Button } from 'react-native-elements'
import { logout } from '../../redux/actions/loginActions'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../redux/selectors/directSelectors'

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

    const [fakeDataState, setFakeDataState] = useState(fakeData);
    const { logout } = props
    console.log(props)

    const onPress = (alert) => {
        fakeDataState.forEach((value, index) => {
            if (value.type === alert.type) {
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
                    if (!value.checked) return <ActionCard key={index} alert={value} onPress={onPress} />
                    else return null
                })}
            </View>
            <View style={styles.actionContainer}>
                <Text style={styles.actionTitle}>Actions traitées</Text>
                <Divider />
                {fakeDataState.map((value, index) => {
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
    loadingLogin: createLoadingSelector(['LOGOUT'])(state)
});


const mapDispatchToProps = {
    logout
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