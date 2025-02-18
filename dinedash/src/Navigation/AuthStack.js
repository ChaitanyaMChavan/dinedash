import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../LoginSignUpScreen/LoginScreen';
import SignUpScreen from '../LoginSignUpScreen/SignUpScreen';
import SignUpNextScreen from '../LoginSignUpScreen/SignUpNextScreen';
import WelcomeScreen from '../LoginSignUpScreen/WelcomeScreen';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUpNext" component={SignUpNextScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStack

const styles = StyleSheet.create({})