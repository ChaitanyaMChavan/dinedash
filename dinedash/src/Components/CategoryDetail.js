import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firebase } from '../Firebase/FirebaseConfig';
import CardSlider from './CardSlider';

const CategoryDetail = ({ route, navigation }) => {
  const { categoryType } = route.params; // Get category type from navigation
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryFoodItems();
  }, []);

  const fetchCategoryFoodItems = async () => {
    try {
      console.log(`Fetching food items for category: ${categoryType}`);
      
      const foodList = [];
      const snapshot = await firebase
      .firestore()
      .collection('Items')
      .where('category', '==', categoryType) // Filter by category
      .get();
      
      snapshot.forEach(doc => {
        foodList.push({ id: doc.id, ...doc.data() });
      });
      
      setFoodItems(foodList);
      console.log(foodList)
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to ProductScreen with food item details
  const openProductHandler = (item) => {
    navigation.navigate('ProductScreen', item);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{categoryType} Items</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>

      {foodItems.length === 0 ? (
        <Text style={styles.noItemsText}>No items available for this category.</Text>
      ) : (
        // <FlatList
        //   data={foodItems}
        //   keyExtractor={(item) => item.id}
        //   renderItem={({ item }) => (
        //     <TouchableOpacity style={styles.itemContainer} onPress={() => openProductHandler(item)}>
        //       <Image source={{ uri: item.image }} style={styles.itemImage} />
        //       <View style={styles.itemDetails}>
        //         <Text style={styles.itemName}>{item.name}</Text>
        //         <Text style={styles.itemPrice}>₹{item.price}</Text>
        //         <Text style={styles.itemRating}>⭐ {item.rating}</Text>
        //       </View>
        //     </TouchableOpacity>
        //   )}
        // />
        <CardSlider navigation={navigation} data={foodItems} orientation='vertical'/>
      )}
    </View>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noItemsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  itemRating: {
    fontSize: 14,
    color: 'orange',
  },
});
