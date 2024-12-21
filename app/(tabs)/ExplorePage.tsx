import React from "react";
import {StyleSheet, Text} from "react-native";
import {ScreenContainer} from "react-native-screens";

const ExplorePage: React.FC = () => {
    return (
        <ScreenContainer style={styles.pageContainer}>
            <Text>EXPLORE PAGE</Text>
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

export default ExplorePage;