import {Pressable, StyleSheet, Text, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import OrComponent from "@/components/OrComponent";
import React, {useState} from "react";
import CustomInput from "@/components/CustomInput";


const ForgotPasswordNewPasswordForm: React.FC = () => {
    const [password, setPassword] = useState<string>("")
    return (
        <View style={styles.formContainer}>
            <View style={styles.codeInputContainer}>
                <Text style={styles.textCode}>Enter your new password</Text>
                <CustomInput label={"New password"} value={password} setValue={setPassword}/>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.customButton}>
                    <CustomButton onButtonClick={() => {
                    }} text={"Change your password"}/>
                </View>
                <OrComponent fontSize={20}/>
                <Pressable style={{width: "auto", height: "auto"}}>
                    <Text style={styles.backToLoginLink}>Back to login</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    formContainer: {
        width: "80%",
        marginHorizontal: "auto",
        height: "80%",
        marginVertical: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    codeInputContainer: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    textCode: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#26344F"
    }, footerContainer: {
        height: "auto",
        width: "80%",
        gap: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    backToLoginLink: {
        color: "#26344F",
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: "underline"
    },
    customButton: {
        width: 250,
        height: 47,
    },

})

export default ForgotPasswordNewPasswordForm;