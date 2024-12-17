import {Pressable, StyleSheet, Text} from "react-native";

interface LoginButtonProperties{
    onButtonClick: () => void
}

const LoginButton: React.FC<LoginButtonProperties> = ({onButtonClick}) => {
    return (
        <Pressable style={styles.buttonStyle} onPress={() => onButtonClick()}>
            <Text style={styles.textStyle}>Login</Text>
        </Pressable>
    )
}

export default LoginButton;

const styles = StyleSheet.create({

    buttonStyle: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "rgba(38, 52, 79, 0.68)",
        shadowOffset: {width: 0, height: 20},
        shadowRadius: 50,
        backgroundColor: "#26344F",
        borderRadius: 20,
    },
    textStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF"
    }
})