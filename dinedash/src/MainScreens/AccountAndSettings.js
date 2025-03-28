import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useContext } from 'react';
import { firebase } from '../Firebase/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const AccountAndSettings = () => {
    const { userloggeduidHandler } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await firebase.auth().signOut(); // Firebase Sign Out
                            await AsyncStorage.removeItem('userloggeduid'); // Remove UID from storage
                            userloggeduidHandler(null); // Clear AuthContext state
    
                            // navigation.navigate('Login'); // Redirect to Login screen
                        } catch (error) {
                            console.log("Logout Error:", error);
                            Alert.alert("Error", "Something went wrong while logging out.");
                        }
                    }
                }
            ]
        );
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Account and Settings</Text>
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile')}>
                    <Text style={styles.buttonTxt}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
                    <Text style={styles.buttonTxt}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }} >
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonTxt}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AccountAndSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#971013',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 30
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#971013',
        borderRadius: 25,
        width: '92%',
        alignSelf: 'center',
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonTxt: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center'
    },
    logoutButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        padding: 15
    },
    logoutButtonTxt: {
        color: '#4E4E4E',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
