import {Button, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import SchedulePageBackground from "@/components/SchedulePageBackground";
import {SelectList} from "react-native-dropdown-select-list";
import {useStorageSystem} from "@/hooks/useStorageSystem";
import Skill from "@/datas/Skill";
import axiosInstance from "@/axiosInstance";
import UserDetails from "@/datas/UserDetails";
// import {Checkbox} from "react-native-paper";
import {Checkbox} from "react-native-paper";

const SchedulingPage: React.FC = () => {
    const [skills, setSkills] = useStorageSystem<Skill[]>("allSkills", [])
    const [selectedSkillId, setSelectedSkillId] = useState<number>(-1);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

    const [friends, setFriends] = useStorageSystem<UserDetails[]>("friends", [])
    const [selectedFriends, setSelectedFriends] = useState<UserDetails[]>([])

    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        axiosInstance.get(`/skills/byType`)
            .then((response: any) => {
                setSkills(response.data)
            })
            .catch((error: any) => {
                console.log(error);
            })

        axiosInstance.get(`/users/myFriends`)
            .then((response: any) => {
                setFriends(response.data)
            })
            .catch((error: any) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        const l = skills.filter((skill) => skill.skillId == selectedSkillId);
        if (l.length == 0)
            setSelectedSkill(null)
        else
            setSelectedSkill(l[0])
    }, [selectedSkillId]);

    return (
        <View style={styles.pageContainer}>
            <View style={styles.backgroundContainer}>
                <SchedulePageBackground/>
            </View>
            <View style={styles.activityView}>
                <View style={styles.upperActivityContainer}>
                    <Text style={styles.activityText}>Activity</Text>
                    <View style={[styles.cardContainer, selectedSkill && {backgroundColor: "#FFF"}]}>
                        {
                            selectedSkill &&
                            <Image style={{width: "80%", height: "80%"}} source={{uri: selectedSkill.picture}}></Image>
                        }

                    </View>
                </View>
                <View style={styles.dropdownContainer}>
                    <SelectList boxStyles={styles.boxStyle} dropdownStyles={styles.boxStyle}
                                setSelected={(val: number) => setSelectedSkillId(val)} data={skills.map(skill => {
                        return {key: skill.skillId, value: skill.name}
                    })}/>
                </View>
            </View>
            <View style={styles.friendsInvitedContainer}>
                <View></View>
                <Button title={"Add more"} onPress={() => setModalVisible(true)}/>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Android back button
            >
                <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
                    <Pressable style={styles.popup} onPress={() => {
                    }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                            {
                                friends.map((friend) => (
                                    <View style={styles.friendColumn}>

                                        <Checkbox
                                            status={selectedFriends.some(f => f.userId === friend.userId) ? "checked" : "unchecked"}
                                            onPress={() => {
                                                if (selectedFriends.some(f => f.userId === friend.userId)) {
                                                    setSelectedFriends(prev => prev.filter(f => f.userId !== friend.userId));
                                                } else {
                                                    setSelectedFriends(prev => [...prev, friend]);
                                                }
                                            }}
                                        />
                                        <Text>{friend.firstname} {friend.lastname}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    backgroundContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    activityView: {
        top: "15%",
        left: "50%",
        transform: "translate(-50%, 0)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    activityText: {
        fontSize: 36,
        color: "#FFF",
        fontWeight: "bold",
    },
    dropdownContainer: {
        width: "100%",
    },
    boxStyle: {
        backgroundColor: "#FFF",
    },
    cardContainer: {
        width: 70,
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#FFF",
        borderRadius: 15,
    },
    upperActivityContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    friendsInvitedContainer: {
        width: "100%",
        height: 30,
        position: "absolute",
        top: "60%",
        left: 0
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: 300,
        height: "50%",
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    friendColumn: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    }

})

export default SchedulingPage;