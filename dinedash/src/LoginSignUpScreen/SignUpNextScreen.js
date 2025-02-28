import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useContext,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';

const SignUpNextScreen = ({ route, navigation }) => {
    const uid = route.params?.uid || '';
    const { userloggeduidHandler } = useContext(AuthContext);
    // State for user input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Function to save user profile to Firestore
    const handleSaveProfile = async () => {
        if (!name || !email || !phone || !address ) {
            Alert.alert("Error", "Please fill all the fields!");
            return;
        }

        try {
            await firebase.firestore().collection('UserProfiles').doc(uid).set({
                name,
                phone,
                address,
                email,
                uid,
            });

            Alert.alert("Success", "Profile saved successfully!");
            userloggeduidHandler(uid)  // Navigate to Home after saving
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert("Error", "Failed to save profile. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#FF3F00'} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Complete Profile</Text>
            </View>

            <TextInput
                placeholder='Name'
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder='e-mail'
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                placeholder='Phone'
                style={styles.input}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <TextInput
                placeholder='Address'
                style={styles.input}
                value={address}
                onChangeText={(text) => setAddress(text)}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save & Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpNextScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    header: {
        paddingVertical: 12,
        width: '95%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    headerText: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '700',
    },
    input: {
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center',
    },
    saveButton: {
        backgroundColor: '#FF3F00',
        borderRadius: 25,
        width: '90%',
        padding: 10,
        alignSelf: 'center',
        elevation: 2,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
    },
});
