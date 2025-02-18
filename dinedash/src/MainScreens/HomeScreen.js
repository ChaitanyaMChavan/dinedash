import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const [foodData, setFoodData] = useState([]);
    const [locationName, setLocationName] = useState('Fetching...'); // Store location name

    const foodDataQry = firebase.firestore().collection('FoodData');

    useEffect(() => {
        foodDataQry.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()));
        });
    }, []);

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

    const getLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });

            const { latitude, longitude } = location.coords;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);

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
                return city ? city : country; // Ensure city is not undefined
            }
        } catch (error) {
            console.log('Error fetching location name:', error);
        }
        return null;
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#FF3F00'} />
            {/* ✅ Pass location name as a prop */}
            <Headerbar location={locationName} />
            
            <TouchableOpacity style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="black" style={{ color: '#FF3F00' }} />
                <Text style={styles.input}>Search</Text>
            </TouchableOpacity>
            
            <Categories />
            <OffreSlider />
            <CardSlider navigation={navigation} data={foodData}  />
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
        color: '#c4c4c4',
    },
});

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { StatusBar } from 'expo-status-bar'
// import Headerbar from '../Components/Headerbar'
// import AntDesign from '@expo/vector-icons/AntDesign';
// import Categories from '../Components/Categories';
// import OffreSlider from '../Components/OffreSlider';
// import CardSlider from '../Components/CardSlider';
// import { firebase } from '../Firebase/FirebaseConfig'
// import * as Location from 'expo-location';

// const HomeScreen = ({navigation}) => {
//     const [foodData, setFoodData] = useState([])

//     const foodDataQry = firebase.firestore().collection('FoodData')

//     useEffect(() => {
//         foodDataQry.onSnapshot(snapshot => {
//             setFoodData(snapshot.docs.map(doc => doc.data()))
//         })
//     }, [])

//     // console.log('ye hai food Data', foodData)


//     const requestLocationPermission = async () => {
       
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             console.log('Permission to access location was denied');
//             return;
//         }
//         // Permission granted, continue with obtaining the location
//         getLocation()

//     };

//     useEffect(() => {
//         requestLocationPermission()
//     },[])

//     const getLocation = async () => {
//         try {
//           const location = await Location.getCurrentPositionAsync({});
//           const { latitude, longitude } = location.coords;
//           console.log('Latitude:', latitude);
//           console.log('Longitude:', longitude);
     
//           const locationName = await getLocationName(latitude, longitude);
//           console.log('This is the real name of the location:', locationName);
  

//           // Do something with the latitude and longitude values
//         } catch (error) {
//           console.log('Error getting location:', error);
//         }
//       };



//       const getLocationName = async (latitude, longitude) => {
//         try {
//           const geocode = await Location.reverseGeocodeAsync({
//             latitude,
//             longitude
//           });
    
//           if (geocode.length > 0) {
//             const { city, country } = geocode[0];
//             const locationName = city ? `${city}, ${country}` : country; // Ensure city is not undefined
//             console.log('Location Name:', locationName);
//             return locationName;
//         }
//         } catch (error) {
//           console.log('Error fetching location name:', error);
//         }
    
//         return null;
//       };

//     return (
//         <View styles={styles.mainContainer}>
//             <StatusBar backgroundColor={'#FF3F00'} />

//             <Headerbar />

//             <TouchableOpacity style={styles.searchbox}>
//                 <AntDesign name="search1" size={24} color="black" style={{color:'#FF3F00'}} />
//                 <Text style={styles.input}>Search</Text>
//             </TouchableOpacity>

//             <Categories />
            
//             <OffreSlider/>

//             <CardSlider navigation = {navigation} data= {foodData}/>


//         </View>
//     )
// }

// export default HomeScreen

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         height: '100%'
//     },
//     searchbox: {
//         flexDirection: 'row',
//         width: '92%' ,
//         backgroundColor: 'white',
//         padding: 10,
//         marginVertical: 10,
//         alignSelf: 'center',
//         borderRadius: 20,
//         alignItems: 'center',
//         elevation: 2,
//     },
//     input: {
//         marginLeft: 10,
//         width: '90%',
//         fontSize: 16,
//         color: '#c4c4c4',

//     }

// })