import React from "react";
import {StyleSheet, Text} from "react-native";
import {ScreenContainer} from "react-native-screens";

const HomePage: React.FC = () => {
    return (
        <ScreenContainer style={styles.pageContainer}>
            <Text>HOME PAGE</Text>
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

export default HomePage;