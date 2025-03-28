import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'
import { useFocusEffect } from '@react-navigation/native'
import {HomeScreen} from '../MainScreens/HomeScreen'

const UserCartScreen = ({ navigation }) => {
    const { userloggeduid } = useContext(AuthContext)

    const [cartdata, setCartdata] = useState(null)
    const [cartAlldata, setCartAlldata] = useState(null)
    const [foodDataAll, setFoodDataAll] = useState([])
    const [itemDataAll, setitemDataAll] = useState([])
    const [ItemCost, setItemCost] = useState('0')
    const [totalCost, setTotalCost] = useState('0')
    const [deliveryCharges, setDeliveryCharges] = useState('0')

    const [paymentpage, setPaymentPage] = useState(false)
    const cardDataHandler = async () => {

        const docref = firebase.firestore().collection('UserCart').doc(userloggeduid);
        console.log(userloggeduid)
        try {
            await docref.get().then((doc) => {
                if (doc.exists) {
                    setCartdata(doc.data())
                    // console.log(cartdata);
                    
                    setCartAlldata(doc.data().cartItems)
                }
                else {
                    console.log('there is no data')
                }
            })
        } catch (error) {
            console.log('Ye hai bo Error', error)
        }
    }
    useEffect(() => {
        cardDataHandler()
    }, [])
    const FoodDataHandler = async () => {
        const foodRef = firebase.firestore().collection('FoodData');
    
        foodRef.onSnapshot(snapshot => {
            const foodData = snapshot.docs.map(doc => doc.data());
    
            setFoodDataAll(prevFoodData => [...foodData, ...prevFoodData]); // Appending new data to existing state
        });
    };
    
    const ItemDataHandler = async () => {
        const itemsRef = firebase.firestore().collection('Items');
    
        itemsRef.onSnapshot(snapshot => {
            const itemData = snapshot.docs.map(doc => doc.data());
    
            setFoodDataAll(prevFoodData => [...prevFoodData, ...itemData]); // Merging ItemData into FoodDataAll
            console.log(foodDataAll)
        });
    };
    
    useEffect(() => {
        FoodDataHandler()
        ItemDataHandler()
    }, [])

    const TotalPriceHandler = () => {
        if (cartAlldata && cartAlldata.length > 0) {
            let totalfoodprice = cartAlldata.reduce((total, item) => total + item.totalFoodPrice,0);
    console.log(totalfoodprice)
            setItemCost(totalfoodprice.toString());
    
            // Set dynamic delivery charges (example: Free above 500, otherwise 50)
            const deliveryCharge = totalfoodprice > 500 ? 0 : 50;
            setDeliveryCharges(deliveryCharge.toString());
    
            // Calculate total cost including delivery charges
            setTotalCost((totalfoodprice + deliveryCharge).toString());
        } else {
            setItemCost("0");
            setDeliveryCharges("0");
            setTotalCost("0");
        }
    };
    

    useEffect(() => {
        TotalPriceHandler();
    }, [cartAlldata, totalCost, ItemCost]);
    
   
    const DeleteButtonhandler = async (item) => {
        console.log('Deleting item:', item);
    
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
    
        const docSnapshot = await docRef.get();
        const cartData = docSnapshot.data();
    
        if (cartData && cartData.cartItems) {
            if (cartData.cartItems.length === 1) {
                await docRef.update({
                    cartItems: firebase.firestore.FieldValue.delete(),
                });
            } else {
                await docRef.update({
                    cartItems: firebase.firestore.FieldValue.arrayRemove(item),
                });
            }
            // **Reduce total cost dynamically**
            let newTotalCost = parseInt(totalCost) - (parseInt(item.FoodPrice) * item.FoodQuantity);
            setTotalCost(newTotalCost.toString());
            let newItemCost = parseInt(ItemCost) - (parseInt(item.FoodPrice) * item.FoodQuantity);
            setItemCost(newItemCost.toString());
            // Adjust delivery charges dynamically
            const deliveryCharge = newTotalCost > 500 ? 0 : 50;
            setDeliveryCharges(deliveryCharge.toString());
            console.log('New Total Cost:', newTotalCost);
            // Refresh cart data from Firestore
            cardDataHandler();
        }
    };
    // console.log('Ye hai Data braso', ItemCost, totalCost,)
    const deleteCart = async () => {
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            await docRef.delete();
            console.log('Document successfully deleted.');
        } else {
            console.log('Document does not exist.');
        }
    };

    const [updatedCartData, setUpdatedCartData] = useState(null);
    const addingSomedata = (docid, date) => {
        if (cartdata !== null) {
            const updatedData = { ...cartdata };
            updatedData.cartItems.forEach((item) => {
                item.orderId = docid;
                item.orderDate = date;
            });
            // console.log('Updated cart data:', updatedData);
            setUpdatedCartData(updatedData);
        }
    }
    const PlaceNow = async () => {
        console.log('ye ho gya bhai')
        const cDate = new Date().getTime().toString()
        const docid = new Date().getTime().toString() + userloggeduid;
        const orderdatadoc = firebase.firestore().collection('UserOrders').doc(docid)
        const orderitemstabledoc = firebase.firestore().collection('OrderItems').doc(docid)
         addingSomedata(docid, cDate);
        if (updatedCartData !== null) {
            try {
                await orderitemstabledoc.set({ ...updatedCartData });
                await orderdatadoc.set({
                    orderid: docid,
                    orderstatus: 'Pending',
                    ordercost: totalCost,
                    orderdate: new Date().toLocaleDateString(),
                    orderTime : new Date().toLocaleTimeString(),
                    userid: userloggeduid,
                    userpayment: 'COD',
                    paymenttotal: totalCost
                })
                await deleteCart();
                alert('Order placed successfully.');
                navigation.navigate('Home');
            } catch (error) {
                console.log('Error placing order:', error);
                alert('Error placing order. Please try again.');
            }
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            cardDataHandler();
            TotalPriceHandler()
            console.log('triggered cart')
        }, [])
    );
    if (paymentpage === true) {
        return (
            <View style={styles.mainContainer}>
                <View style={{ backgroundColor: '#971013', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Close</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 15 }}>Payment Options</Text>
                        <TouchableOpacity style={{ backgroundColor: '#971013', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10 }} onPress={() => { alert('Selected') }}>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Cash on Delivery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingBottom: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 15 }}>Delivery Location</Text>
                        <TouchableOpacity style={{ backgroundColor: '#971013', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10 }} onPress={() => { alert('Selected') }}>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Current Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#971013', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10, marginTop: 10 }} onPress={() => { alert('Selected') }}>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Change Location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingTop: 10, borderTopWidth: 1, borderColor: '#c9c9c9' }}>
                        <TouchableOpacity style={{ backgroundColor: '#971013', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10, marginTop: 10, alignItems: 'center' }} onPress={() => PlaceNow() }>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
    
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <SafeAreaView>
                        <Text style={styles.containerHead}>My Cart</Text>
    
                        <View style={styles.cartout}>
                            {cartAlldata === null ? (
                                <Text style={styles.emptyCartText}>Your Cart is Empty!</Text>
                            ) : (
                                <FlatList
                                    style={styles.FlatListCont}
                                    data={cartAlldata}
                                    keyExtractor={(item) => item.item_id}
                                    renderItem={({ item }) => {
                                        const nData = 
                                            foodDataAll.find((items) => items.id === item.item_id) ||
                                            itemDataAll.find((items) => items.id === item.item_id);
                                        
                                        if (!nData) return null; // Prevent rendering if no data found
    
                                        return (
                                            <View style={styles.containerCardList}>
                                                <View style={styles.containerCard}>
                                                    <Image source={{ uri: nData.FoodImageUrl }} style={styles.cardimage} />
                                                    <View style={styles.containerCard_in}>
                                                        <View style={styles.containerCard_in1}>
                                                            <Text>Mera Dhabha</Text>
                                                        </View>
                                                        <View style={styles.containerCard_in2}>
                                                            <Text style={styles.containerCard_in2_itemName}>{nData.FoodName}</Text>
                                                            <Text style={styles.containerCard_in2_itemPrice}>{nData.FoodPrice}₹ for one</Text>
                                                            <Text style={styles.containerCard_in2_itemQty}>Quantity: {item.FoodQuantity}</Text>
                                                        </View>
                                                        <View style={styles.containerCard_in3}>
                                                            <TouchableOpacity 
                                                                style={styles.containerCard_in3_btn} 
                                                                onPress={() => DeleteButtonhandler(item)}
                                                            >
                                                                <Text style={styles.containerCard_in3_btn_txt}>Delete</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            )}
                        </View>
    
                        {/* Total Cost Section */}
                        {totalCost && totalCost !== '0' ? (
                            <>
                                <View style={{ marginTop: 10 }}>
                                    <View style={styles.costContainer}>
                                        <View style={styles.costRow}>
                                            <Text style={styles.costLabel}>Item Cost:</Text>
                                            <Text style={styles.costValue}>{ItemCost}₹</Text>
                                        </View>
                                        <View style={styles.costRow}>
                                            <Text style={styles.costLabel}>Delivery Charges:</Text>
                                            <Text>{deliveryCharges}₹</Text>
                                        </View>
                                        <View style={styles.costRow}>
                                            <Text style={styles.costLabel}>Service Charges:</Text>
                                            <Text>0₹</Text>
                                        </View>
                                    </View>
                                </View>
    
                                {/* Place Order Button */}
                                <View style={styles.btnCont}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.totalLabel}>Total:</Text>
                                        <Text style={styles.totalValue}>{totalCost}₹</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.placeOrderBtn} 
                                        onPress={() => setPaymentPage(true)}
                                    >
                                        <Text style={styles.placeOrderText}>Place Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : null}
                    </SafeAreaView>
                </View>
            </ScrollView>
        </View>
    );
}
export default UserCartScreen
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#971013',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 30,
    },
    closeText: {
        fontSize: 16,
        color: 'white',
    },
    container: {
        flex: 1,
        paddingBottom: 20,
    },
    containerHead: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    cartout: {
        marginHorizontal: 16,
    },
    emptyCartText: {
        fontSize: 17,
        color: 'grey',
        textAlign: 'center',
    },
    FlatListCont: {
        marginVertical: 10,
    },
    containerCardList: {
        marginBottom: 10,
    },
    containerCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    cardimage: {
        width: 90,
        height: 80,
        borderRadius: 15,
    },
    containerCard_in: {
        flex: 1,
        paddingLeft: 10,
    },
    containerCard_in1: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerCard_in2: {
        marginVertical: 5,
    },
    containerCard_in2_itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerCard_in2_itemPrice: {
        color: '#555',
    },
    containerCard_in2_itemQty: {
        fontWeight: 'bold',
    },
    containerCard_in3: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerCard_in3_btn: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    containerCard_in3_btn_txt: {
        color: 'white',
        fontWeight: 'bold',
    },
    costContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '95%',
        alignSelf: 'center',
        marginVertical: 5,
        paddingVertical: 5,
        elevation: 3,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        marginVertical: 3,
    },
    costLabel: {
        fontWeight: '600',
    },
    costValue: {
        fontWeight: '600',
    },
    btnCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 5,
    },
    placeOrderBtn: {
        backgroundColor: '#971013',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    placeOrderText: {
        fontSize: 17,
        fontWeight: '500',
        color: 'white',
    },
});