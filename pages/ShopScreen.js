import { View, Text, ScrollView, Image, StyleSheet, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function renderProductBlock(products, navigation) {
    products = typeof products === undefined ? [] : products;

    return products.map((product) => (
        <Pressable onPress={() => navigation.navigate("ItemScreen", { product: product })}>
            <View style={{ width: 100, marginRight: 20 }}>
                <Image style={{ width: 100, height: 100, marginBottom: 5 }} source={product.image} />
                <Text style={{ marginBottom: 5 }}>{product.title}</Text>
                <Text style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</Text>
            </View>
        </Pressable>
    ));
}

export default function ShopScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const [hotDeals, setHotDeals] = useState([
        {
            id: 1,
            image: require("../assets/econTextbook.png"),
            title: "A-Level ECOnomics Mind Maps by Dr Anthony Fok Second Edition",
            price: 123450,
            ecoRating: 0.87,
            ecoPoints: 10,
            description: "Mastering ECOnomics, Flipping the Bell Curve, and Saving the Planet, One Page at a Time.",
            ecoDescription: "Printed with recycled material",
        },
        {
            id: 2,
            image: require("../assets/econTextbook2.png"),
            title: "A-Level ECOnomics Evaluation Points Book by Anthony Fok",
            price: 543210,
            ecoRating: 0.99,
            ecoPoints: 99,
            description: "Perfecting ECOnomics, Providing A-Grade Answers, and Ending Global Warming Soon.",
            ecoDescription: "Printed with composite material",
        },
    ]);

    useEffect(() => {
        async function initStorage() {
            // reset cart on login
            await AsyncStorage.setItem("posts", JSON.stringify([]));
            await AsyncStorage.setItem(
                "cart",
                JSON.stringify([
                    {
                        id: 1,
                        img: require("../assets/econTextbook.png"),
                        title: "A-Level ECOnomics Mind Maps by Dr Anthony Fok Second Edition",
                        price: 123450,
                        ecoRating: 0.87,
                        ecoPoints: 10,
                        quantity: 1,
                    },
                    {
                        id: 2,
                        img: require("../assets/econTextbook2.png"),
                        title: "A-Level ECOnomics Evaluation Points Book by Anthony Fok",
                        price: 543210,
                        ecoRating: 0.99,
                        ecoPoints: 99,
                        quantity: 1,
                    },
                    {
                        id: 3,
                        img: require("../assets/favicon.png"),
                        title: "Item 3",
                        ecoPoints: 10,
                        price: 10.0,
                        quantity: 1,
                    },
                ])
            );
        }

        initStorage();
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.topbar}>
                <View style={styles.searchbar}>
                    <TextInput placeholder="Search" value={search} onChangeText={setSearch} style={{ flex: 1, paddingHorizontal: 20 }} />
                </View>
                <Pressable onPress={() => navigation.navigate("CartScreen")}>
                    <Text style={styles.navigationButton}>Cart</Text>
                </Pressable>
            </View>
            <View style={styles.body}>
                <View style={styles.section}>
                    <Text style={styles.title}>Hot deals</Text>
                    <ScrollView horizontal style={styles.productDisplay}>
                        {Array(10).fill(renderProductBlock(hotDeals, navigation))}
                    </ScrollView>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Previously bought items...</Text>
                    <ScrollView horizontal style={styles.productDisplay}>
                        {Array(10).fill(renderProductBlock(hotDeals, navigation))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    topbar: {
        backgroundColor: "#00b14f",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 70,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    navigationButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 20,
    },
    searchbar: {
        backgroundColor: "#ddd",
        flex: 1,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
    },
    body: {
        flex: 1,
        paddingTop: 20,
    },
    section: {
        marginBottom: 20,
        paddingLeft: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    productDisplay: {
        flexDirection: "row",
        marginTop: 20,
    },
});
