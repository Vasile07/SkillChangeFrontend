import {Pressable, StyleSheet, Text, View} from "react-native";
import LoginInput from "@/components/login/LoginInput";
import {useState} from "react";
import LoginButton from "@/components/login/LoginButton";
import OrComponent from "@/components/OrComponent";
import {useAuthentication} from "@/context/AuthContext";

const LoginForm: React.FC = () =>{
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const {loginFunction} = useAuthentication()

    const login = () => {
        loginFunction(email, password);
    }

    return (
        <View style={styles.formContainer}>
            <View style={styles.inputView}>
                <LoginInput label={"Email"} value={email} setValue={setEmail}/>
                <LoginInput label={"Email"} value={password} setValue={setPassword}/>
            </View>
            <View style={styles.passwordRecoveryContainer}>
                <Pressable style={{width: "auto", height: "auto"}}>
                    <Text style={styles.passwordRecoveryLink}>Recovery Password</Text>
                </Pressable>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.buttonContainer}>
                    <LoginButton onButtonClick={login}/>
                </View>
                <OrComponent  fontSize={27}/>
                <Pressable style={{width: "auto", height: "auto"}}>
                    <Text style={styles.registerHereLink}>Register here</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginForm;

const styles = StyleSheet.create({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "80%",
        height: "100%",
    },
    inputView: {
        height: "auto",
        width: "100%",
        gap: 30
    },
    passwordRecoveryContainer: {
        height: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 15
    },
    passwordRecoveryLink: {
        color: "#676767",
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: "underline"
    },
    footerContainer: {
        width: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 20,
        marginBottom: 50,
    },
    buttonContainer: {
        width: 250,
        height: 55,
        cursor: "pointer",
    },
    registerHereLink: {

        color: "#26344F",
        fontWeight: "bold",
        fontSize: 25,
        textDecorationLine: "underline"
    }

})