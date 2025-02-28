import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* App Logo or Welcome Image */}
      <Image source={require('../Images/home.png')} style={styles.logo} />
      
      {/* <Text style={styles.title}>Welcome to Dine Dash</Text>
      <Text style={styles.subtitle}>Order your favorite meals with ease</Text> */}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color
  },
  logo: {
    width: "80%",
    height: "70%",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#971013',
    alignItems: 'center',
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: '#000', // Different color for Sign Up button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
