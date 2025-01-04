import Skill from "@/datas/Skill";
import React from "react";
import {View} from "react-native";
import ActivityCard from "@/components/ActivityCard";

const SkillsList: React.FC<{ skills: Skill[] }> = ({skills}) => {
    return (
        <View>
            {
                skills.map(skill => (
                    <ActivityCard width={100} height={100} image={skill.picture} title={skill.name}/>
                ))
            }
        </View>
    )

}

export default SkillsList