import {StyleSheet, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {TextInput} from "react-native-paper";

interface CodeInputProperties {
    code: [string, string, string, string],
    setCode: any,
}

const CodeInput: React.FC<CodeInputProperties> = ({code, setCode}) => {

    const inputRefs = code.map((letter) => useRef(null));
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const onChangeLetter = (letterIndex: number, letter: string) => {
        setCode(code.map((codeLetter, index) => index === letterIndex ? letter.charAt(letter.length - 1) : codeLetter))
        if (letterIndex < inputRefs.length - 1)
            setCurrentIndex(letterIndex + 1)
    }

    useEffect(() => {
        if (currentIndex < inputRefs.length)
            if (inputRefs[currentIndex].current)
                inputRefs[currentIndex].current.focus()
    }, [currentIndex])

    return (
        <View style={styles.codeContainer}>
            {
                code.map((codeLetter, index) => {
                    return (
                        <TextInput
                            ref={inputRefs[index]}
                            key={index}
                            value={codeLetter}
                            onChangeText={text => onChangeLetter(index, text)}
                            textColor={"#26344F"}
                            style={styles.input}
                            underlineStyle={{borderWidth: 1.5}}
                            underlineColor={"#26344F"}
                            activeUnderlineColor={"#26344F"}
                        />
                    )
                })
            }
        </View>
    )
}

export default CodeInput;

const styles = StyleSheet.create({
    codeContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    input: {
        width: "20%",
        fontSize: 20,
        backgroundColor: "#FFF",
    }
})