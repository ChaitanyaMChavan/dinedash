import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Headerbar from '../Components/Headerbar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories from '../Components/Categories';
import OffreSlider from '../Components/OffreSlider';
import CardSlider from '../Components/CardSlider';
import { firebase } from '../Firebase/FirebaseConfig';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
    const [FoodData, setFoodData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
    const foodDataQry = firebase.firestore().collection('FoodData');
    const [locationName, setLocationName] = useState('Fetching...');
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            setLocationName("Location Denied");
            return;
        }
        await getLocation();
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        const unsubscribe = foodDataQry.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            setFoodData(data);
            setFilteredData(data); // Initialize filteredData with full list
        });

        return () => unsubscribe();
    }, []);

    
    const getLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            const { latitude, longitude } = location.coords;
            const locationName = await getLocationName(latitude, longitude);
            setLocationName(locationName || "Unknown Location");
        } catch (error) {
            console.log('Error getting location:', error);
            setLocationName("Error Fetching Location");
        }
    };

    const getLocationName = async (latitude, longitude) => {
        try {
            const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (geocode.length > 0) {
                const { city, country } = geocode[0];
                return city ? city : country;
            }
        } catch (error) {
            console.log('Error fetching location name:', error);
        }
        return null;
    };

    // Handle search input change
    const handleSearch = (text) => {
        setSearchText(text);
        if (!FoodData || FoodData.length === 0) return;

        if (text.trim() === '') {
            setFilteredData(FoodData);
        } else {
            const filtered = FoodData.filter(item =>
                item?.FoodName?.toLowerCase()?.includes(text.toLowerCase()) // Safe check
            );
            setFilteredData(filtered);
        }
    };


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#971013'} />
            <Headerbar location={locationName} />

            {/* ✅ Active Search Bar */}
            <View style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="#971013" />
                <TextInput
                    style={styles.input}
                    placeholder="Search food..."
                    value={searchText}
                    onChangeText={handleSearch}
                    autoCapitalize="none"
                />
            </View>
            {searchText=="" ?
                (<View><Categories />
                    <OffreSlider /></View>)
                : ""}
            {/* ✅ Updated CardSlider with filtered data */}
            <View style={{ flex: 1, marginBottom: 20 }}>
                <CardSlider navigation={navigation} data={filteredData} />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%',
    },
    searchbox: {
        flexDirection: 'row',
        width: '92%',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 2,
    },
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize: 16,
        color: '#333',
    },
});
