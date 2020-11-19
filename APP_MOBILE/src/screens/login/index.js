import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import Colors from '../../constants/Colors';
import Images from '../../constants/Images'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/loginActions'
import { createLoadingSelector } from '../../redux/selectors/directSelectors'
import { usePrevious } from '../../customHooks/usePrevious'


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loadingLogin, navigation } = props
    const prevLoadingLogin = usePrevious(loadingLogin)
    console.log(props)

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
                onPress={() => login(email, password)}>
                <Text>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
};


const mapStateToProps = state => ({
    state,
    loadingLogin: createLoadingSelector(['LOGIN'])(state)
});


const mapDispatchToProps = {
    login
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blanc,
        alignItems: 'center',
    },
    viewInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        marginBottom: 20,
    },
    textInput: {
        padding: 20
    },
    image1: {
        width: '30%',
        height: '25%',
    }
});