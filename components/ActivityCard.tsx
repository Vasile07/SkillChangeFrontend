import {DimensionValue, Image, StyleSheet, Text, View} from "react-native";

interface ActivityCardProps {
    width: DimensionValue,
    height: DimensionValue,
    image: string,
    title: string,
}

const ActivityCard: React.FC<ActivityCardProps> = ({width, height, image, title}) => {
    return (
        <View style={styles.secondShadow}>
            <View style={[styles.card, {width, height}]}>
                <Image source={{uri: image}} style={styles.imageStyle}/>
                <Text style={styles.titleStyle}>{title}</Text>
            </View>
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
        width: "60%",
        minWidth: 70,
        aspectRatio: 1,
        objectFit: "fill"
    },
    titleStyle: {
        fontWeight: "bold",
        fontSize: 14,
    },
})

export default ActivityCard