import React, {useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import TestComp from "@/components/TestComp";

const ChatPage: React.FC = () => {
    const [type, setType] = useState<string>("type1");


    return (
        <ScreenContainer style={styles.pageContainer}>
            <Text>CHAT PAGE - {type}</Text>
            <View style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly"
            }}>
                <Button title={"Type 1"} onPress={() => setType("type1")}/>
                <Button title={"Type 2"} onPress={() => setType("type2")}/>
                <Button title={"Type 3"} onPress={() => setType("type3")}/>
            </View>
            <TestComp type={type}/>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ChatPage;