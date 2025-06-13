import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import ProfilePicture from "@/components/ProfilePicture";
import {useAuthentication} from "@/context/AuthContext";
import axiosInstance from "@/axiosInstance";
import LoadingScreen from "@/components/LoadingScreen";
import SkillsList from "@/components/SkillsList";
import Skill from "@/datas/Skill";
import UserDetails from "@/datas/UserDetails";
import {useLocalSearchParams} from "expo-router";

const MyProfilePage: React.FC = () => {
    const {isLoading, isAuthenticated} = useAuthentication();
    const [loggedInUser, setLoggedInUser] = useState<null | UserDetails>(null)
    const [option, setOption] = useState<string>("Description")
    const {userId} = useLocalSearchParams<{ userId: string }>();
    const [followers, setFollowers] = useState<Skill[]>([]);
    const [numberOfTotalMeets, setNumberOfTotalMeets] = useState<number>(0)

    useEffect(() => {
        if (userId)
            axiosInstance.get(`/users/${userId}`).then((response) => {
                setLoggedInUser(response.data)
            })
        else if (isAuthenticated)
            axiosInstance.get(`/users`).then((response) => {
                setLoggedInUser(response.data)
            })

    }, [isAuthenticated]);

    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        if (userId) {
            axiosInstance.get(`/skills/${userId}`).then((response) => {
                setSkills(response.data)
            })
            axiosInstance.get(`/users/followers/${userId}`).then((response) => {
                setFollowers(response.data)
            })
            axiosInstance.get(`/meets/totalMeets/${userId}`).then((response) => {
                setNumberOfTotalMeets(response.data)
            })
        } else if (isAuthenticated) {
            axiosInstance.get(`/skills`)
                .then((response: any) => {
                    setSkills(response.data)
                })
                .catch((error: any) => {
                    console.log(error);
                })
            axiosInstance.get(`/users/followers`)
                .then((response: any) => {
                    setFollowers(response.data)
                })
                .catch((error: any) => {
                    console.log(error);
                })
            axiosInstance.get(`/meets/totalMeets`)
                .then((response: any) => {
                    setNumberOfTotalMeets(response.data)
                })
                .catch((error: any) => {
                    console.log(error);
                })
        }
    }, [loggedInUser]);

    return (
        loggedInUser === null ?
            <LoadingScreen/>
            :
            <ScreenContainer style={styles.pageContainer}>
                <View style={styles.headerContainer}></View>
                <View style={styles.profileDataContainer}>
                    <ProfilePicture image={loggedInUser.profilePicture} diameter={151}></ProfilePicture>
                    <Text style={styles.firstAndLastNameText}>{loggedInUser.firstname} {loggedInUser.lastname}</Text>
                </View>
                <View style={styles.profileStatisticsContainer}>
                    <View style={styles.statisticDataContainer}>
                        <View style={styles.textContainer}>
                            <Text style={[styles.statisticDataText, {
                                fontSize: 15,
                                fontWeight: "bold"
                            }]}>{numberOfTotalMeets}</Text>
                            <Text style={styles.statisticDataText}>meetings</Text>
                        </View>
                    </View>
                    <View style={styles.statisticDataContainer}>
                        <View style={styles.textContainer}>
                            <Text style={[styles.statisticDataText, {
                                fontSize: 15,
                                fontWeight: "bold"
                            }]}>{skills.length}</Text>
                            <Text style={styles.statisticDataText}>skills</Text>
                        </View>
                    </View>
                    <View style={styles.statisticDataContainer}>
                        <View style={styles.textContainer}>
                            <Text style={[styles.statisticDataText, {
                                fontSize: 15,
                                fontWeight: "bold"
                            }]}>{followers.length}</Text>
                            <Text style={styles.statisticDataText}>followers</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.aboutMeAndMySkillsTabContainer}>
                    <View style={styles.optionContainer}>
                        <Pressable
                            style={[styles.optionButton, option === "Description" && {backgroundColor: "#26344F"}]}
                            onPress={() => setOption("Description")}>
                            <Text style={[styles.optionText, option !== "Description" && {color: "#26344F"}]}>
                                About me
                            </Text>
                        </Pressable>
                        <Pressable style={[styles.optionButton, option === "Skills" && {backgroundColor: "#26344F"}]}
                                   onPress={() => setOption("Skills")}>
                            <Text style={[styles.optionText, option !== "Skills" && {color: "#26344F"}]}>
                                My skills
                            </Text>
                        </Pressable>
                    </View>
                    <View style={{display: "flex", flex: 1, width: "100%"}}>
                        {
                            option === "Description" ?
                                <View style={{width: "100%", height: "100%"}}>
                                    <Text>{loggedInUser.description}</Text>
                                </View>
                                :
                                <SkillsList skills={skills}/>
                        }

                    </View>
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
        backgroundColor: "#F1F4F9"
    },
    headerContainer: {
        paddingVertical: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    profileDataContainer: {
        paddingVertical: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        width: "100%",
    },
    firstAndLastNameText: {
        fontSize: 25,
        color: "#26344F",
        fontWeight: 600
    },
    profileStatisticsContainer: {
        paddingVertical: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    aboutMeAndMySkillsTabContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    statisticDataContainer: {
        width: 70,
        height: 90,
        borderTopLeftRadius: 65,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 65,
        backgroundColor: "#FFF",
        borderColor: "#26344F",
        borderWidth: 2,
        transform: "rotate(45deg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    statisticDataText: {
        color: "#000",
        fontSize: 10,
        fontWeight: "normal",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-45deg)",
    },
    optionContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 40,
        marginLeft: 15,
    },
    optionButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: "#FFF",
        borderRadius: 20,
    },
    optionText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#FFF"
    }
})

export default MyProfilePage;