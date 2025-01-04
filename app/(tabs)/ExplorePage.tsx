import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import Skill from "@/datas/Skill";
import axiosInstance from "@/axiosInstance";
import SkillsList from "@/components/SkillsList";

const ExplorePage: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/skills/byType')
            .then((response: any) => {
                setSkills(response.data)
            })
            .catch((error: any) => {
                console.log(error);
            })
    }, []);

    return (
        <ScreenContainer style={styles.pageContainer}>
            <View style={styles.skillList}>
                <SkillsList skills={skills}/>
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
    },
    skillList: {
        width: "100%",
        display: "flex",
        flex: 1,
    }
})

export default ExplorePage;