import {Tabs} from 'expo-router';
import React from 'react';
import {Image, StyleSheet, View} from "react-native";

export default function TabLayout() {


    return (
        <View style={{width: "100%", height: "100%", position: "relative"}}>
            <Tabs
                initialRouteName={"HomePage"}
                screenOptions={{
                    tabBarActiveTintColor: 'blue',
                    tabBarStyle: {
                        backgroundColor: "#26344F",
                        height: 75,
                        width: "100%",
                    },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="HomePage"
                    options={{
                        title: '',
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                style={styles.icon}
                                source={focused ? require("@/assets/images/navbar/home-active.png") : require("@/assets/images/navbar/home-inactive.png")}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="ExplorePage"
                    options={{
                        title: '',
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                style={styles.icon}
                                source={focused ? require("@/assets/images/navbar/explore-active.png") : require("@/assets/images/navbar/explore-inactive.png")}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="SchedulePage"
                    options={{
                        title: '',

                        tabBarIcon: ({color, focused}) => (
                            <View style={[styles.mainButton, focused && {
                                borderStyle: "solid",
                                borderWidth: 3,
                                borderColor: "#FFF"
                            }]}>
                                <Image
                                    style={styles.mainIcon}
                                    source={focused ? require("@/assets/images/navbar/calendar-active.png") : require("@/assets/images/navbar/calendar-inactive.png")}/>
                            </View>

                        ),
                    }}
                />
                <Tabs.Screen
                    name="ChatPage"
                    options={{
                        title: '',
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                style={styles.icon}
                                source={focused ? require("@/assets/images/navbar/chat-active.png") : require("@/assets/images/navbar/chat-inactive.png")}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="MyProfilePage"
                    options={{
                        title: '',
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                style={styles.icon}
                                source={focused ? require("@/assets/images/navbar/profile-active.png") : require("@/assets/images/navbar/profile-inactive.png")}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="SchedulingPage"
                    options={{
                        href: null,
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    mainButton: {
        height: 70,
        aspectRatio: 1,
        backgroundColor: "#78A4F9",
        display: "flex",
        borderRadius: 70,
        justifyContent: "center",
        alignItems: "center",
        transform: "translateY(-40%)"
    },
    mainIcon: {
        width: 29,
        height: 29,
    },
    icon: {
        width: 25,
        height: 25,
    },
    bar: {
        width: 41,
        height: 7,
        backgroundColor: "#FFF",
        position: "absolute",
        bottom: 0,
        left: "10%",
        transform: "translateX(-50%)",
    }
})
