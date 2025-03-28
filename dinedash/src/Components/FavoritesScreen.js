import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Headerbar from '../Components/Headerbar';
import CardSlider from '../Components/CardSlider';
import { firebase } from '../Firebase/FirebaseConfig';
import * as Location from 'expo-location';

const FavouriteScreen = ({ navigation }) => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    const favouriteDataQry = firebase.firestore().collection('Favourites');
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
    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        const unsubscribe = favouriteDataQry.onSnapshot(
            snapshot => {
                if (!snapshot.empty) {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id, // Ensure each item has a unique key
                        ...doc.data(),
                    }));
                    setFavourites(data);
                } else {
                    console.log("No favourites found.");
                    setFavourites([]); // Ensure empty state works
                }
                setLoading(false);
            },
            error => {
                console.error("Error fetching favourites:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#971013'} />
            <Headerbar title="Favourites" location={locationName} />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : favourites.length > 0 ? (
                <View style={{ flex: 1, marginBottom: 20 }}>
                    <CardSlider navigation={navigation} data={favourites} />
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favourites added yet!</Text>
                </View>
            )}
        </View>
    );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#971013',
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
});
