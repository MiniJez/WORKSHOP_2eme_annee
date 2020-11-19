import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import Colors from '../../constants/Colors';
import Images from '../../constants/Images'
import { sha512 } from 'react-native-sha512';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        console.log(email);
        console.log(password);
        fetch('https://eclisson.duckdns.org/ConnectedCity/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,

            })
        })
        .then((response) => {return response.json()})
        .then((response)=> {
            console.log(response)
//            Stocker le token SyncStorage
//            Rediriger vers Home
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
       <View style={styles.container}>
           <Image
               source={Images.logo}
               style={styles.image1}
               resizeMode="contain"
           />
           <View style={styles.viewInput}>
               <TextInput
                style={styles.textInput}
                placeholder="Email...."
                onChangeText={(value) => setEmail(value)}
               />
               <TextInput
                style={styles.textInput}
                placeholder="Mot de passe...."
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true}
               />
           </View>
           <TouchableOpacity
            onPress={() => signIn({email, password})}>
               <Text>Se connecter</Text>
           </TouchableOpacity>
        </View>
    );
};

const SignIn = () => {

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blanc,
        alignItems: 'center',
    },
    viewInput: {
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        marginBottom:20,
    },
    textInput: {
        padding:20
    },
    image1: {
        width: '30%',
        height: '25%',
    }
});

export default Login;