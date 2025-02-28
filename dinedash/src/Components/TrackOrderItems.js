import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';


const TrackOrderItems = ({ foodDataAll, data, navigation,itemDataAll }) => {
    const { userloggeduid } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);


    const [user, setUser] = useState([]);

    const getuserData = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUser(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserData();
    }, [userloggeduid]);

    // console.log('user is ', user.totalCoin - 5)

    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
            const foodRef = firebase.firestore().collection('OrderItems').doc(data);

            foodRef.onSnapshot(doc => {
                // setOrderData(snapshot.docs.map(doc => doc.data().cartItems))

                // console.log('dekh veere',doc.data() )
                setOrderData(doc.data().cartItems)
            }
            )
            console.log(setOrderData)
        };

        fetchData();
    }, [data]);

    const getDta = (id) => {
        console.log("Searching for ID:", id);
        if (!id) {
            console.log("❌ ID is undefined or null!");
            return [];
        }
    
        console.log("🔍 foodDataAll:", foodDataAll);
        console.log("🔍 itemDataAll:", itemDataAll);
    
        // Combine both arrays
        const nData = [
            ...foodDataAll.filter((item) => item.id === id),
            ...itemDataAll.filter((item) => item.id === id)
        ];
    
        console.log("✅ Found Data:", nData);
        return nData;
    };
    
    //  console.log('ye dekh bhai222', itemDataAll)
    return (
        <View>
            {orderData && orderData.map((order, index) => (
                 <View key={index} >
                 <FlatList style={{ marginTop: 10 }}
                     data={getDta(order.item_id)}
                     renderItem={
                         ({ item }) => {
                             console.log('ye dekh veer23123123', item)
                             return (
                                 <View style={styles.orderItemContainer}>
                                     <View>
                                         <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                                     </View>
                                     <View style={styles.orderItemContainer_2}>
                                         <View>
                                             <Text style={styles.orderItemName}>{item.FoodName}</Text>
                                             <Text style={styles.orderItemPrice} >${item.FoodPrice}</Text>
                                             <Text>Qty : {order.FoodQuantity} unit </Text>
                                         </View>
                                     </View>
                                 </View>
                             )
                         }
                     }
                     nestedScrollEnabled={true} />
             </View>
            ))}
        </View>
    );
}

export default TrackOrderItems

const styles = StyleSheet.create({
    orderItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'green',
        marginVertical: 2,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        elevation: 2,
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
})