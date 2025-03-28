import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const { userloggeduidHandler } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateInputs = () => {
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Enter a valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const LoginHandler = async () => {
        if (!validateInputs()) return;

        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            var user = userCredential.user.uid;
            userloggeduidHandler(user);
            console.log('From LoginScreen (UID)', user);
        } catch (error) {
            console.log('Login error:', error);
            Alert.alert('Login Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#800000'} />

            {/* Logo */}
            <Image source={require('../../assets/logo.png')} style={styles.logo} />

            {/* App Title */}
            <Text style={styles.appTitle}>DineDash</Text>
            <Text style={styles.subtitle}>FOOD DELIVERY APP</Text>

            {/* Email Input */}
            <View style={styles.inputCont}>
                <FontAwesome name="user" size={20} color="white" style={styles.icon} />
                <TextInput
                    placeholder='Email or Phone'
                    placeholderTextColor="white"
                    keyboardType='email-address'
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError('');
                    }}
                />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            {/* Password Input */}
            <View style={styles.inputCont}>
                <FontAwesome name="lock" size={20} color="white" style={styles.icon} />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError('');
                    }}
                />
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={LoginHandler}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.createAccountButton}>
                    <Text style={styles.createAccountButtonText}>Create an account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#800000', // Dark red background
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 240,
        height: 240,
        marginBottom: 20,
    },
    appTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'gold',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 30,
    },
    inputCont: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        padding: 12,
        width: '85%',
        marginBottom: 10,
    },
    icon: {
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    errorText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 12,
        width: '85%',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    createAccountContainer: {
        marginTop: 20,
        width: '85%',
        alignItems: 'center',
    },
    createAccountText: {
        color: 'white',
        fontSize: 14,
    },
    createAccountButton: {
        backgroundColor: 'black',
        borderRadius: 25,
        paddingVertical: 12,
        width: '85%',
        alignItems: 'center',
        marginTop: 10,
    },
    createAccountButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
