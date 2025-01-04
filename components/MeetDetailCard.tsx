import {StyleSheet, Text, View} from "react-native";
import MeetDetails from "@/datas/MeetDetails";
import React from "react";

const MeetDetailCard: React.FC<{ meet: MeetDetails }> = ({meet}) => {
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
                    meet.users.map((user, index) => (
                        <View key={index}>
                            <Text>{user.firstname} {user.lastname}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        height: 90,
        backgroundColor: "rgba(38,52,79,0.66)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        gap: 15,
    },
    bar: {
        width: 8,
        height: "100%",
    },
    activityContainer: {
        width: "45%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    activityDetails: {
        display: "flex",
        flexDirection: "column",
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
        height: "30%",
    },
    otherDetail: {
        fontSize: 12,
        color: "#FFF",
    },
    userList: {
        display: "flex",
        width: "30%",
        height: "70%",
        flexDirection: "column",
        backgroundColor: "red",

    }
})

export default MeetDetailCard;