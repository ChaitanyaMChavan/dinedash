import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { firebase } from '../Firebase/FirebaseConfig'; // ✅ Import Firestore from compat SDK

const OffreSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const snapshot = await firebase.firestore().collection('offerSlider').get(); // ✅ Use Firestore compat syntax
        const imagesArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSliderImages(imagesArray);
      } catch (error) {
        console.error('Error fetching slider images:', error);
      }
      setLoading(false);
    };

    fetchSliderImages();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        autoplayTimeout={3}
        showsButtons={true}
        removeClippedSubviews={false}
        dotColor="red"
        activeDotColor="black"
        nextButton={<Text><MaterialIcons name="arrow-right" size={24} color="black" /></Text>}
        prevButton={<Text><MaterialIcons name="arrow-left" size={24} color="black" /></Text>}
      >
        {sliderImages.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default OffreSlider;

const styles = StyleSheet.create({
  container: {
    width: '98%',
    height: 200,
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  slide: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
