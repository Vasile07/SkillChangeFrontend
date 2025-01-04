import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import SchedulePageBackground from "@/components/SchedulePageBackground";
import ScheduleAddButton from "@/components/ScheduleAddButton";
import MeetDetailCard from "@/components/MeetDetailCard";

const SchedulePage: React.FC = () => {

    const meet = {
        activityName: "Gardening",
        activityPicture: "@/assets/images/gardening",
        startHour: "10:00",
        endHour: "12:00",
        date: "22.12.2024",
        address: "Strada Lalelelor nr. 15",
        users: [{
            firstname: "Ion",
            lastname: "Pop",
            profilePicture: "@/assets/images/gardening",
        }],
        color: "#92140C",
    }

    return (
        <ScreenContainer style={styles.pageContainer}>
            <View style={styles.backgroundContainer}>
                <SchedulePageBackground/>
            </View>
            <View style={styles.addButtonContainer}>
                <ScheduleAddButton/>
            </View>

            <View style={styles.incomingSection}>
                <Text style={styles.incomingText}>Incoming</Text>
                <View style={styles.listContainer}>
                    <MeetDetailCard meet={meet}/>
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
        position: "relative"
    },
    backgroundContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    addButtonContainer: {
        position: "absolute",
        width: 75,
        height: 75,
        top: "40%",
        right: -5,
        transform: "translate(-50%,-70%)"
    },
    incomingText: {
        fontSize: 40,
        fontFamily: "Times New Roman",
        fontWeight: "bold",
        color: "#000",

    },
    incomingSection: {
        position: "absolute",
        top: "45%",
        left: "10%",
        display: "flex",
        height: "55%",
        width: "80%",
        flexDirection: "column",
        gap: 30,
    },
    listContainer: {
        display: "flex",
        width: "85%",
        flex: 1,
        marginHorizontal: "auto",
    }

})

export default SchedulePage;