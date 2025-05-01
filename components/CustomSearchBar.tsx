import React from "react";
import {StyleSheet, TextInput, View} from "react-native";

const CustomSearchBar: React.FC<{ value: string, setValue: (newVal: string) => void }> = ({value, setValue}) => {
    return (
        <View style={style.searchbar}>
            {/*<View style={style.inputBackground}>*/}
            <TextInput placeholder={"Search..."} style={style.input}/>
            {/*</View>*/}

        </View>
    )
}

export default CustomSearchBar;

const style = StyleSheet.create({
    searchbar: {
        width: "100%",
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#26344F",
        borderRadius: 20,
    },
    inputBackground: {},
    input: {
        width: "68%",
        height: "70%",
        backgroundColor: "#F1F4F9",
        borderRadius: 15,
        borderWidth: 0,
        padding: 10,
        color: "#26344F",
    }
})