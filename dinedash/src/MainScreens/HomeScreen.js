import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Headerbar from '../Components/Headerbar'
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories from '../Components/Categories';
import OffreSlider from '../Components/OffreSlider';
import CardSlider from '../Components/CardSlider';
import { firebase } from '../Firebase/FirebaseConfig'
// import * as Location from 'expo-location';

const HomeScreen = ({navigation}) => {
    const [foodData, setFoodData] = useState([])

    const foodDataQry = firebase.firestore().collection('FoodData')

    useEffect(() => {
        foodDataQry.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    console.log('ye hai food Data', foodData)

    return (
        <View styles={styles.mainContainer}>
            <StatusBar backgroundColor={'#FF3F00'} />

            <Headerbar />

            <TouchableOpacity style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="black" style={{color:'#FF3F00'}} />
                <Text style={styles.input}>Search</Text>
            </TouchableOpacity>

            <Categories />
            
            <OffreSlider/>

            <CardSlider navigation = {navigation}/>


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%'
    },
    searchbox: {
        flexDirection: 'row',
        width: '92%' ,
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

    }

})