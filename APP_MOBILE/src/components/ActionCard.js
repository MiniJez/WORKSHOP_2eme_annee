import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Card, CheckBox } from 'react-native-elements'
import Colors from '../constants/Colors';
import { AlertString } from "../constants/AlertString"


const ActionCard = ({ alert, onPress }) => {
    return (
        <Card containerStyle={styles.cardContainer}>
            <View style={styles.container}>
                <Text>{AlertString[alert.text]}</Text>
                <CheckBox
                    checked={alert.checked}
                    onPress={() => onPress(alert)}
                    containerStyle={styles.checkbox}
                    uncheckedColor={Colors.marron}
                    checkedColor={Colors.marron}
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.beige,
        margin: 0,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkbox: {
        margin: 0,
        padding: 0,
    }
})

export default ActionCard;