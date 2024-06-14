import { Text, View, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ArticleDisplayScreen({ navigation, route }) {
    // article information was passed from ArticleScreen when routed as a prop
    const article = route.params.article;

    return (
        <LinearGradient colors={["#00b14f", "lightblue"]} style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.navigationText}>Back</Text>
                    </Pressable>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={styles.container}>
                    <ScrollView>
                        <Pressable onPress={() => navigation.navigate("ImageDisplayScreen", { imagesource: article.image })}>
                            <Image style={styles.image} source={article.image} />
                        </Pressable>
                        <Text style={styles.title}>{article.title}</Text>
                        <Text style={styles.content}>{article.content}</Text>
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
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60,
        backgroundColor: "#00b14f",
    },
    navigationText: {
        fontSize: 18,
        color: "white",
        paddingHorizontal: 20,
        paddingBottom: 20,
        textAlign: "center",
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
        marginBottom: 10,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
});
