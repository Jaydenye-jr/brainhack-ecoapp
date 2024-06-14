import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { useState, useEffect, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountID from "../components/AccountID";

function renderGoals(wasd) {
    // takes in an array of goals and returns a list of goals in JSX[]

    wasd = typeof wasd === "undefined" ? [] : wasd;
    return wasd.map((val) => (
        <View style={{ width: "100%", marginBottom: 10 }} key={val.id}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <LinearGradient colors={["lightgrey", "lightblue"]} style={{ paddingHorizontal: 10, borderRadius: 20, marginBottom: 8 }}>
                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>{val.title}</Text>
                </LinearGradient>
            </View>
            <View style={{ paddingBottom: 5, marginBottom: 10 }}>
                <View style={{ width: "100%", borderRadius: 100, height: 20, backgroundColor: "#D9D9D9", overflow: "hidden" }}>
                    <View style={{ width: `${(val.currentValue / val.targetValue) * 100}%`, height: 20, borderRadius: 10, backgroundColor: "gold", /* position: "absolute", */ overflow: "visible" }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                            {val.currentValue}/{val.targetValue} {val.currentValue === val.targetValue ? "✓" : ""}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    ));
}

function renderAchievements(asd) {
    // check if achievements is undefined
    asd = typeof asd === "undefined" ? [] : asd;
    return asd.map((ele) => (
        <LinearGradient colors={["red", "yellow"]} style={{ width: 110, height: 150, elevation: 3, padding: 5, borderRadius: 20, marginBottom: 20, alignItems: "center", overflow: "hidden" }} key={ele.id}>
            <View style={{ width: 70, height: 60, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Image source={ele.image} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{ele.title}</Text>
            <Text style={{ textAlign: "center", fontSize: 12 }}>{ele.description}</Text>
        </LinearGradient>
    ));
}

export default function ProfileScreen({ navigation }) {
    const { userID } = useContext(AccountID);
    const [profile, setProfile] = useState({
        username: "",
        name: "",
        points: 0,
        img: require("../assets/favicon.png"),
    });

    // goals: { id: number, title: string, currentValue: number, targetValue: number }[]

    const [goals, setGoals] = useState([
        {
            id: 1,
            title: "Daily - BYOC for takeout",
            currentValue: 1,
            targetValue: 1,
        },
        {
            id: 2,
            title: "Weekly - Read 5 articles",
            currentValue: 3,
            targetValue: 5,
        },
        {
            id: 3,
            title: "Monthly - BYOB 10 times",
            currentValue: 7,
            targetValue: 10,
        },
    ]);
    // achievements: { id: number, image: string, title: string, description: string }[]
    const [achievements, setAchievements] = useState([
        {
            id: 0,
            image: require("../assets/achievements/ecoeducator.png"),
            title: "Eco Educator",
            description: "Publish your first article",
        },
        {
            id: 1,
            image: require("../assets/achievements/upcycling.png"),
            title: "Upcycling Guru",
            description: "Upcycle something",
        },
        {
            id: 2,
            image: require("../assets/achievements/carbonsaver.png"),
            title: "Carbon Saver",
            description: "Reduce your carbon footprint",
        },
        {
            id: 3,
            image: require("../assets/achievements/greeninfluencer.png"),
            title: "Green Influencer",
            description: "Refer a friend to the app",
        },
        {
            id: 4,
            image: require("../assets/achievements/ecofriendlyshopper.png"),
            title: "Eco-friendly Shopper",
            description: "Purchase an eco-friendly product",
        },
    ]);

    // get data and set it to state?
    useEffect(() => {
        async function getProfile() {
            // get all accounts
            const accounts = JSON.parse(await AsyncStorage.getItem("accounts"));

            // filter to current account
            setProfile({
                username: userID,
                name: accounts[userID].name,
                points: accounts[userID].points,
                img: accounts[userID].img,
            });
        }
        getProfile();
    }, []);
    return (
        <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.profileBlock}>
                    <View style={styles.navigationBar}>
                        <Pressable onPress={() => navigation.navigate("SettingScreen")}>
                            <Text style={styles.headerNavigation}>Settings</Text>
                        </Pressable>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <Pressable onPress={() => navigation.navigate("LoginScreen", { screen: "LoginScreen", initial: false })}>
                            <Text style={styles.headerNavigation}>Logout</Text>
                        </Pressable>
                    </View>
                    <View style={styles.profileInfo}>
                        <View style={styles.profileIconContainer}>
                            <Image style={styles.profileIcon} source={profile.img} />
                        </View>
                        <View style={styles.profileDescription}>
                            <Text style={styles.profileName}>{profile.name}</Text>
                            <Text style={styles.profileText}>Username: {profile.username}</Text>
                            <Text style={styles.profileText}>Points accumulated: {profile.points}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ alignItems: "center", paddingTop: 20 }}>
                        <LinearGradient colors={["lightgrey", "lightblue"]} style={styles.sectionTitleBox}>
                            <Text style={styles.sectionTitle}>Goals</Text>
                        </LinearGradient>
                        <View style={styles.goalsSection}>{renderGoals(goals)}</View>
                        <LinearGradient colors={["lightgrey", "lightblue"]} style={styles.sectionTitleBox}>
                            <Text style={styles.sectionTitle}>Achievements</Text>
                        </LinearGradient>
                        <View style={styles.achievementsSection}>{renderAchievements(achievements)}</View>
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
    profileBlock: {
        backgroundColor: "#00b14f",
        paddingTop: 50,
        height: 250,
        width: "100%",
    },
    headerNavigation: {
        color: "white",
        fontSize: 16,
    },
    headerTitle: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    navigationBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    profileInfo: {
        padding: 10,
        flexDirection: "row",
        flex: 1,
    },
    profileIconContainer: {
        margin: 10,
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: "hidden",
    },
    profileIcon: {
        resizeMode: "stretch",
        height: "100%",
        width: "100%",
    },
    profileDescription: {
        flex: 1,
        justifyContent: "center",
    },
    profileName: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
    },
    profileText: {
        color: "white",
        fontSize: 14,
    },
    sectionTitleBox: {
        backgroundColor: "#D9D9D9",
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        color: "black",
        fontWeight: "bold",
        paddingVertical: 10,
        fontSize: 20,
        textAlign: "center",
    },
    goalsSection: {
        marginBottom: 10,
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
    },
    achievementsSection: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
});
