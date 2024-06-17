import { View, Text, Pressable, Image, StyleSheet, ScrollView, RefreshControl } from "react-native";
import PrimaryButton from "../components/Primarybutton";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function renderCartItems(cart) {
    cart = cart || [];
    // console.log(cart);
    return cart.map((item) => (
        <View style={{ width: "100%", height: 80, flexDirection: "row" }} key={item.id}>
            <View style={{ height: 60, width: 60, margin: 10, overflow: "hidden" }}>
                <Image source={item.img} style={{ width: "100%", height: "100%", resizeMode: "cover", borderRadius: 15, }} />
            </View>
            <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
                <Text style={{ fontSize: 20 }}>{item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}</Text>
                <Text>${item.price.toFixed(2)}</Text>
            </View>
        </View>
    ));
}

export default function CartScreen({ navigation }) {
    const [cart, setCart] = useState([]);

    const totalcost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalpoints = cart.reduce((acc, item) => acc + item.ecoPoints * item.quantity, 0);

    async function getCart() {
        // get cart from async storage
        try {
            const cart = await AsyncStorage.getItem("cart");
            // console.log(cart)
            setCart(cart ? JSON.parse(cart) : null);
        } catch (error) {
            console.log(error);
        }
    }
    async function resetCart() {
        // empty cart once paid
        try {
            await AsyncStorage.setItem("cart", JSON.stringify([]));
            setCart([]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // console.log("Cart Screen Rendered");
        getCart();
        // console.log(cart)
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.topbar}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.navigationText}>Back</Text>
                    </Pressable>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ position: "absolute" }}>
                        <Text style={styles.headerText}>Cart</Text>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.displayContainer}>{renderCartItems(cart)}</View>
                    <Text style={styles.pointsText}>Points Earned: {totalpoints}</Text>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Image style={styles.paymentIcons} source={require("../assets/ui/payment-icons.png")} />
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Text style={styles.totalCostText}>${totalcost.toFixed(2)}</Text>
                </View>
            </View>
            <PrimaryButton onPress={() => resetCart()}>Proceed to Payment</PrimaryButton>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 20,
    },
    topbar: {
        backgroundColor: "#5DB075",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 70,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    navigationText: {
        color: "white",
        fontSize: 18,
    },
    body: {
        flex: 1,
        padding: 20,
    },
    displayContainer: {
        width: "100%",
        backgroundColor: "#ddd",
    },
    pointsText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
    },
    totalCostText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
    },
    footer: {
        flexDirection: "row",
        padding: 10,
        // justifyContent: 'flex-end'
    },
    paymentIcons: {
        width: "50%",
        resizeMode: "contain",
    },
});
