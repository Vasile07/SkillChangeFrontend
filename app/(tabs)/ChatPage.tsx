import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import FriendsList from "@/components/chatpage/FriendsList";
import ChatListPreview from "@/components/chatpage/ChatListPreview";

const ChatPage: React.FC = () => {
    const [type, setType] = useState<string>("type1");


    return (
        <ScreenContainer style={styles.pageContainer}>
            <FriendsList/>
            <View style={styles.chatContainer}>
                <ChatListPreview/>
            </View>
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
        backgroundColor: "#F1F4F9",
    },
    chatContainer: {
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ChatPage;