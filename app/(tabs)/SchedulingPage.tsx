import {Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import SchedulePageBackground from "@/components/SchedulePageBackground";
import {SelectList} from "react-native-dropdown-select-list";
import {useStorageSystem} from "@/hooks/useStorageSystem";
import Skill from "@/datas/Skill";
import axiosInstance from "@/axiosInstance";
import UserDetails from "@/datas/UserDetails";
import {Checkbox} from "react-native-paper";
import InvitedFriendsComponent from "@/components/InvitedFriendsComponent";
import {DatePickerModal, TimePickerModal} from "react-native-paper-dates";

const SchedulingPage: React.FC = () => {
    const [skills, setSkills] = useStorageSystem<Skill[]>("allSkills", [])
    const [selectedSkillId, setSelectedSkillId] = useState<number>(-1);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

    const [friends, setFriends] = useStorageSystem<UserDetails[]>("friends", [])
    const [selectedFriends, setSelectedFriends] = useState<UserDetails[]>([])

    const [modalVisible, setModalVisible] = useState(false);

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [openDate, setOpenDate] = useState(false);

    const [time, setTime] = useState<{ hours: number | undefined, minutes: number | undefined }>({
        hours: undefined,
        minutes: undefined
    });
    const [openTime, setOpenTime] = useState(false);

    const [selectedColor, setSelectedColor] = useState('#92140C');

    const shadowStyle = Platform.OS === 'web' ? {
        boxShadow: `0px 10px 10px -5px ${selectedColor}BF`, // BF = 75% opacity in hex
    } : {
        shadowColor: selectedColor,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.75,
        shadowRadius: 10,
        elevation: 10,
    };

    const colorInputRef = useRef(null);

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

    const confirmSchedule = () => {
        axiosInstance.post(`/meets`, {
            day: `${date?.getFullYear()}-${String(date?.getMonth() + 1).padStart(2, '0')}-${String(date?.getDate()).padStart(2, '0')}`,
            startHour: `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:00`,
            endHour: `${String(time.hours + 2).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:00`,
            skillId: selectedSkillId,
            color: selectedColor,
            usersIds: selectedFriends.map((fr) => fr.userId),
        })
            .then(() => {

            }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <View style={styles.pageContainer} testID={"scheduling-page"}>
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
            <View style={styles.dateTimeContainer}>
                <View>
                    <Text style={styles.dateTimeTitle}>Date and time</Text>
                </View>
                <View style={styles.datetimePickersContainers}>
                    <View>
                        <Pressable style={styles.pickerStyle} onPress={() => setOpenDate(true)}>
                            <Text
                                style={styles.pickerTitle}>{date ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : "Pick Date"}</Text>
                        </Pressable>

                        <DatePickerModal
                            locale="en"
                            mode="single"
                            visible={openDate}
                            onDismiss={() => setOpenDate(false)}
                            date={date}
                            onConfirm={(params) => {
                                setOpenDate(false);
                                setDate(params.date);
                            }}
                        />
                    </View>
                    <View>
                        <Pressable style={styles.pickerStyle} onPress={() => setOpenTime(true)}>
                            <Text
                                style={styles.pickerTitle}>{time.hours != undefined && time.minutes != undefined ? `${time.hours}:${time.minutes}` : "Pick Time"}</Text>
                        </Pressable>

                        <TimePickerModal
                            visible={openTime}
                            onDismiss={() => setOpenTime(false)}
                            onConfirm={({hours, minutes}) => {
                                setOpenTime(false);
                                setTime({hours, minutes});
                            }}
                            hours={time.hours}
                            minutes={time.minutes}
                        />
                    </View>
                </View>

            </View>

            <View style={styles.friendsInvitedContainer}>
                <InvitedFriendsComponent selectedFriends={selectedFriends}/>
                <Pressable onPress={() => setModalVisible(true)} style={{height: "100%", justifyContent: "flex-end"}}>
                    <Text style={styles.addMoreText}>Add more</Text>
                </Pressable>
            </View>

            <View style={styles.colorPickerContainer}>
                <Text style={styles.dateTimeTitle}>
                    Pick a color
                </Text>
                {Platform.OS === 'web' && (
                    <Pressable
                        onPress={() => colorInputRef.current?.click()}
                        style={[styles.colorCircle, shadowStyle, {backgroundColor: selectedColor}]}
                    >
                        <input
                            ref={colorInputRef}
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            style={styles.hiddenInput}
                        />
                    </Pressable>
                )}
            </View>

            <Pressable style={styles.doneButton} onPress={confirmSchedule}>
                <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
                    <Pressable style={styles.popup} onPress={() => {
                    }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                            {
                                friends.map((friend, index) => (
                                    <View style={styles.friendColumn} key={index}>

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
        left: 10,
        display: "flex",
        flexDirection: "row",
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
    },
    addMoreText: {
        marginBottom: 4,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "#000",
        textDecorationLine: "underline",
    },
    dateTimeContainer: {
        width: "100%",
        height: 30,
        position: "absolute",
        top: "45%",
        left: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    dateTimeTitle: {
        color: "#26344F",
        fontSize: 28,
        fontWeight: "bold",
    },
    datetimePickersContainers: {
        display: "flex",
        gap: 20,
        flexDirection: "row",
    },
    pickerStyle: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: "#78A4F9",
        borderRadius: 15,

    },
    pickerTitle: {
        color: "#FFF",
        fontWeight: "bold",
    },
    colorPickerContainer: {
        width: "100%",
        height: 30,
        position: "absolute",
        top: "75%",
        left: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 30,
        overflow: 'hidden',
        cursor: 'pointer',
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
    },
    doneButton: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: "#78f98c",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    doneButtonText: {
        color: "#000",
        fontSize: 15,
        fontWeight: "bold",
        textDecorationLine: "underline"
    }


})

export default SchedulingPage;