import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';

const UserProfile = () => {
  const { data1 } = useContext(AuthContext);  // Getting logged-in user details
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);

  // console.log("AuthContext Data:", data1);

  useEffect(() => {
    console.log(data1)
    if (data1?.userloggeduid) {
      console.log("Fetching profile for UID:", data1.userloggeduid);
      fetchUserProfile();
    } else {
      console.log("No user UID found.");
      setLoading(false);  // Stop loading if no UID is found
    }
  }, [data1]);

  const fetchUserProfile = async () => {
    try {
      const docRef = firebase.firestore().collection('UserProfiles').doc(data1.userloggeduid);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const data = docSnap.data();
        console.log("Fetched Data:", data);
        setUserData(data);
        setUpdatedData(data);
      } else {
        console.log("No profile found for this user.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false); // Ensure loading stops
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const docRef = firebase.firestore().collection('UserProfiles').doc(data1.userloggeduid);
      await docRef.set(updatedData, { merge: true });
      setUserData(updatedData);
      setIsEditing(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3F00" />
        <Text>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome5 name="user-alt" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={updatedData?.name || ''}
          onChangeText={(text) => handleChange('name', text)}
          editable={isEditing}
        />
      </View>

      <View style={styles.container_Inputfield}>
        <Entypo name="email" size={21} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={updatedData?.email || ''}
          onChangeText={(text) => handleChange('email', text)}
          editable={false}
        />
      </View>

      <View style={styles.container_Inputfield}>
        <Entypo name="address" size={21} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={updatedData?.address || ''}
          onChangeText={(text) => handleChange('address', text)}
          editable={isEditing}
        />
      </View>

      <View style={styles.container_Inputfield}>
        <FontAwesome5 name="phone" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={updatedData?.phone || ''}
          onChangeText={(text) => handleChange('phone', text)}
          editable={isEditing}
        />
      </View>

      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonTxt}>Save Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonTxt}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#FF3F00',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 30
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  container_Inputfield: {
    flexDirection: 'row',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 16,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#000'
  },
  icon: {
    paddingLeft: 5
  },
  button: {
    backgroundColor: '#FF3F00',
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
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
