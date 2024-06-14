import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";

const RippleButton = ({ onPress, style, children }) => {
    const [rippleOpacity, setRippleOpacity] = useState(new Animated.Value(0));
    const onPressIn = () => {
        setRippleOpacity(new Animated.Value(1));
        Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity onPress={onPress} onPressIn={onPressIn} style={style}>
            <View style={styles.rippleContainer}>
                <Animated.View
                    style={[styles.ripple, { opacity: rippleOpacity }]}
                />
            </View>
            {children}
        </TouchableOpacity>
    );
};

const styles = {
    rippleContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    ripple: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "absolute",
    },
};
export default RippleButton;