import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import Skill from "@/datas/Skill";
import axiosInstance from "@/axiosInstance";
import SkillsList from "@/components/SkillsList";
import {useStorageSystem} from "@/hooks/useStorageSystem";
import LoadingScreen from "@/components/LoadingScreen";
import CustomSearchBar from "@/components/CustomSearchBar";

const ExplorePage: React.FC = () => {
    // const [skills, setSkills] = useState<Skill[]>([])
    const [skills, setSkills] = useStorageSystem<Skill[]>("allSkills", []);

    const [value, setValue] = useState<string>("")

    useEffect(() => {
        axiosInstance.get(`/skills/byType`)
            .then((response: any) => {
                setSkills(response.data)
            })
            .catch((error: any) => {
                console.log(error);
            })
    }, []);

    return (
        <ScreenContainer style={styles.pageContainer}>
            <View style={styles.searchBar}>
                <CustomSearchBar value={value} setValue={setValue}/>
            </View>
            <View style={styles.skillList}>
                {
                    skills != null ?
                        <SkillsList skills={skills}/>
                        :
                        <LoadingScreen/>
                }

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
    skillList: {
        width: "100%",
        display: "flex",
        flex: 1,
    },
    searchBar: {
        width: "80%",
        marginVertical: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default ExplorePage;