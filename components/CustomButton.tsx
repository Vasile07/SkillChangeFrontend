import {Pressable, StyleSheet, Text} from "react-native";

interface CustomButtonProperties{
    onButtonClick: () => void,
    text: string
}

const CustomButton: React.FC<CustomButtonProperties> = ({onButtonClick, text}) => {
    return (
        <Pressable style={styles.buttonStyle} onPress={() => onButtonClick()}>
            <Text style={styles.textStyle}>{text}</Text>
        </Pressable>
    )
}

export default CustomButton;

const styles = StyleSheet.create({

    buttonStyle: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#26344F",
        borderRadius: 15,
    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF"
    }
})