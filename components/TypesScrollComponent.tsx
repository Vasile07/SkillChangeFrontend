import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text} from "react-native";
import TypeProperties from "@/datas/TypeProperties";

const TypesScrollComponent: React.FC<{ type: TypeProperties, setType: any }> = ({type, setType}) => {
    const [types, setTypes] = useState<TypeProperties[]>([]);

    useEffect(() => {
        //TODO: Fetch data from server
        setTypes([
            {id: 0, type: "All types"},
            {id: 1, type: "Type 1"},
            {id: 2, type: "Type 2"},
            {id: 3, type: "Type 3"},
            {id: 4, type: "Type 4"},
            {id: 5, type: "Type 5"},
            {id: 6, type: "Type 6"},
        ])
    }, []);

    return (
        <ScrollView style={styles.scrollContainerStyle} horizontal={true}>
            {
                types.map((t) => (
                    <Pressable style={[styles.typeButton, {backgroundColor: t.id === type.id ? "#26344F" : "#FFF"}]}
                               key={t.id} onPress={() => setType(t)}>
                        <Text style={[styles.text, {color: t.id === type.id ? "#FFF" : "#26344F"}]}>
                            {t.type}
                        </Text>
                    </Pressable>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainerStyle: {
        height: "100%",
        width: "auto",
        marginLeft: 30,
    },
    typeButton: {
        marginRight: 25,
        height: 50,
        width: "27%",
        // backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
    },
    text: {
        // color: "#26344F",
        fontSize: 15,
        fontWeight: "bold",
    }
});

export default TypesScrollComponent;