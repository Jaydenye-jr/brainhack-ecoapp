import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountID from "./components/AccountID";
import SignupScreen from "./pages/SignupScreen";
import LoginScreen from "./pages/LoginScreen";
import LoadingScreen from "./pages/LoadingScreen";
import PostScreen from "./pages/PostScreen";
import RewardsearnScreen from "./pages/RewardsearnScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SettingScreen from "./pages/SettingScreen";
import RewardScreen from "./pages/RewardScreen";
import ShopScreen from "./pages/ShopScreen";
import ItemScreen from "./pages/ItemScreen";
import BarCodeScan from "./pages/BarcodescanScreen";
import CartScreen from "./pages/CartScreen";
import ArticlesListScreen from "./pages/ArticlesListScreen";
import ImageDisplayScreen from "./pages/ImageDisplayScreen";
import ArticleDisplayScreen from "./pages/ArticleDisplayScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeNavigator() {
    const iconSize = 40;
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: "#ddd" } }}>
            <Tab.Screen
                name="ShopNavigator"
                component={ShopNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ width: iconSize - 5, height: iconSize - 5 }} source={focused ? require("./assets/bottomtab/home-highlighted.png") : require("./assets/bottomtab/home.png")} />;
                    },
                }}
            />
            <Tab.Screen
                name="Articles"
                component={ArticlesNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ width: iconSize + 5, height: iconSize + 5 }} source={focused ? require("./assets/bottomtab/forum-highlighted.png") : require("./assets/bottomtab/forum.png")} />;
                    },
                }}
            />
            <Tab.Screen
                name="BarcodeNavigator"
                component={BarcodeNavigator}
                options={{
                    tabBarIcon: () => {
                        return <Image style={{ width: iconSize, height: iconSize }} source={require("./assets/bottomtab/scanner.png")} />;
                    },
                    tabBarStyle: { display: "none" },
                }}
            />
            <Tab.Screen
                name="RewardScreen"
                component={RewardScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ width: iconSize, height: iconSize }} source={focused ? require("./assets/bottomtab/rewards-highlighted.png") : require("./assets/bottomtab/rewards.png")} />;
                    },
                }}
            />
            <Tab.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Image style={{ width: iconSize, height: iconSize }} source={focused ? require("./assets/bottomtab/profile-highlighted.png") : require("./assets/bottomtab/profile.png")} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}

function ShopNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ShopScreen" component={ShopScreen} />
            <Stack.Screen name="ItemScreen" component={ItemScreen} />
            <Stack.Screen name="ImageDisplayScreen" component={ImageDisplayScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
    );
}

function ProfileNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
        </Stack.Navigator>
    );
}

function ArticlesNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PostDisplayScreen" component={ArticlesListScreen} />
            <Stack.Screen name="ArticleDisplayScreen" component={ArticleDisplayScreen} />
            <Stack.Screen name="ImageDisplayScreen" component={ImageDisplayScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />
        </Stack.Navigator>
    );
}

function BarcodeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BarCodeScan" component={BarCodeScan} />
            <Stack.Screen name="RewardsearnScreen" component={RewardsearnScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    const [userID, setUserID] = useState(-1);

    return (
        <AccountID.Provider value={{ userID, setUserID }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="SignupScreen" component={SignupScreen} />
                    <Stack.Screen name="Home" component={HomeNavigator} />
                    {/* <Stack.Screen name="BarcodeNavigator"
                        component={BarcodeNavigator} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </AccountID.Provider>
    );
}
