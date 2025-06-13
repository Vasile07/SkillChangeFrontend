import React, {useEffect} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import MessagePreview from "@/datas/MessagePreview";
import {useStorageSystem} from "@/hooks/useStorageSystem";
import axiosInstance from "@/axiosInstance";
import {useRouter} from "expo-router";

const ChatListPreview: React.FC = () => {

    const router = useRouter();
    const [chatPreview, setChatPreview] = useStorageSystem<MessagePreview[]>("chatPreview", []);

    useEffect(() => {
        axiosInstance.get("/messages/chatPreviews").then((response) => {
            setChatPreview(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);


    return (
        <ScrollView style={styles.chatScrollContainer}>
            <View style={styles.chatContainer}>
                {
                    chatPreview.map(cP => (
                        <Pressable style={styles.chatOptionPreview} key={cP.userId}
                                   onPress={() => router.push(`/DirectChatPage?name=${encodeURIComponent(cP.userName)}&userId=${encodeURIComponent(cP.userId)}`)}>
                            <View style={styles.avatar}>
                                <Image style={{width: "100%", height: "100%"}}
                                       source={{uri: cP.userProfilePicture ? cP.userProfilePicture : "../../assets/images/unknownUser.png"}}/>
                            </View>
                            <View style={styles.nameAndMessageContainer}>
                                <View style={styles.halfContainer}>
                                    <Text style={{
                                        color: "#26344F",
                                        fontWeight: "bold",
                                        fontSize: 24
                                    }}>{cP.userName}</Text>
                                </View>
                                <View style={styles.halfContainer}>
                                    <Text
                                        style={{color: "#26344F", fontWeight: "bold", fontSize: 15}}>{cP.message}</Text>
                                </View>
                            </View>
                        </Pressable>
                    ))
                }

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    chatContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderTopWidth: 2,
        borderTopColor: "#26344F",
    },
    chatScrollContainer: {
        width: "100%",
        height: "100%",
    },
    chatOptionPreview: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 2,
        borderBottomColor: "#26344F",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    nameAndMessageContainer: {
        height: "100%",
    },
    halfContainer: {
        marginTop: 10,
        flex: 1,
        display: "flex"
    }

})

export default ChatListPreview;