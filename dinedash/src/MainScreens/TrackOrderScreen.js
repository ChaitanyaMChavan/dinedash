import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext'
import TrackOrderItems from '../Components/TrackOrderItems'
import { FlatList } from 'react-native-gesture-handler'

const TrackOrderScreen = ({ navigation }) => {
  const { userloggeduid, } = useContext(AuthContext);
  const [orders, setOrders] = useState([])
  const [foodData, setFoodData] = useState([]);
  const [foodDataAll, setFoodDataAll] = useState([]);
  const [itemDataAll, setitemDataAll] = useState([]);   
  const getorders = async () => {
    const ordersRef = firebase.firestore().collection('UserOrders').where('userid', '==', userloggeduid);
    ordersRef.onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => doc.data()))
    })
  }
  useEffect(() => {
    getorders()
  }, [])
  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      const foodRef = firebase.firestore().collection('OrderItems');
      foodRef.onSnapshot(snapshot => {
        setFoodData(snapshot.docs.map(doc => doc.data().cartItems))
      }
      )
    };
    fetchData();
  }, []);
  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      const foodRef = firebase.firestore().collection('FoodData');
      const itemsRef = firebase.firestore().collection('Items');
  
      // Fetch Items collection
      itemsRef.onSnapshot(snapshot => {
        setitemDataAll(snapshot.docs.map(doc => doc.data()));
      });
  
      // Fetch FoodData collection
      foodRef.onSnapshot(snapshot => {
        setFoodDataAll(snapshot.docs.map(doc => doc.data()));
      });
    };
  
    fetchData();
  }, []);
  
  // console.log(' yha par dikat hai,', orders)
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: 'white' }}>Close</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderid} // Ensure unique keys
        contentContainerStyle={{ paddingBottom: 100 }} // Prevents content clipping
        ListHeaderComponent={() => <Text style={styles.mainHeading}>My Orders</Text>} // Header text
        renderItem={({ item }) => (
          <View style={styles.mainContainer}>
            <Text style={styles.orderId}>Order id: {item.orderid.substring(0, 15)}</Text>
            <Text style={styles.orderTime}>Date: {item.orderdate || "No date Available"}</Text>
            <Text style={styles.orderTime}>Time: {item.orderTime || "No Time Available"}</Text>
            {/* Pass order ID to TrackOrderItems */}
            <TrackOrderItems foodDataAll={foodDataAll} itemDataAll ={itemDataAll} data={item.orderid} navigation={navigation} />
            <Text style={styles.orderTotal}>Total: ${item.ordercost}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default TrackOrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    borderRadius: 20,
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
  },
  orderItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'green',
    marginVertical: 2,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    elevation: 2
  },
  cardimage: {
    width: 90,
    height: 80,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  },
  orderItemContainer_2: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '600'
  },
  orderItemPrice: {

  }

})