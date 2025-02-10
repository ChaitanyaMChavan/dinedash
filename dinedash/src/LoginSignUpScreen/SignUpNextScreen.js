import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
const SignUpNextScreen = () => {
  return (
    <View style={styles.container}>
                    <StatusBar backgroundColor={'#FF3F00'} />
                    <View style={{ paddingVertical: 12, width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '700' }}>Complete Profile</Text>
                    </View>
        
                    <TextInput
                        placeholder='Name'
                        // keyboardType='email-address'
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Phone'
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Address'
                        style={styles.input}
                    />
        
                    <TouchableOpacity style={styles.loginbutton} onPress={() => alert('Account Created Successful!')}>
                        <Text style={styles.loginbuttonTxt}>Next</Text>
                    </TouchableOpacity>
        
                </View>
  )
}

export default SignUpNextScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'green',
        width: '100%'
    },
    input: {
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center'
    },
    loginbutton: {
        backgroundColor: '#FF3F00',
        borderRadius: 25,
        width: '90%',
        padding: 10,
        alignSelf: 'center',
        elevation: 2
    },
    loginbuttonTxt: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center'
    }
})