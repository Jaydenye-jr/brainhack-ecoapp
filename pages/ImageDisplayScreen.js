import { View, Image, Pressable } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

export default function ImageDisplayScreen({ navigation, route }) {
    const { imagesource } = route.params;
    return (
        <ReactNativeZoomableView maxZoom={10} minZoom={0.1} initialZoom={1}>
            <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={imagesource} style={{ resizeMode: "contain" }} />
            </Pressable>
        </ReactNativeZoomableView>
    );
}
