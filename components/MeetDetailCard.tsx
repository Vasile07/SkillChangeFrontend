import {Image, StyleSheet, Text, View} from "react-native";
import FutureMeetDetails from "@/datas/FutureMeetDetails";
import React from "react";
import ProfilePicture from "@/components/ProfilePicture";

const MeetDetailCard: React.FC<{ meet: FutureMeetDetails }> = ({meet}) => {
    const userToDisplay = 3;

    return (
        <View style={styles.cardContainer}>
            <View style={[styles.bar, {backgroundColor: meet.color}]}/>
            <View style={styles.activityContainer}>
                <View style={styles.activityTitle}>
                    <Text style={styles.activityName}>{meet.activityName}</Text>
                </View>
                <View style={styles.activityDetails}>
                    <Text style={styles.otherDetail}>{meet.date}</Text>
                    <Text style={styles.otherDetail}>{meet.startHour}-{meet.endHour}</Text>
                    <Text style={styles.otherDetail}>{meet.address}</Text>
                </View>
            </View>
            <View style={styles.userList}>
                {
                    meet.users.slice(0, userToDisplay).map((user, index) => (
                        <View key={index} style={styles.userRow}>
                            <ProfilePicture image={user.profilePicture} diameter={23}/>
                            <Text style={styles.userNameStyle}>{user.firstname} {user.lastname}</Text>
                        </View>
                    ))
                }
                {
                    meet.users.length > userToDisplay &&
                    <View style={styles.userRow}>
                        <Text style={styles.userNameStyle}>And {meet.users.length - userToDisplay} more</Text>
                    </View>

                }
            </View>
            <View style={styles.activity}>
                <View style={styles.activityCard}>
                    <Image source={{uri: meet.activityPicture}} style={{width: "60%", height: "60%"}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        height: 130,
        backgroundColor: "rgba(38,52,79,0.66)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    bar: {
        width: 8,
        height: "100%",
    },
    activityContainer: {
        marginLeft: 10,
        maxWidth: "35%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    activityDetails: {
        marginRight: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        paddingVertical: 2,
        marginBottom: 3,
        borderRightWidth: 1.5,
        borderRightColor: "#FFF",
    },
    activityName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        textDecorationLine: "underline",
    },
    activityTitle: {
        width: "100%",
        height: "20%",
    },
    otherDetail: {
        fontSize: 12,
        color: "#FFF",
    },
    userList: {
        marginLeft: 10,
        display: "flex",
        maxWidth: "30%",
        height: "80%",
        flexDirection: "column",
        gap: 5,
    },
    userRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    userNameStyle: {
        marginLeft: 8,
        fontSize: 10,
        color: "#FFF",
        fontWeight: "bold"
    },
    activity: {
        height: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    activityCard: {
        maxWidth: 80,
        width: "80%",
        aspectRatio: 1,
        borderRadius: 16,
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default MeetDetailCard;