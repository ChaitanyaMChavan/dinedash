import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';
import TrackOrderItems from '../Components/TrackOrderItems';

const TrackOrderScreen = ({ navigation }) => {
  const { userloggeduid } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [foodDataAll, setFoodDataAll] = useState([]);
  const [itemDataAll, setItemDataAll] = useState([]);

  /** ✅ Fetch Orders - Realtime Listener */
  useEffect(() => {
    const ordersRef = firebase.firestore()
      .collection('UserOrders')
      .where('userid', '==', userloggeduid);

    const unsubscribe = ordersRef.onSnapshot(snapshot => {
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,  // ✅ Ensure each order has a unique ID
        ...doc.data()
      }));
      setOrders(orderList);
    });

    return () => unsubscribe(); // ✅ Unsubscribe on unmount
  }, [userloggeduid]);

  /** ✅ Fetch FoodData & Items - Combined Listener */
  useEffect(() => {
    const foodRef = firebase.firestore().collection('FoodData');
    const itemsRef = firebase.firestore().collection('Items');

    const unsubscribeFood = foodRef.onSnapshot(snapshot => {
      setFoodDataAll(snapshot.docs.map(doc => doc.data()));
    });

    const unsubscribeItems = itemsRef.onSnapshot(snapshot => {
      setItemDataAll(snapshot.docs.map(doc => doc.data()));
    });

    return () => {
      unsubscribeFood();
      unsubscribeItems();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: 'white' }}>Close</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id || Math.random().toString()} // ✅ Ensure key is unique
        contentContainerStyle={{ paddingBottom: 100 }} // Prevent content clipping
        ListHeaderComponent={() => <Text style={styles.mainHeading}>My Orders</Text>}
        renderItem={({ item }) => (
          <View style={styles.mainContainer}>
            <Text style={styles.orderId}>Order ID: {item.id.substring(0, 15)}</Text>
            <Text style={styles.orderTime}>Date: {item.orderdate || "No date available"}</Text>
            <Text style={styles.orderTime}>Time: {item.orderTime || "No time available"}</Text>
            {/* Pass order ID to TrackOrderItems */}
            <TrackOrderItems foodDataAll={foodDataAll} itemDataAll={itemDataAll} data={item.id} navigation={navigation} />
            <Text style={styles.orderTotal}>Total: Rs{item.ordercost}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#971013',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 30
  },
  mainHeading: {
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: '500'
  },
  mainContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 20
  },
  orderId: {
    fontSize: 16,
    color: 'grey',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    paddingVertical: 5
  },
  orderTime: {
    paddingHorizontal: 6,
    paddingVertical: 5
  },
  orderTotal: {
    fontSize: 17,
    textAlign: 'right',
    marginVertical: 5,
    marginRight: 20,
    fontWeight: '600'
  }
});
