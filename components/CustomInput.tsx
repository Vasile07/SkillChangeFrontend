import {TextInput} from "react-native-paper";
import React from "react";
import {StyleSheet} from "react-native";

interface CustomInputProperties {
    label: string,
    value: string,
    setValue: (newValue: string) => void,
}

const CustomInput: React.FC<CustomInputProperties> = ({label, value, setValue}) => {
    return (
        <TextInput
            label={label}
            value={value}
            mode={"flat"}
            onChangeText={text => setValue(text)}
            textColor={"#26344F"}
            style={styles.input}
            underlineStyle={{borderWidth: 1.5}}
            underlineColor={"#26344F"}
            activeUnderlineColor={"#26344F"}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        fontSize: 20,
        backgroundColor: "#FFF",
    }
})

export default CustomInput;