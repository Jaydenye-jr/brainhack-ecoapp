import { View, Image, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
export default function LoadingScreen() {
    const [set, setSet] = useState(".");
    const colors = ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)", "rgba(255,0,255,1)"];
    const [color, setColor] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            if (set < 3) setSet(set + 1);
            else setSet(0);
        }, 300);
    });
    return (
        <View style={[styles.container, { backgroundColor: colors[color] }]}>
            <LinearGradient colors={["rgba(0,200,0,1)", "transparent"]} style={styles.background} />
            <Image source={require("../assets/ui/leaf.png")} style={{ width: 100, height: 100 }} />
            <Text style={styles.loadingText}>Loading</Text>
            <Text style={styles.changingText}>{`${".".repeat(set)}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "green",
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    loadingText: {
        color: "white",
        fontSize: 24,
        marginTop: 35,
        textAlign: "center",
        top: "53%",
        position: "absolute",
        marginRight: 2,
    },
    changingText: {
        color: "white",
        fontSize: 24,
        marginTop: 35,
        textAlign: "center",
        top: "53%",
        left: "62%",
        position: "absolute",
    },
});
