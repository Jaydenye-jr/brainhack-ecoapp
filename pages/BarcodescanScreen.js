import { Text, View, Pressable, StyleSheet, Button } from "react-native";
import PrimaryButton from "../components/Primarybutton";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function BarCodeScan({ navigation }) {
    const [flagPermission, setflagPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Scan for EcoPoints!");

    const askCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setflagPermission(status == "granted");
        })();
        // create a promise <void> pending, fufilled, rejected
    };
    // get permission for the use of camera, everytime it re renders then ask for permission again
    useEffect(() => {
        askCameraPermission();
    }, []); // no need permission for rendering

    // data contained within barcode and type of barcode
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log("Type of data check: " + type + "\n" + data); // for us to check manually

        // navigates regardless of what is scanned
        // implement check maybe?
        navigation.navigate("RewardsearnScreen");
    };

    // check permission and screen that will render when asking permission
    if (flagPermission == null) {
        return (
            <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text>Requesting for camera permission</Text>
                </View>
            </LinearGradient>
        );
    }
    // this guy dw but can come back later again
    if (flagPermission == false) {
        return (
            <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.maintext}>No access to camera ˙◠˙ </Text>
                    <Button title={"Allow for Camera? =)"} onPress={() => askCameraPermission()} />
                </View>
            </LinearGradient>
        );
    }

    //onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    return (
        <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={{ color: "white", fontSize: 20 }}>Back</Text>
            </Pressable>
            <View style={styles.container}>
                <View style={styles.barcodebox}>
                    <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ height: 400, width: 400 }} />
                </View>
                <Text style={styles.maintext}>{text}</Text>

                {scanned && <Button title={"Scan again? yayyy"} onPress={() => setScanned(false)} color="tomato" />}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        paddingTop: 60,
        paddingLeft: 30,
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        fontWeight: "bold",
    },
    barcodebox: {
        alignItems: "center",
        justifyContent: "center",
        height: 300,
        width: 300,
        overflow: "hidden",
        borderRadius: 30,
        backgroundColor: "tomato",
    },
});
