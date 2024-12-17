import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

interface OrComponentProperties{
    fontSize: number,
}

const OrComponent: React.FC<OrComponentProperties> = ({fontSize}) => {
    return (
        <View style={styles.orContainer}>
            <LinearGradient
                style={styles.bar}
                colors={["rgba(205,205,205, 0.0)", "rgba(103,103,103,1.0)"]}
                locations={[0.15, 1.0]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <Text style={{...styles.orText, fontSize: fontSize}}>Or</Text>
            <LinearGradient
                style={styles.bar}
                colors={["rgba(103,103,103,1.0)", "rgba(205,205,205, 0.0)",]}
                locations={[0.0, 0.85]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </View>
    )
}

export default OrComponent;

const styles = StyleSheet.create({
    orContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    bar: {
        width: 120,
        height: 4,
    },
    orText: {
        fontWeight: "bold",
        color: "#676767"
    }
})