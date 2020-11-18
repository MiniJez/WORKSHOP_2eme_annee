import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Card, CheckBox } from 'react-native-elements'
import Colors from '../constants/Colors';


const Divider = () => {
    return (
        <View style={styles.divider} />
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: Colors.marron,
        marginVertical: 20
    }
})

export default Divider;