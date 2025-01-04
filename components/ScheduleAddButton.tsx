import {Image, Pressable, StyleSheet} from "react-native";

const ScheduleAddButton: React.FC = () => {
    return (
        <Pressable style={styles.addButton}>
            <Image source={require("@/assets/images/addPlusScheduleActivity.png")} style={styles.addImage}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    addButton: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#78A4F9",
        borderRadius: 25,
        shadowColor: "rgba(120, 164, 249, 0.54)",
        shadowOffset: {width: 0, height: 17},
        shadowRadius: 15,
    },
    addImage: {
        width: "65%",
        height: "65%",
    }
})

export default ScheduleAddButton
