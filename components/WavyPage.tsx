import {Image, StyleSheet, Text, View} from "react-native";

interface WavyPageProperties{
    title: string,
    content: React.ReactNode | null
}

const WavyPage: React.FC<WavyPageProperties> = ({title, content}) => {
    return(
        <View style={styles.pageContainer}>
            <View style={styles.titleContaier}>
                <Image source={require("../assets/images/TopWave.png")} style={{width: "100%", height: "100%", resizeMode: "stretch", position: "absolute"}}/>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.contentContainer}>
                {content}
            </View>
            <Image source={require("../assets/images/BottomWave.png")} style={{width: "100%", height: "20%", resizeMode: "stretch"}}/>
        </View>
    )
}

export default WavyPage;

const styles = StyleSheet.create({
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF"
    },
    contentContainer: {
        display: "flex",
        width: "100%",
        flex: 1,
    },
    titleContaier: {
        position: "relative",
        width: "100%",
        height: "20%"
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#FFF",
        position: "absolute",
        left: "50%",
        top: "35%",
        transform: "translate(-50%, -50%)"
    }
})
