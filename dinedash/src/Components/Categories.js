import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '../Firebase/FirebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Categories = () => {
  const navigation = useNavigation(); // Get navigation object
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');

      const categoryList = [];
      const snapshot = await firebase.firestore().collection('Category').get();

      snapshot.forEach(doc => {
        categoryList.push({ id: doc.id, ...doc.data() });
      });

      console.log('Fetched Categories:', categoryList);
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.box, { backgroundColor: '#ddfbf3' }]}
            onPress={() => navigation.navigate('CategoryDetail', { categoryType: item.type })} // Navigate to details page
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  head: {
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
    paddingBottom: 5,
    paddingLeft: 5
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 10
  },
  box: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  },
  text: {
    marginLeft: 5
  }
});
