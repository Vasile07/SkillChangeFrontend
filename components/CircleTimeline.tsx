import React from "react";
import {StyleSheet, View} from "react-native";

const CircleTimeline: React.FC<{ state: string }> = ({state}) => {
    const bigCircleColor = state == "DONE" ? "#80AB69" : state == "IN_PROGRESS" ? "#FADA7A" : "#FBB4A5";
    const smallCircleColor = state == "DONE" ? "#A0D683" : state == "IN_PROGRESS" ? "#FDEDBD" : "#FDD2C9";
    return (
        <View style={[styles.bigCircle, {backgroundColor: bigCircleColor}]}>
            <View style={[styles.smallCircle, {backgroundColor: smallCircleColor}]}/>
        </View>
    )
}

export default CircleTimeline;

const styles = StyleSheet.create({
    bigCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    smallCircle: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
    }
})