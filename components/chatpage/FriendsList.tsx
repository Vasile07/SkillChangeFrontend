import React, {useEffect} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import UserDetails from "@/datas/UserDetails";
import {useStorageSystem} from "@/hooks/useStorageSystem";
import axiosInstance from "@/axiosInstance";

const FriendsList: React.FC = () => {
    const [friends, setFriends] = useStorageSystem<UserDetails[]>("friends", []);

    useEffect(() => {
        axiosInstance.get("/users/myFriends").then((response) => {
            setFriends(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <View style={{width: "100%"}}>
            <ScrollView style={{width: "100%", marginLeft: 30, paddingVertical: 20}} horizontal={true}>
                <Pressable style={[styles.avatar, styles.addButton]}>
                    <Image style={{width: "50%", height: "50%"}} source={{uri: "../../assets/images/plus.png"}}/>
                </Pressable>
                <View style={styles.scrollContainerStyle}>
                    {
                        friends.map((friend) => (
                            <Pressable style={styles.avatarContainer} key={friend.userId} onPress={() => {
                            }}>
                                <View style={styles.avatar}>
                                    <Image style={{width: "100%", height: "100%"}}
                                           source={{uri: friend.profilePicture ? friend.profilePicture : "../../assets/images/unknownUser.png"}}/>
                                </View>
                                <Text
                                    style={styles.text}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >{friend.lastname} {friend.firstname}</Text>
                            </Pressable>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainerStyle: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 20,
    },
    avatarContainer: {
        width: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    text: {
        width: "100%",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
    },
    addButton: {
        width: 70,
        height: 70,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default FriendsList;