import { View, Text, StyleSheet, Image, Pressable, TextInput, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

function renderPost(rad, navigation) {
    // posts: { id: number, image: string, title: string, body: string }[]
    rad = rad || [];

    return rad.map((item) => (
        // passes in the article to the ArticleDisplayScreen through props
        <Pressable onPress={() => navigation.navigate("ArticleDisplayScreen", { article: item })} key={item.id}>
            <View style={{ width: "100%", padding: 10, alignItems: "center" }}>
                <Image style={{ width: "80%", height: 250 , borderRadius: 15, }} source={item.image || require("../assets/favicon.png")} />
                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>{item.title}</Text>
                <Text>{item.content.length > 50 ? item.content.slice(0, 50) + "..." : item.content}</Text>
                <Text style={{ fontSize: 12 }}>{item.credit}</Text>
            </View>
        </Pressable>
    ));
}

export default function ArticlesListScreen({ navigation }) {
    // isFocused changes every time the screen is focused or unfocused, useEffect watches it so the page rerenders every time it changes
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);

    // for TextInput search bar but does nothing currently
    const [search, setSearch] = useState("");

    // posts as useState
    const [defaultPosts, setDefaultPosts] = useState([
        {
            id: -2,
            image: require("../assets/article1.png"),
            title: "Mathematics of Environmental Science",
            content: "Professor Ahmad discusses a revolutionary way to turn the world into a leaf",
            credit: "Photo Credits: Stanford University",
        },
        {
            id: -1,
            image: require("../assets/article2.png"),
            title: "Turning Trash to Treasure: The Power of Recycling",
            content: "We have heard of the word 'recycling' countless times. But what exactly is it?",
            credit: "Photo Credits: Econlib",
        },
    ]);
    const [posts, setPosts] = useState([]);

    // for refreshing by scrolling down
    async function onRefresh() {
        setRefreshing(true);
        await getPosts();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }

    async function getPosts() {
        // get posts in JSON string
        const data = await AsyncStorage.getItem("posts");

        // if 'posts' key does not exist, set it to an empty array
        // parse into JSON
        setPosts(data ? JSON.parse(data) : []);
    }
    // for now, the page refreshes before the post is submitted, so the user has to refresh to see the new post by navigating somewhere else then coming back
    useEffect(() => {
        // console.log('rendered')
        // AsyncStorage.setItem("posts", JSON.stringify([])) // for resetting posts

        getPosts();
    }, [isFocused]);

    return (
        <LinearGradient colors={["green", "lightblue"]} style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ flex: 1 }} />
                        <Pressable onPress={() => navigation.navigate("PostScreen")}>
                            <Text style={styles.navigationButton}>Post</Text>
                        </Pressable>
                        <View style={{ position: "absolute" }}>
                            <Text style={styles.heading}>Articles</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.searchbar}>
                    <TextInput placeholder="Search" value={search} onChangeText={setSearch} style={{ flex: 1, paddingHorizontal: 20 }} />
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {renderPost(defaultPosts, navigation)}
                        {renderPost(posts, navigation)}
                    </ScrollView>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    navigationButton: {
        paddingLeft: 13,
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        justifyContent: "left",
    },
    header: {
        alignItems: "center",
        // marginBottom: 20,
        padding: 20,
        paddingTop: 80,
        backgroundColor: "#00b14f",
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
        color: "white",
        textAlign: "center",
    },
    searchbar: {
        backgroundColor: "#ddd",
        width: "90%",
        height: 40,
        borderRadius: 20,
        // paddingLeft: 10,
        marginTop: 10,
        justifyContent: "center",
        alignSelf: "center",
        // top: 20,
        // position: "absolute",
    },
});
