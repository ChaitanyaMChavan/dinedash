import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const { userloggeduidHandler } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const createAccountHandler = async () => {
        if (!email || !password || !cpassword) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        if (password !== cpassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        if (!isChecked) {
            Alert.alert('Error', 'You must agree to the Terms & Privacy.');
            return;
        }

        try {
            const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const uid = userCredentials?.user.uid;
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('SignUpNext', { uid: uid });
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#960e0e'} />
            <View style={styles.topSection}>
                <Text style={styles.title}>Let's</Text>
                <Text style={styles.subtitle}>Create Your</Text>
                <Text style={styles.subtitle}>Account</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputCont}>
                    <FontAwesome name="user" size={20} color="grey" style={styles.icon} />
                    <TextInput placeholder='Full Name' style={styles.input} />
                </View>
                <View style={styles.inputCont}>
                    <FontAwesome name="envelope" size={20} color="grey" style={styles.icon} />
                    <TextInput placeholder='Email Address' keyboardType='email-address' style={styles.input} value={email} onChangeText={setEmail} />
                </View>
                <View style={styles.inputCont}>
                    <FontAwesome name="lock" size={20} color="grey" style={styles.icon} />
                    <TextInput placeholder='Password' style={styles.input} value={password} secureTextEntry onChangeText={setPassword} />
                </View>
                <View style={styles.inputCont}>
                    <FontAwesome name="lock" size={20} color="grey" style={styles.icon} />
                    <TextInput placeholder='Retype Password' style={styles.input} value={cpassword} secureTextEntry onChangeText={setCPassword} />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox value={isChecked} onValueChange={setIsChecked} />
                    <Text style={styles.checkboxText}>I agree to the <Text style={{ fontWeight: 'bold' , color: '#960e0e'}}>Terms & Privacy</Text></Text>
                </View>

                <TouchableOpacity style={styles.signupButton} onPress={createAccountHandler}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
                
                <Text style={styles.loginText}>Have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log in</Text></Text>
            </View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topSection: {
        backgroundColor: '#960e0e',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        padding: 30,
    },
    title: {
        color: 'white',
        fontSize: 26,
        fontWeight: '300',
    },
    subtitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    formContainer: {
        padding: 20,
        marginTop: 10,
    },
    inputCont: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#960e0e',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: 12,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkboxText: {
        marginLeft: 10,
    },
    signupButton: {
        backgroundColor: '#960e0e',
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    signupButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    loginText: {
        textAlign: 'center',
        marginTop: 15,
    },
    loginLink: {
        color: '#960e0e',
        fontWeight: 'bold',
    },
});
