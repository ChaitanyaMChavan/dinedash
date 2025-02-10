import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const ProductScreen = () => {
  return (
    <ScrollView style ={styles.container}>
        <StatusBar backgroundColor={'#FF3F00'} />
      <View style={{backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, height: 50, marginTop: 20}}>
        <TouchableOpacity>
            <Text style={{color: 'white'}}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.containerIn}>
        <View style = {styles.containerIn1}>
            <Image source= {require('../Images/pizza2.jpg')} style={styles.cardimage}/>
        </View>

        <View style = {styles.containerIn2}>
            <View style = {styles.containerIn2_s1}>
                <Text style = {styles.containerIn2_s1_foodname}>Pizza</Text>
                <Text style = {styles.containerIn2_s1_foodprice}>100Rs</Text>
            </View>
            <View style = {styles.containerIn2_s2}>
                <Text style = {styles.containerIn2_s2_head}>About item</Text>
                <Text style = {styles.containerIn2_s2_description}>Best Food that is available in our country </Text>
                <Text style = {styles.containerIn2_s2_veg}>VEG </Text>
            </View>
            <View style = {styles.containerIn2_s3}>
                <Text style = {styles.containerIn2_s3_restaurantnameheading}>Restaurant Name</Text>
                <Text style = {styles.containerIn2_s3_restaurantname}>Baba Ka Dhabha</Text>
            </View>
            
        </View>
        <View style={styles.containerIn3}>
        <TouchableOpacity style={styles.containerIn3_buybtn}>
            <Text style={styles.containerIn3_buybtn_Txt}>Buy </Text>
        </TouchableOpacity>
      
        </View>
      </View>
    </ScrollView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        width: '100%',
        height: '100%'
    },
    containerIn: {
        backgroundColor: '#ebebeb'
    },
    cardimage: {
        width: '100%',
        height: '100%',
        // borderTopLeftRadius: 21,
        // borderTopRightRadius: 21,
    },
    containerIn1: {
        width: '100%',
        height: 220,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerIn2: {
        width: '100%',
        padding: 20,
        position: 'relative',
        top: -30,
        backgroundColor: '#ebebeb',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }, 
    containerIn2_s1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    containerIn2_s1_foodname: {
        fontSize: 25,
        fontWeight: '600',
        width: 220,
        marginRight: 10
    },
    containerIn2_s1_foodprice: {
        fontSize: 26,
        fontWeight: '600',
    },
    containerIn2_s2: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    containerIn2_s2_head: {
        fontSize: 18,
        fontWeight: '600',
    },
    containerIn2_s2_description : {
        fontSize: 15,
        paddingTop: 10,
    },
    containerIn2_s2_veg: {
        width: 70,
        borderRadius: 10,
        backgroundColor: 'green',
        color: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 5
    },
    containerIn2_s3: {
        backgroundColor: '#F2F2F2',
        padding: 20,
        borderRadius: 20,
        width: '100%',
        marginVertical: 10,
        elevation:  2,
        alignSelf: 'center',
        alignItems: 'center'
    },
    containerIn2_s3_restaurantnameheading: {
        color: 'grey',
        fontSize: 20,
        fontWeight: '600'
    },
    containerIn2_s3_restaurantname: {
        color: '#9c9c9c',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
    },
    containerIn3: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row'
    },
    containerIn3_buybtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF3F00',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        color: 'black',
        margin: 10,
        alignSelf: 'center',
    },
    containerIn3_buybtn_Txt: {
        color: '#F2F2F2',
        paddingVertical: 5,
        fontSize: 17,
        borderRadius: 10, 
        textAlign: 'center',
        fontWeight: '600',
        alignSelf: 'center'
    }
})