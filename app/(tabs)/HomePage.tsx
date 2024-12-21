import React from "react";
import {StyleSheet, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import RecommendationActivityCard from "@/components/RecommendationActivityCard";

const HomePage: React.FC = () => {
    return (
        <ScreenContainer style={styles.pageContainer}>
            {/*<Text>HOME PAGE</Text>*/}
            {/*<ActivityCard width={130} height={130} image={require("@/assets/images/gardening.png")} title={"Gardening"}/>*/}
            <View style={{width: 220, height: 290}}>
                <RecommendationActivityCard image={require("@/assets/images/gardening.png")} title={"Gardening"}/>
            </View>

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