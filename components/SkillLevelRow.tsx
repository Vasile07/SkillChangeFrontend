import {UserSkill} from "@/datas/SkillDetails";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import ProfilePicture from "@/components/ProfilePicture";

const SkillLevelRow: React.FC<{ userSkill: UserSkill }> = ({userSkill}) => {
    return (
        <View style={styles.rowContainer}>
            <ProfilePicture image={userSkill.profilePicture} diameter={45}/>
            <Text style={styles.nameStyle}>{userSkill.firstname}</Text>
            <View style={styles.starsContainer}>
                <Text style={{color: "white"}}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },
    nameStyle: {
        marginLeft: 10,
        fontSize: 23,
        fontWeight: "600",
        flex: 0,
    },
    starsContainer: {
        display: "flex",
        alignItems: "flex-end",
        flex: 1, // Take up all remaining space
        backgroundColor: "blue",
        minWidth: 0,
    },
});


export default SkillLevelRow