import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const OffreSlider = () => {
  return (
    <View style = {styles.container}>
      <Swiper
      autoplay ={true}
      autoplayTimeout={5}
      showsButtons ={true}
      removeClippedSubviews={false}
      dotColor='red'
      activeDotColor='black'
      nextButton={<Text><MaterialIcons name="arrow-right" size={24} color="black" /></Text>}
      prevButton={<Text><MaterialIcons name="arrow-left" size={24} color="black" /></Text>}>


        <View style = {styles.slide}>
            <Image source={require('../Images/Swipper1.jpg')} style ={styles.image}/>
        </View>
        <View style = {styles.slide}>
            <Image source={require('../Images/Swipper2.jpg')} style ={styles.image}/>
        </View>
        <View style = {styles.slide}>
            <Image source={require('../Images/Swipper3.webp')} style ={styles.image}/>
        </View>
      </Swiper>
    </View>
  )
}

export default OffreSlider

const styles = StyleSheet.create({
    container: {
        width: '98%',
        height: 200,
        alignSelf: 'center'

    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    slide: {
        width:'100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    }
})