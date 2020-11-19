import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home'
import Login from '../screens/login'
import Loading from '../screens/loading'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { setToken } from '../redux/actions/loginActions'

const Stack = createStackNavigator();

const MainNavigator = (props) => {
    const [userToken, setUserToken] = useState('init');
    const { setToken, token } = props
    
    useEffect(() => {
        async function getToken() {
            let tokenAsyncS = await AsyncStorage.getItem('token');
            if(tokenAsyncS) {
                setToken(tokenAsyncS);
            }
            setUserToken(tokenAsyncS);
        }

        getToken();
    }, [token]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken === "init" ? (
                    <Stack.Screen name="Loading" component={Loading} />
                ) : (
                    userToken ? 
                        <Stack.Screen name="Home" component={Home} />
                        :
                        <Stack.Screen name="Login" component={Login} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = state => ({
    state,
    token: state.loginReducer.token
});


const mapDispatchToProps = {
    setToken
}


export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);