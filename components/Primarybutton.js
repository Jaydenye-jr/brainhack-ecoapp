import { View, Text, Pressable, StyleSheet } from "react-native";

/*
children - The text inside the button
onPress - The function to be called when the button is pressed
*/
export default function PrimaryButton({ children, onPress: pressAction }) {
    function pressHandler() {
        console.log("Pressed!");
    }
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({ pressed }) => (pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer)} onPress={pressAction ? pressAction : pressHandler} android_ripple={{ color: "#245933" }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        backgroundColor: "#00b14f",
        paddingVertical: 12,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    pressed: {
        opacity: 0.75,
    },
});
