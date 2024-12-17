import {View, StyleSheet, Text, Image} from "react-native";
import React from "react";
import LoginForm from "@/components/login/LoginForm";
import {LinearGradient} from "expo-linear-gradient";

const LoginScreen: React.FC = () => {

    return (
        <LinearGradient
            colors={["#F4EEF3","#E7F1F9", "#E7F1F9", "#F4EEF3"]}
            locations={[0, 0.43, 0.78, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.pageContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Image source={require("../assets/images/LogoSkillChange.png")}/>
                <Text style={styles.skillChangeTitle}>SkillChange</Text>
            </View>
            <View style={styles.formContainer}>
                <LoginForm/>
            </View>
        </LinearGradient>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    pageContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
    },
    welcomeText: {
        color: "#26344F",
        fontWeight: "bold",
        fontSize: 40,
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: 0, height: 20 },
        textShadowRadius: 15,
        elevation: 15,
    },
    skillChangeTitle: {
        fontWeight: "bold",
        color: "#26344F",
        fontSize: 45,
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: 0, height: 20 },
        textShadowRadius: 15,
        elevation: 15,
    }
})