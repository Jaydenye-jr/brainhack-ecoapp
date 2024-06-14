// UNUSED

import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostScreen from "./PostScreen";

const asdPostScreen = ({ navigation }) => {
    const [post, setPost] = useState("");
    const [image, setImage] = useState(null);

    const handlePost = async () => {
        try {
            // Perform the upload logic here
            // You can use libraries like axios or fetch to send the data to your backend
            // Example:
            const response = await fetch("https://example.com/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post, image }),
            });

            // If the upload is successful, navigate to the next screen
            navigation.navigate("PostDisplay", { post, image });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <TextInput value={post} onChangeText={setPost} placeholder="Write your post" />
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} resizeMode="contain" />
            <TouchableOpacity onPress={handlePost}>
                <Text>Post</Text>
            </TouchableOpacity>
        </View>
    );
};

const PostDisplayScreen = ({ route }) => {
    // const { post, image } = route.params;

    return (
        <View>
            <Text>{post}</Text>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} resizeMode="contain" />
        </View>
    );
};

const Stack = createNativeStackNavigator();

const Asd = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PostDisplay" component={PostDisplayScreen} />
            <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
    );
};

export default Asd;
