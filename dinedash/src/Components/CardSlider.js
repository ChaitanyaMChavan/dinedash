import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const CardSlider = ({ navigation, data, orientation = "horizontal" }) => {

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
                    showsHorizontalScrollIndicator={false}
                    horizontal={orientation === "horizontal"}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}  // ✅ Corrected keyExtractor
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.card, orientation === "horizontal" ? styles.horizontalCard : styles.verticalCard]}
                            onPress={() => openProductHandler(item)}
                        >

                            <Image
                                source={{ uri: item.FoodImageUrl }}
                                style={[orientation === "horizontal" ? styles.horizontalCardImage : styles.verticalCardImage]} // ✅ Improved conditional styling
                            />


                            <View style={styles.cardin1}>
                                <Text style={styles.cardin1txt}>{item.FoodName}</Text>
                                <View style={styles.cardin2}>
                                    <Text style={styles.cardin2txt1}>Fast Food</Text>
                                    <Text style={styles.cardin2txt1}>
                                        Price - <Text>{item.FoodPrice} Rs</Text>
                                    </Text>
                                    <Text style={[styles.cardin2txt3, { backgroundColor: item.FoodType === "Veg" ? "green" : "red" }]}>
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
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 10,
        paddingLeft: 5,
        color: '#424242',
    },
    horizontalCardImage: {
        width: '100%',
        height: '70%',  // ✅ Fixed height using screen width
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    verticalCardImage: {
        width: '100%',
        height: width * 0.56,  // ✅ Adjusted for better aspect ratio
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    card: {
        borderRadius: 17,
        backgroundColor: '#dedede',
    },
    
    horizontalCard: {
        width: width * 0.80,  // ✅ Fixed width for horizontal cards
        height: width * 0.45, // ✅ Adjusted height
        marginLeft: 5,
        marginTop: 10,
    },
    verticalCard: {
        width: '100%',  // ✅ Full width for vertical cards
        height: width * 0.7, // ✅ Adjusted for better height ratio
        marginBottom:5
    },
    cardin1: {
        marginHorizontal: 3,
        marginTop: 3,
    },
    cardin1txt: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 5,
    },
    cardin2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    cardin2txt1: {
        fontSize: 12,
        marginRight: 10,
        fontWeight: '500',
    },
    cardin2txt3: {
        height: 20,
        borderRadius: 10,
        fontSize: 10,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 7,
        textAlignVertical: 'center',
        textTransform: 'capitalize',
    },
});
