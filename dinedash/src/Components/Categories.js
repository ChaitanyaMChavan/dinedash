import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.box , {backgroundColor: '#ddfbf3'}]}>
            <Image source={require('../Images/pizza.webp')} style ={styles.image}/>
            <Text style ={styles.text}>pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box , {backgroundColor: '#f5e5ff'}]}>
            <Image source={require('../Images/burger.webp')} style ={styles.image}/>
            <Text style ={styles.text}>burger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box , {backgroundColor: '#e5f1ff'}]}>
            <Image source={require('../Images/fries.png')} style ={styles.image}/>
            <Text style ={styles.text}>fries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box , {backgroundColor: '#ebfde5'}]}>
            <Image source={require('../Images/pizza.webp')} style ={styles.image}/>
            <Text style ={styles.text}>pizza</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    container:{
        width: '100%',
        // backgroundColor: 'green',
        borderRadius: '10'
    },
    head:{
        fontSize: 20,
        fontWeight: '600',
        margin: 10,
        paddingBottom: 5,
        paddingLeft: 5
    },
    image: {
        height: 30,
        width: 30
    },
    box: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10 ,
        padding: 10,
        borderRadius: 20,
        alignItems : 'center',
        justifyContent: 'center',
        elevation: 2
    },
    text: {
        marginLeft: 5
    }
})