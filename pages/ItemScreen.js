import { Text, View, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/Primarybutton";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemScreen({ navigation, route }) {
    // product information was passed from ShopScreen when routed as a prop
    const product = route.params.product;

    async function addToCart(product) {
        try {
            const cart = JSON.parse(await AsyncStorage.getItem("cart"));
            const newProduct = {
                id: cart.length + 1,
                img: product.image,
                title: product.title,
                price: product.price,
                ecoRating: product.ecoRating,
                ecoPoints: product.ecoPoints,
                quantity: 1,
            };
            const newCart = [...cart, newProduct];
            await AsyncStorage.setItem("cart", JSON.stringify(newCart));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.headerText}>Back</Text>
                    </Pressable>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={styles.imageOuterContainer}>
                    <View style={styles.imageInnerContainer}>
                        <Pressable onPress={() => navigation.navigate("ImageDisplayScreen", { imagesource: product.image })}>
                            <Image style={styles.productImage} source={product.image} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.productName}>{product.title}</Text>
                        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                        <Text style={styles.productDescription}>Description: {product.description}</Text>
                        <Text style={styles.productEcoDescription}>{product.ecoDescription}</Text>
                        <Text style={styles.ecoRating}>
                            Eco-Rating <Image source={require("../assets/ui/leaf.png")} style={styles.leafIcon} />: {product.ecoRating}
                        </Text>
                        <Text style={styles.productEcoRating}>Eco-Rating Scale: 0.0 (least eco-friendly) to 1.0 (most eco-friendly)</Text>
                        <Text style={styles.productEcoRating}>This product ({product.ecoRating}) meets a high standard for its sustainability and environmental impact</Text>
                    </ScrollView>
                </View>
                <PrimaryButton
                    onPress={() => {
                        addToCart(product);
                        navigation.goBack();
                    }}
                >
                    Add to Cart
                </PrimaryButton>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingTop: 60,
    },
    headerText: {
        fontSize: 18,
        color: "white",
    },
    container: {
        padding: 10,
        flex: 1,
    },
    imageOuterContainer: {
        padding: 10,
        flexDirection: "row",
        height: "50%",
    },
    imageInnerContainer: {
        borderRadius: 30,
        overflow: "hidden",
        flex: 1,
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 20,
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 15,
        marginBottom: 5,
    },
    productEcoDescription: {
        fontSize: 15,
        marginBottom: 5,
    },
    ecoRating: {
        fontSize: 20,
        marginBottom: 10,
        color: "green",
        fontWeight: "bold",
    },
    productEcoRating: {
        fontSize: 15,
        marginBottom: 10,
        color: "green",
    },
    leafIcon: {
        width: 30,
        height: 30,
    },
    addButton: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
    },
    greentext: {
        color: "green",
        marginBottom: 5,
    },
});
