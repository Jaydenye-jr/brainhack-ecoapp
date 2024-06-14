import { TextInput, Text, View, Pressable, StyleSheet, SafeAreaView, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import AccountID from "../components/AccountID";
import PrimaryButton from "../components/Primarybutton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [hide, setHide] = useState(true);
    const [error, setError] = useState("");
    const { setUserID } = useContext(AccountID);

    async function handleLogin(username, password, navigation) {
        const accounts = JSON.parse(await AsyncStorage.getItem("accounts"));

        if (accounts[username] && accounts[username].password === password) {
            setUserID(username);
            navigation.navigate("Home");
        } else {
            setError("Incorrect username or password");
        }
    }

    useEffect(() => {
        AsyncStorage.setItem(
            "accounts",
            JSON.stringify({
                alphadaddythunder: {
                    password: "admin",
                    name: "Xiao Hu Melvin",
                    points: 123456789,
                    img: require("../assets/melvin.png"),
                },
            })
        );
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Log In</Text>
            </View>
            <View style={styles.logoContainer}>
                <Image source={require("../assets/ui/EcoShop Logo.png")} style={styles.logo} />
            </View>
            <Text style={styles.errorText}>{error}</Text>
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" autoComplete="off" autoCorrect={false} style={styles.inputText} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput placeholder="Password" secureTextEntry={hide} value={password} onChangeText={setPassword} autoCapitalize="none" autoComplete="off" autoCorrect={false} style={styles.inputText} />
                    <Pressable onPress={() => setHide(!hide)}>
                        <Text style={{ color: "green", paddingHorizontal: 20 }}>{hide ? "Show" : "Hide"}</Text>
                    </Pressable>
                </View>
            </View>
            <PrimaryButton onPress={() => handleLogin(username, password, navigation)}>Log In</PrimaryButton>
            <View style={{ alignItems: "center" }}>
                <Pressable
                    onPress={() => {
                        setUserID("alphadaddythunder");
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.defaultText}>Forgot Your Password?</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("SignupScreen")}>
                    <Text style={styles.defaultText}>Sign Up</Text>
                </Pressable>
            </View>
            <View>
                <Image style={styles.alternativeLogin} source={require("../assets/ui/alternativeLogin.jpeg")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 8,
        alignItems: "center",
        backgroundColor: "#5DB075",
        marginHorizontal: "5%",
        borderRadius: 40,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#5DB075",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
    },
    logo: {
        width: '90%',
        height: '90%',
        resizeMode: "cover",
        alignSelf: "center",
    },
    alternativeLogin: {
        width: "80%",
        resizeMode: "contain",
        alignSelf: "center",
    },
    errorText: {
        color: "red",
        paddingHorizontal: 20,
    },
    inputText: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 20,
    },
    main: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: "white",
    },
    container: {
        padding: 10,
    },
    inputBox: {
        borderWidth: 2,
        borderColor: "#ddd",
        marginBottom: 30,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },
    backIcon: {
        resizeMode: "center",
    },
    defaultText: {
        color: "green",
        margin: 10,
    },
    headerText: {
        fontSize: 30,
        margin: 10,
        fontWeight: "bold",
    },
});
