import React, {useEffect, useState} from "react";
import {Image, Platform, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import MessageView from "@/datas/MessageView";
import axiosInstance from "@/axiosInstance";
import {useWebSocket} from "@/hooks/useWebSocket";
import * as SecureStore from "expo-secure-store";


const DirectChatPage: React.FC = () => {
    const {name, userId} = useLocalSearchParams<{ name: string, userId: number }>();
    const {connect, disconnect} = useWebSocket();
    const router = useRouter();
    const [text, setText] = useState<string>("");
    const [messages, setMessages] = useState<MessageView[]>([]);

    useEffect(() => {
        const setupWebSocket = async () => {
            let token = "";

            if (Platform.OS === "web") {
                try {
                    token = localStorage.getItem("jwt") || "";
                } catch (e) {
                    console.error("Local storage is unavailable:", e);
                }
            } else {
                try {
                    token = (await SecureStore.getItemAsync("jwt")) || "";
                } catch (e) {
                    console.error("SecureStore error:", e);
                }
            }

            connect(token, (data) => {
                if (data.senderId == userId) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                }
            });
        };

        setupWebSocket();

        return () => {
            disconnect();
        };
    }, []);

    useEffect(() => {
        axiosInstance.get(`/messages/chat/${userId}`).then((response) => {
            console.log(response.data);
            setMessages(response.data);
        })
    }, []);

    const sendMessage = () => {
        axiosInstance.post("/messages/send", {message: text, receiverId: userId}).then((response) => {
            setMessages((old) => [...old, response.data])
            setText("");
        })
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.headerContainer}>
                <Pressable style={{height: 45, width: 45, marginLeft: 15}}
                           onPress={() => router.push("/(tabs)/ChatPage")}>
                    <Image style={{width: "100%", height: "100%"}} source={{uri: "../assets/images/back.png"}}/>
                </Pressable>
                <View style={styles.bar}></View>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.chatContainer}>
                {
                    messages.sort((m1, m2) => m1.messageId - m2.messageId).map((message) => (
                        <View key={message.messageId} style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: message.senderId == userId ? "flex-start" : "flex-end"
                        }}>
                            <View style={{
                                marginHorizontal: 7,
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                borderRadius: 10,
                                backgroundColor: message.senderId == userId ? "#aec8fb" : "#6c94e0"
                            }}>
                                <Text>{message.message}</Text>
                            </View>

                        </View>
                    ))
                }
            </View>
            <View style={styles.chatSendMessage}>
                <TextInput style={styles.textInput} value={text} onChangeText={(newText) => setText(newText)}/>
                <Pressable style={styles.sendButton} onPress={sendMessage}>
                    <Image style={{width: "60%", height: "60%"}} source={{uri: "../assets/images/send-message.png"}}/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#F1F4F9"
    },
    headerContainer: {
        width: "100%",
        height: 65,
        backgroundColor: "#26344F",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    bar: {
        height: "75%",
        width: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF"
    },
    chatContainer: {
        display: "flex",
        width: "100%",
        flex: 1,
        marginTop: 15,
        gap: 5,
    },
    chatSendMessage: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 60,
        marginBottom: 30,
        borderTopColor: "rgba(38, 52, 79, 1.00)",
        borderTopWidth: 3,
    },

    sendButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        aspectRatio: 1,
    },
    textInput: {
        display: "flex",
        flex: 1,
        backgroundColor: "#6c94e0",
        borderRadius: 15,
        marginHorizontal: 12,
        marginVertical: "auto",
        height: "67%",
    }
})

export default DirectChatPage;