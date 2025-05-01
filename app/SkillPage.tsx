import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {SkillDetails} from "@/datas/SkillDetails";
import axiosInstance from "@/axiosInstance";
import SkillLevelRow from "@/components/SkillLevelRow";

const SkillPage: React.FC = () => {
    const router = useRouter()
    const {id} = useLocalSearchParams<{ id: string }>();

    const [skill, setSkill] = useState<SkillDetails | null>(null)

    useEffect(() => {
        axiosInstance.get(`/skills/details/${id}`)
            .then((response) => {
                setSkill(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return (
        <View style={styles.pageContainer}>
            <View style={styles.transparentBack}/>
            <Pressable style={styles.exitButton} onPress={() => router.back()}>
                <Text style={styles.exitButtonText}>x</Text>
            </Pressable>
            <View style={styles.mainContainer}>
                {
                    skill != null &&
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{skill.name}</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>Description</Text>
                            <Text style={styles.descriptionText}>{skill.description}</Text>
                        </View>
                        <View style={styles.usersContainer}>
                            <Text style={styles.descriptionText}>Skilled Users</Text>
                            <ScrollView>
                                {
                                    skill.users.map((userSkill) => (
                                        <SkillLevelRow key={userSkill.userId} userSkill={userSkill}/>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </View>
                }

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#FFF"
    },
    transparentBack: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(38, 52, 79,0.75)"
    },
    mainContainer: {
        width: "100%",
        height: "82%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
    },
    exitButton: {
        position: "absolute",
        top: 10,
        left: 20,
        cursor: "pointer",
    },
    exitButtonText: {
        fontSize: 30,
        color: "#FFF"
    },
    contentContainer: {
        display: "flex",
        width: "100%",
        height: "100%",
        gap: 25,
    },
    titleContainer: {
        width: "100%",
        marginTop: 25,
        marginLeft: 35,
    },
    titleText: {
        fontSize: 30,
        color: "#000",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    descriptionContainer: {
        width: "100%",
        marginLeft: 15,
        height: "40%",
    },
    descriptionText: {
        color: "#000",
        fontSize: 20,
        fontWeight: 500,
    },
    usersContainer: {
        display: "flex",
        flex: 1,
        marginLeft: 15,
    },
})


export default SkillPage;