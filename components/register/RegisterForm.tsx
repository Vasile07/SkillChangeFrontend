import {Pressable, StyleSheet, Text, View} from "react-native";
import CustomInput from "@/components/CustomInput";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import OrComponent from "@/components/OrComponent";
import axios from "axios";
import {router} from "expo-router";

const RegisterForm: React.FC = () => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const register = () => {
        axios.post("http://localhost:8080/users/register", {firstname, lastname, country, email, password})
            .then((response) => {
                router.push("/LoginScreen")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <View style={styles.formContainer}>
            <View style={styles.inputsContainer}>
                <CustomInput label={"Firstname"} value={firstname} setValue={setFirstname}/>
                <CustomInput label={"Lastname"} value={lastname} setValue={setLastname}/>
                <CustomInput label={"Country"} value={country} setValue={setCountry}/>
                <CustomInput label={"Email"} value={email} setValue={setEmail}/>
                <CustomInput label={"Password"} value={password} setValue={setPassword}/>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.customButton}>
                    <CustomButton onButtonClick={register} text={"Sign up"}/>
                </View>
                <OrComponent  fontSize={20}/>
                <Pressable style={{width: "auto", height: "auto"}} onPress={() => router.push("/LoginScreen")}>
                    <Text style={styles.backToLoginLink}>Back to login</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default RegisterForm;

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    inputsContainer: {
        width: "85%",
        gap: 5,
    },
    customButton: {
        width: 250,
        height: 47,
    },
    footerContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        flex: 1,
        gap: 20,
        marginBottom: 15,
    },
    backToLoginLink: {

        color: "#26344F",
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: "underline"
    }

})