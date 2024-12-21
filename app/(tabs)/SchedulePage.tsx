import React from "react";
import {StyleSheet, Text} from "react-native";
import {ScreenContainer} from "react-native-screens";

const SchedulePage: React.FC = () => {
    return (
        <ScreenContainer style={styles.pageContainer}>
            <Text>SCHEDULE PAGE</Text>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default SchedulePage;