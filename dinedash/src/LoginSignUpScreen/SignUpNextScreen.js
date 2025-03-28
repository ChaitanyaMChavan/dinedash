import { 
    StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar 
  } from 'react-native';
  import React, { useContext, useState } from 'react';
  import { FontAwesome } from '@expo/vector-icons';
  import { firebase } from '../Firebase/FirebaseConfig';
  import { AuthContext } from '../Context/AuthContext';
  
  const SignUpNextScreen = ({ route, navigation }) => {
      const uid = route.params?.uid || '';
      const { userloggeduidHandler } = useContext(AuthContext);
  
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [address, setAddress] = useState('');
      const [dob, setDob] = useState('');
      const [gender, setGender] = useState('');
  
      // State for error messages
      const [nameError, setNameError] = useState('');
      const [emailError, setEmailError] = useState('');
      const [phoneError, setPhoneError] = useState('');
      const [addressError, setAddressError] = useState('');
      const [dobError, setDobError] = useState('');
      const [genderError, setGenderError] = useState('');
  
      // Validation function
      const validateInputs = () => {
          let valid = true;
  
          if (!name || name.length < 3) {
              setNameError('Name must be at least 3 characters');
              valid = false;
          } else {
              setNameError('');
          }
  
          if (!email || !/\S+@\S+\.\S+/.test(email)) {
              setEmailError('Enter a valid email');
              valid = false;
          } else {
              setEmailError('');
          }
  
          if (!phone || !/^\d{10}$/.test(phone)) {
              setPhoneError('Phone number must be 10 digits');
              valid = false;
          } else {
              setPhoneError('');
          }
  
          if (!address) {
              setAddressError('Address is required');
              valid = false;
          } else {
              setAddressError('');
          }
  
          if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
              setDobError('Enter DOB in YYYY-MM-DD format');
              valid = false;
          } else {
              setDobError('');
          }
  
          if (!gender || !['Male', 'Female', 'Other'].includes(gender)) {
              setGenderError('Gender must be Male, Female, or Other');
              valid = false;
          } else {
              setGenderError('');
          }
  
          return valid;
      };
  
      // Function to save user profile to Firestore
      const handleSaveProfile = async () => {
          if (!validateInputs()) return;
  
          try {
              await firebase.firestore().collection('UserProfiles').doc(uid).set({
                  name,
                  email,
                  phone,
                  address,
                  dob,
                  gender,
                  uid,
              });
  
              Alert.alert('Success', 'Profile saved successfully!');
              userloggeduidHandler(uid);
          } catch (error) {
              Alert.alert('Error', 'Failed to save profile. Please try again.');
          }
      };
  
      return (
          <>
              <View style={styles.topSection}>
                  <Text style={styles.title}>Let's</Text>
                  <Text style={styles.subtitle}>Create Your</Text>
                  <Text style={styles.subtitle}>Profile</Text>
              </View>
              <View style={styles.container}>
                  <StatusBar backgroundColor={'#800000'} />
  
                  {/* Name Input */}
                  <View style={styles.inputContainer}>
                      <FontAwesome name="user" size={24} color="grey" style={styles.icon} />
                      <TextInput
                          placeholder="Full Name"
                          style={styles.input}
                          value={name}
                          onChangeText={(text) => {
                              setName(text);
                              setNameError('');
                          }}
                      />
                  </View>
                  {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
  
                  {/* Email Input */}
                  <View style={styles.inputContainer}>
                      <FontAwesome name="envelope" size={24} color="grey" style={styles.icon} />
                      <TextInput
                          placeholder="Email Address"
                          keyboardType="email-address"
                          style={styles.input}
                          value={email}
                          onChangeText={(text) => {
                              setEmail(text);
                              setEmailError('');
                          }}
                      />
                  </View>
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
  
                  {/* Phone Input */}
                  <View style={styles.inputContainer}>
                      <FontAwesome name="phone" size={24} color="grey" style={styles.icon} />
                      <TextInput
                          placeholder="Mobile Number"
                          keyboardType="phone-pad"
                          style={styles.input}
                          value={phone}
                          onChangeText={(text) => {
                              setPhone(text);
                              setPhoneError('');
                          }}
                      />
                  </View>
                  {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
  
                  {/* Address Input */}
                  <View style={styles.inputContainer}>
                      <FontAwesome name="map-marker" size={24} color="grey" style={styles.icon} />
                      <TextInput
                          placeholder="Address"
                          style={styles.input}
                          value={address}
                          onChangeText={(text) => {
                              setAddress(text);
                              setAddressError('');
                          }}
                      />
                  </View>
                  {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
  
                  {/* Date of Birth Input */}
                  <View style={styles.inputContainer}>
                      <FontAwesome name="calendar" size={24} color="grey" style={styles.icon} />
                      <TextInput
                          placeholder="Date of Birth (YYYY-MM-DD)"
                          style={styles.input}
                          value={dob}
                          onChangeText={(text) => {
                              setDob(text);
                              setDobError('');
                          }}
                      />
                  </View>
                  {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}
  
                  {/* Gender Input */}
                  <View style={styles.inputContainer}>
                      <FontAwesome name="transgender" size={24} color="grey" style={styles.icon} />
                      <TextInput
                          placeholder="Gender (Male/Female/Other)"
                          style={styles.input}
                          value={gender}
                          onChangeText={(text) => {
                              setGender(text);
                              setGenderError('');
                          }}
                      />
                  </View>
                  {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}
  
                  {/* Save Button */}
                  <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                      <Text style={styles.buttonText}>Save & Continue</Text>
                  </TouchableOpacity>
              </View>
          </>
      );
  };
  
  export default SignUpNextScreen;
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          paddingHorizontal: 20,
      },
      topSection: {
          backgroundColor: '#800000',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          padding: 30,
          marginBottom: 20,
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
      inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#800000',
          borderRadius: 25,
          padding: 12,
          width: '100%',
          marginBottom: 10,
      },
      icon: {
          marginRight: 10,
      },
      input: {
          flex: 1,
      },
      errorText: {
          color: 'red',
          fontSize: 12,
          alignSelf: 'flex-start',
          marginLeft: 10,
          marginBottom: 5,
      },
      button: {
          backgroundColor: '#800000',
          paddingVertical: 15,
          borderRadius: 25,
          width: '100%',
          alignItems: 'center',
          marginTop: 20,
      },
      buttonText: {
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
      },
  });
  