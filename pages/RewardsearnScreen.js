import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/Primarybutton";
import { LinearGradient } from "expo-linear-gradient";

export default function RewardsearnScreen({navigation}) {
    return (
        //<ImageBackground source={require("../assets/ui/backgroundimg-red.png")} style={styles.ImageBackground}>
        <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.topBar} />
                <View style={styles.container}>
                    <View style={styles.earnbox}>
                        <Text style={styles.earnText}>Congratulations! You've earned 20 points!</Text>
                        <View>
                            <Text style={styles.earnText}>Total Points:</Text>
                            <Text style={styles.earnText}>123456789</Text>
                        </View>
                    </View>
                </View>
                <PrimaryButton onPress={() => {navigation.goBack();navigation.navigate("ShopNavigator")}}>Back to Home</PrimaryButton>
            </View>
        </LinearGradient>
        //</ImageBackground>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 30,
    },
    ImageBackground: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    topBar: {
        height: 120,
        backgroundColor: "#5DB075",
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    earnbox: {
        marginTop: "10%",
        backgroundColor: "#ddd",
        width: "90%",
        height: 250,
        borderRadius: 10,
        paddingHorizontal: 60,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-around",
    },
    earnText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});
