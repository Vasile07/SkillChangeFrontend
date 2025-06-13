import React from "react";
import {StyleSheet, View} from "react-native";

const TimelinePoints: React.FC<{ pointsNumber: number }> = ({pointsNumber}) => {
    const getArray: () => number[] = () => {
        const arr: number[] = [];
        for (let i = 1; i <= pointsNumber; i++)
            arr.push(i);
        return arr;
    }
    return (
        <View style={styles.pointsContainer}>
            {
                getArray().map(num => (
                    <View key={num} style={styles.point}>

                    </View>
                ))
            }
        </View>
    )
}

export default TimelinePoints;

const styles = StyleSheet.create({
    pointsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
    },
    point: {
        width: 3,
        height: 5,
        backgroundColor: "#D9D9D9"
    }
})