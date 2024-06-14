import { TextInput, Text, View, Pressable, StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/Primarybutton";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PostScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [addingImage, setAddingImage] = useState(false);

    function handlePress() {
        setAddingImage(true);
        setTimeout(() => {
            setAddingImage(false);
        }, 3000);
    }

    async function submitPost(title, text) {
        try {
            const posts = JSON.parse(await AsyncStorage.getItem("posts"));
            const newPost = {
                id: posts.length + 1,
                title: title,
                content: text,
                image: require("../assets/solid bird bird.png"),
                credit: "",
            };
            const newPosts = [...posts, newPost];
            await AsyncStorage.setItem("posts", JSON.stringify(newPosts));
            // setText("Posted! ");
        } catch (error) {
            console.log(error);
            // setText("Sorry, something went wrong :( ");
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.returnbutton}>Back</Text>
                </Pressable>
                <View style={{ flex: 1 }}></View>
                <View style={{ position: "absolute" }}>
                    <Text style={[styles.heading, styles.bold]}>Post!</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TextInput style={styles.titlecontainer} placeholder="Title" multiline value={title} onChangeText={setTitle} />
                <Pressable onPress={() => handlePress()} style={{ flexDirection: "row" }}>
                    <Text style={styles.addImageText}>Add Image</Text>
                    <Image style={styles.addImageIcon} source={require("../assets/ui/photo-icon.png")} />

                    <Text>{addingImage ? "Not yet :(" : " "}</Text>
                </Pressable>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <TextInput style={styles.input} placeholder="Enter your text here..." multiline value={text} onChangeText={setText} />
                    </ScrollView>
                </View>
                <View style={styles.content}>
                    <PrimaryButton
                        style={styles.buttonContainer}
                        title="Post"
                        onPress={() => {
                            submitPost(title, text);
                            navigation.goBack();
                        }}
                    >
                        {" "}
                        Submit!{" "}
                    </PrimaryButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: "white",
    },
    returnbutton: {
        paddingLeft: 13,
        color: "green",
        fontSize: 15,
        justifyContent: "left",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    content: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    input: {
        // height: 200,
        // borderColor: 'gray',
        // borderWidth: 1,
        paddingTop: 15,
        padding: 10,
        paddingLeft: 15,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: "center",
        marginBottom: 20,
    },
    titlecontainer: {
        fontWeight: "bold",
        fontSize: 25,
        paddingLeft: 20,
        paddingBottom: 10,
        // borderBottomColor: "gray",
        // borderBottomWidth: 1,
        // borderBottomLeftRadius: 1
    },
    addImageText: {
        color: "green",
        paddingLeft: 20,
        paddingRight: 10,
        fontSize: 14,
    },
    addImageIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain",
        color: "green",
        marginRight: 10,
    },
});
