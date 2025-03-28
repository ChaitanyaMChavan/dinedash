import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const CardSlider = ({ navigation, data }) => {
    // Navigate to ProductScreen
    const openProductHandler = (item) => {
        navigation.navigate('ProductScreen', item);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.cardouthead}>Today's Special Food</Text>
            <SafeAreaView>
                <FlatList
                    style={styles.flatliststyle}
                    showsVerticalScrollIndicator={false}  // ✅ Hide scrollbar for cleaner UI
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 10 }} // ✅ Adds spacing at the bottom
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => openProductHandler(item)}
                        >
                            <Image
                                source={{ uri: item.FoodImageUrl }}
                                style={styles.cardImage}
                            />

                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{item.FoodName}</Text>
                                <View style={styles.cardDetails}>
                                    <Text style={styles.cardCategory}>Fast Food</Text>
                                    <Text style={styles.cardPrice}>
                                        Price - <Text>{item.FoodPrice} Rs</Text>
                                    </Text>
                                    <Text
                                        style={[
                                            styles.foodTypeTag,
                                            { backgroundColor: item.FoodType === "Veg" ? "green" : "red" }
                                        ]}
                                    >
                                        {item.FoodType}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

export default CardSlider;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    cardouthead: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        paddingLeft: 5,
        color: '#424242',
    },
    flatliststyle: {
        width: '100%',
    },
    card: {
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        width: '100%',
        marginBottom: 15,  // ✅ Space between vertical cards
        overflow: 'hidden',
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: width * 0.5,  // ✅ Adjusted aspect ratio for better display
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardCategory: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    cardPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    foodTypeTag: {
        height: 22,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        textTransform: 'capitalize',
    },
});
