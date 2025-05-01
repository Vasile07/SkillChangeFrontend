import React from "react";
import {StyleSheet} from "react-native";
import {TextInput} from 'react-native-paper';

interface LoginInputProperties {
    label: string,
    value: string,
    setValue: (newValue: string) => void,
    testID: string,
}

const LoginInput: React.FC<LoginInputProperties> = ({label, value, setValue, testID}) => {

    return (
        <TextInput
            testID={testID}
            label={label}
            value={value}
            mode={"flat"}
            onChangeText={text => setValue(text)}
            textColor={"#26344F"}
            style={styles.input}
            underlineStyle={{borderRadius: 15}}
            underlineColor={"transparent"}
            activeUnderlineColor={"#26344F"}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        fontSize: 20,
        backgroundColor: "#FFF",
        borderWidth: 0
    }
})

export default LoginInput;