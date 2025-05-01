import {UserSkill} from "@/datas/SkillDetails";
import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "@/components/ProfilePicture";

const SkillLevelRow: React.FC<{ userSkill: UserSkill }> = ({userSkill}) => {
    const obtainStarsUrl: (level: number) => [string, string, string, string, string] = (level) => {
        const starUrls: [string, string, string, string, string] = ["", "", "", "", ""]
        let poz = 0;
        while (level >= 1) {
            starUrls[poz] = "../../assets/images/rating/full-star.png"
            level -= 1;
            poz++;
        }
        if (level > 0) {
            starUrls[poz] = "../../assets/images/rating/half-star.png"
            poz++;
        }
        while (poz < 5) {
            starUrls[poz] = "../../assets/images/rating/empty-star.png"
            poz++;
        }

        console.log(starUrls)
        return starUrls
    }
    return (
        <View style={styles.rowContainer}>
            <ProfilePicture image={userSkill.profilePicture} diameter={45}/>
            <Text style={styles.nameStyle}>{userSkill.firstname}</Text>
            <View style={styles.starsContainer}>
                {
                    obtainStarsUrl(userSkill.skillLevel).map((url, index) => <Image key={index} style={styles.star}
                                                                                    source={{uri: url}}/>)
                }
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
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 20,
        gap: 5,
        flex: 1,
        minWidth: 0,
        height: "100%",
    },
    star: {
        height: "100%",
        maxHeight: 25,
        aspectRatio: 1,
    }

});


export default SkillLevelRow