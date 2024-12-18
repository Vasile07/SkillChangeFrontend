import {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import OrComponent from "@/components/OrComponent";

const ForgotPasswordEmailCompletionForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    return (
        <View style={styles.formContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Please enter the email address you used to create your account, and we'll
                    send you a verification code.</Text>
            </View>
            <View style={styles.emailInput}>
                <CustomInput label={"Email"} value={email} setValue={setEmail}/>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.customButton}>
                    <CustomButton onButtonClick={() => {
                    }} text={"Send Email"}/>
                </View>
                <OrComponent fontSize={20}/>
                <Pressable style={{width: "auto", height: "auto"}}>
                    <Text style={styles.backToLoginLink}>Back to login</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ForgotPasswordEmailCompletionForm;

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "auto",
    },
    emailInput: {
        width: "80%",
    },
    footerContainer: {
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
    textStyle: {
        fontSize: 20,
        color: "#26344F",
        fontWeight: "bold"
    },
    textContainer: {
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
});