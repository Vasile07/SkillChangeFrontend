import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {ActivityIndicator} from "react-native-paper";

const LoadingScreen: React.FC = () => {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.textStyle}>Is loading</Text>
                <ActivityIndicator size={"large"} animating={true} color={"#26344F"}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 14,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default LoadingScreen;