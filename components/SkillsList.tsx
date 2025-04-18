import Skill from "@/datas/Skill";
import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import ActivityCard from "@/components/ActivityCard";

const SkillsList: React.FC<{ skills: Skill[] }> = ({skills}) => {

    const chunkArray = (arr: Skill[], chunkSize: number = 3) => {
        let result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    }

    return (
        <ScrollView style={styles.listContainer}>
            {
                chunkArray(skills).map(skillRow => (
                    <View style={styles.rowContainer}>
                        {
                            skillRow.map(skill => (
                                <ActivityCard key={skill.skillId} width={100} height={100} image={skill.picture}
                                              title={skill.name} id={skill.skillId}/>
                            ))
                        }
                    </View>

                ))
            }
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    rowContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 20,
    }
})

export default SkillsList