import React from "react";
import {StyleSheet, View} from "react-native";

const SchedulePageBackground: React.FC = () => {
    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.topLeftRectangle}/>
            <View style={styles.topRightRectangle}/>
            <View style={styles.bottomLeftRectangle}/>
            <View style={styles.bottomRightRectangle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    topLeftRectangle: {
        position: "absolute",
        width: "51%",
        height: "40%",
        left: 0,
        top: 0,
        backgroundColor: "#26344F",
        zIndex: 2,
        borderBottomLeftRadius: 75,
    },
    topRightRectangle: {
        position: "absolute",
        width: "51%",
        top: 0,
        right: 0,
        height: "70%",
        backgroundColor: "#26344F",
        zIndex: 1,
    },
    bottomLeftRectangle: {
        position: "absolute",
        width: "50%",
        height: "70%",
        bottom: 0,
        left: 0,
        backgroundColor: "#FFF",
        zIndex: 1,
    },
    bottomRightRectangle: {
        position: "absolute",
        width: "51%",
        height: "60%",
        bottom: 0,
        right: 0,
        backgroundColor: "#FFF",
        zIndex: 2,
        borderTopRightRadius: 75,
    },

})

export default SchedulePageBackground;