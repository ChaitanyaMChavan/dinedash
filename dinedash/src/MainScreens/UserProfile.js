import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
  ImageBackground, Image, ActivityIndicator, Alert
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritesScreen from '../Components/FavoritesScreen';

const UserProfile = () => {
  const { data1, userloggeduidHandler } = useContext(AuthContext);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    if (data1?.userloggeduid) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [data1]);

  const fetchUserProfile = async () => {
    try {
      const docRef = firebase.firestore().collection('UserProfiles').doc(data1.userloggeduid);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        setUserData(docSnap.data());
        setUpdatedData(docSnap.data()); // Initialize editable data
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await firebase.firestore().collection('UserProfiles').doc(data1.userloggeduid).update(updatedData);
      setUserData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
              await AsyncStorage.removeItem('userloggeduid'); // Remove user ID from storage
              await firebase.auth().signOut(); // Firebase logout
              userloggeduidHandler(null); // Clear user state in context
              navigation.navigate('Welcome'); // Redirect to Login screen
            } catch (error) {
              console.log("Logout Error:", error);
              Alert.alert("Error", "Something went wrong while logging out.");
            }
          }
        }
      ]
    );
  };

 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#971013" />
        <Text>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/fav1_deakil.jpg')} style={styles.backgroundImage}>
        <View style={styles.overlay} />
      </ImageBackground>
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.profileIcon} />

        {/* Editable Name Field */}
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.profileNameInput]}
            value={updatedData?.name}
            onChangeText={(text) => setUpdatedData({ ...updatedData, name: text })}
          />
        ) : (
          <Text style={styles.profileName}>{userData?.name || 'User'}</Text>
        )}

        <View style={styles.profileDetails}>
          {/* Editable Fields */}
          {[
            { label: 'Mobile number:', key: 'phone', keyboardType: 'phone-pad' },
            { label: 'Email Address:', key: 'email', keyboardType: 'email-address' },
            { label: 'Address:', key: 'address' },
            { label: 'Date of Birth:', key: 'dob', placeholder: 'YYYY-MM-DD' },
            { label: 'Gender:', key: 'gender', placeholder: 'Male/Female/Other' },
          ].map(({ label, key, keyboardType, placeholder }) => (
            <View key={key} style={styles.profileInfoContainer}>
              <Text style={styles.profileLabel}>{label}</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={updatedData?.[key] || ''}
                  onChangeText={(text) => setUpdatedData({ ...updatedData, [key]: text })}
                  keyboardType={keyboardType || 'default'}
                  placeholder={placeholder || ''}
                />
              ) : (
                <Text style={styles.profileInfo}>{userData?.[key] || 'N/A'}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {/* Edit / Save Button */}
          {isEditing ? (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>
                <FontAwesome5 name="save" size={16} /> Save Changes
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>
                <FontAwesome5 name="edit" size={16} /> Edit Profile
              </Text>
            </TouchableOpacity>
          )}

          {/* Logout Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>
              <FontAwesome5 name="power-off" size={16} /> Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  overlay: {
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
  },
  profileContainer: {
    height: '100%',
    backgroundColor: '#971013',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: '55%',
    alignItems: 'center',
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -70,
  },
  profileName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  profileDetails: {
    width: '85%',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  profileLabel: {
    color: 'white',
    fontSize: 18,
    width: '40%',
  },
  profileInfo: {
    color: 'white',
    fontSize: 18,
    width: '55%',
    textAlign: 'right',
  },
  input: {
    color: 'white',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '55%',
    textAlign: 'right',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 150,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#971013',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
