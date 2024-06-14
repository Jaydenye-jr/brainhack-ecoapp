import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function SettingsScreen({ navigation }) {
    return (
        <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
            <View style={styles.navigationBar}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>Back</Text>
                </Pressable>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles.container}>
                <Text style={styles.settingsTitle}>Settings</Text>
                <View style={styles.settingsContent}>
                    <LinearGradient colors={["lightgrey", "lightblue"]} style={styles.sectionTitleBox}>
                        <Text style={styles.sectionTitle}>Edit Profile</Text>
                    </LinearGradient>
                    <LinearGradient colors={["lightgrey", "lightblue"]} style={styles.sectionTitleBox}>
                        <Text style={styles.sectionTitle}>Notifications</Text>
                    </LinearGradient>
                    <LinearGradient colors={["lightgrey", "lightblue"]} style={styles.sectionTitleBox}>
                        <Text style={styles.sectionTitle}>Saved Posts</Text>
                    </LinearGradient>
                    <LinearGradient colors={["lightgrey", "lightblue"]} style={styles.sectionTitleBox}>
                        <Text style={styles.sectionTitle}>Change Language</Text>
                    </LinearGradient>
                    <LinearGradient colors={["lightgrey", "lightblue"]} style={styles.sectionTitleBox}>
                        <Text style={styles.sectionTitle}>Contact Us</Text>
                    </LinearGradient>
                </View>
            </View>
        </LinearGradient>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonContainer: {},
    navigationBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 30,
    },
    backButton: {
        color: "white",
        fontSize: 20,
    },
    settingsTitle: {
        color: "black",
        marginBottom: 40,
        fontSize: 24,
        fontWeight: "bold",
    },

    sectionTitleBox: {
        backgroundColor: "#D9D9D9",
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        color: "black",
        fontWeight: "bold",
        paddingVertical: 10,
        fontSize: 20,
        textAlign: "center",
    },
});
