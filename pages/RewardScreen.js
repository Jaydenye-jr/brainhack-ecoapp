import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

function renderVouchers(arr) {
    // vouchers: { id: number, image: string, name: string, cost: string }[]
    arr = arr || [];

    return arr.map((voucher) => (
        <View style={{ width: "100%", height: 80, borderRadius: 10, backgroundColor: "#D9D9D9", marginBottom: 20, flexDirection: "row", alignItems: "center" }} key={voucher.id}>
            <View style={{ height: 60, width: 60, marginLeft: 20, overflow: "hidden" }}>
                <Image source={voucher.image} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, justifyContent: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{voucher.name}</Text>
                <Text style={{}}>{voucher.cost} points</Text>
            </View>
        </View>
    ));
}
export default function RewardScreen() {
    const [vouchers, setVouchers] = useState([
        { id: 1, image: require("../assets/ui/EcoShop Symbol.jpg"), name: "$5 EcoShop Voucher", cost: "1500" },
        { id: 2, image: require("../assets/ui/DSTA Icon.png"), name: "$5 DSTA OMG Voucher", cost: "1500" },
        { id: 3, image: require("../assets/ui/FairPrice Icon.png"), name: "$5 Fairprice Voucher", cost: "2000" },
    ]);

    // useEffect(() => {
    //     async function getData() {
    //         // get data
    //         // set data
    //     }
    //     getData();
    // });

    return (
        <LinearGradient colors={["#00b14f", "lightblue"]} style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.topBar}>
                    <Text style={styles.headerText}>Rewards</Text>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.pointsBox}>
                            <Text style={styles.pointsText}>Total Points:</Text>
                            <Text style={styles.pointsText}>123456789</Text>
                        </View>
                        <Text style={styles.title}>Redeem</Text>
                        <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}></LinearGradient>
                        <View style={styles.voucherBox}>{renderVouchers(vouchers)}</View>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    topBar: {
        backgroundColor: "#00b14f",
        alignItems: "center",
        paddingTop: 70,
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    title: {
        // textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        // alignItems: "center",
        padding: 20,
    },
    pointsBox: {
        backgroundColor: "#D9D9D9",
        width: "100%",
        height: 200,
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 60,
    },
    pointsText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    voucherBox: {
        paddingVertical: 20,
        alignItems: "center",
    },
});
