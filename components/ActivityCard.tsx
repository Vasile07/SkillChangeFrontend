import {DimensionValue, Image, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useRouter} from "expo-router";

interface ActivityCardProps {

    width: DimensionValue,
    height: DimensionValue,
    id: number,
    image: string,
    title: string,
}

const ActivityCard: React.FC<ActivityCardProps> = ({width, height, id, image, title}) => {
    const router = useRouter();
    return (
        <View style={styles.secondShadow} key={id}>
            {/*@ts-ignore*/}
            <Pressable style={[styles.card, {width, height}]} onPress={() => router.push(`/SkillPage?id=${id}`)}>
                <Image source={{uri: image}} style={styles.imageStyle}/>
                <Text style={styles.titleStyle}>{title}</Text>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 4,
    },
    secondShadow: {
        borderRadius: 15,
        shadowColor: "rgba(255, 255, 255, 1)",
        shadowOffset: {width: 15, height: -15},
        shadowRadius: 20,
    },
    imageStyle: {
        width: "50%",
        minWidth: 60,
        height: "50%",
        minHeight: 60,
        objectFit: "contain",
        aspectRatio: "auto"
    },
    titleStyle: {
        fontWeight: "bold",
        fontSize: 11,
    },
})

export default ActivityCard