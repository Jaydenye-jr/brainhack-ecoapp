import { TextInput, Text, View, Pressable, StyleSheet, SafeAreaView, Image } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/Primarybutton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState("");
    const [hide, setHide] = useState(true);

    async function handleSignup(username, password, confirmPassword, navigation) {
        if (username.length < 1) {
            setError("Username cannot be empty");
            return;
        } else if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const accounts = JSON.parse(await AsyncStorage.getItem("accounts"));

        if (accounts[username]) setError("Username already exists");
        else {
            accounts[username] = {
                password: password,
                name: username,
                points: 0,
                img: require("../assets/favicon.png"),
            };
            await AsyncStorage.setItem("accounts", JSON.stringify(accounts));
            navigation.navigate("LoginScreen");
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ width: "10%" }}>
                        <Image style={styles.backIcon} source={require("../assets/ui/x-icon.jpeg")} />
                    </Pressable>
                </View>
                <View style={{ position: "absolute" }}>
                    <Text style={[styles.headerText]}>Sign Up</Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <View style={styles.inputBox}>
                    <TextInput placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" autoComplete="off" autoCorrect={false} style={styles.inputText} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput placeholder="Password" secureTextEntry={hide} value={password} onChangeText={setPassword} autoCapitalize="none" autoComplete="off" autoCorrect={false} style={styles.inputText} />
                    <Pressable onPress={() => setHide(!hide)}>
                        <Text style={{ color: "green", paddingHorizontal: 20 }}>{hide ? "Show" : "Hide"}</Text>
                    </Pressable>
                </View>
                <View style={styles.inputBox}>
                    <TextInput placeholder="Confirm Password" secureTextEntry={hide} value={confirmPassword} onChangeText={setConfirmPassword} autoCapitalize="none" autoComplete="off" autoCorrect={false} style={styles.inputText} />
                </View>
            </View>
            <PrimaryButton
                onPress={() => {
                    handleSignup(username, password, confirmPassword, navigation);
                }}
            >
                Sign Up
            </PrimaryButton>
            <View style={{ alignItems: "center", paddingTop: 20 }}>
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <Text style={{ color: "green" }}> Forgot Your Password? </Text>
                </Pressable>
            </View>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Image style={styles.alternativeLogin} source={require("../assets/ui/alternativeLogin.jpeg")} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 12,
        alignItems: "center",
        backgroundColor: "green",
        borderRadius: 30,
        marginHorizontal: "5%",
        marginBottom: 20,
    },
    alternativeLogin: {
        width: "90%",
        resizeMode: "center",
    },
    errorText: {
        color: "red",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    inputText: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 20,
    },
    main: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: "white",
    },
    container: {
        padding: 10,
    },

    inputBox: {
        borderWidth: 2,
        borderColor: "#ddd",
        marginBottom: 40,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 20,
    },
    backIcon: {
        width: "100%",
        height: 30,
        resizeMode: "contain",
    },
    headerText: {
        fontSize: 30,
        margin: 10,
        fontWeight: "bold",
    },
});
