import React from "react";
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import {BlurView} from "expo-blur";


const RecommendationActivityCard: React.FC<{ image: ImageSourcePropType, title: string }> = ({image, title}) => {
    return (
        <View style={styles.card}>
            <BlurView intensity={44} style={{width: "100%", height: "100%", position: "absolute"}}></BlurView>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.imageStyle}/>
            </View>
            <Text style={styles.textStyle}>{title}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(38,52,79,0.65)",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "rgb(38,52,79)",
        borderRadius: 26,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    imageContainer: {
        width: "85%",
        height: "33%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 13,
        marginTop: 20,
    },
    imageStyle: {
        height: "80%",
        width: undefined,
        maxWidth: "90%",
        aspectRatio: 1,
        resizeMode: "contain",
    },
    textStyle: {
        fontSize: 30,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "#FFF"
    }
})

export default RecommendationActivityCard;