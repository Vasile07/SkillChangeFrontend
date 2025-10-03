import React, {useCallback, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import SchedulePageBackground from "@/components/SchedulePageBackground";
import ScheduleAddButton from "@/components/ScheduleAddButton";
import MeetDetailCard from "@/components/MeetDetailCard";
import ActivityTimeline from "@/components/ActivityTimeline";
import axiosInstance from "@/axiosInstance";
import FutureMeetDetails from "@/datas/FutureMeetDetails";
import {useFocusEffect} from "expo-router";

const SchedulePage: React.FC = () => {

    const [futureMeets, setFutureMeets] = useState<FutureMeetDetails[]>([]);
    useFocusEffect(useCallback(() => {
        axiosInstance.get('/meets/futureMeets').then((response) => {
            setFutureMeets(response.data)
        })
    }, []));

    // const meet = {
    //     activityName: "Gardening",
    //     activityPicture: "../assets/images/gardening.png",
    //     startHour: "10:00",
    //     endHour: "12:00",
    //     date: "22.12.2024",
    //     address: "Strada Lalelelor nr. 15",
    //     users: [{
    //         firstname: "Ion",
    //         lastname: "Pop",
    //         profilePicture: null,
    //     },
    //         {
    //             firstname: "Ion",
    //             lastname: "Pop",
    //             profilePicture: null,
    //         },{
    //             firstname: "Ion",
    //             lastname: "Pop",
    //             profilePicture: null,
    //         },
    //         {
    //             firstname: "Ion",
    //             lastname: "Pop",
    //             profilePicture: null,
    //         }],
    //     color: "#92140C",
    // }

    return (
        <ScreenContainer style={styles.pageContainer} testID={"schedule-page"}>
            <View style={styles.backgroundContainer}>
                <SchedulePageBackground/>
            </View>
            <View style={styles.addButtonContainer}>
                <ScheduleAddButton/>
            </View>

            <View style={styles.todayMeets}>
                <ActivityTimeline/>
            </View>

            <View style={styles.incomingSection}>
                <Text style={styles.incomingText}>Incoming</Text>
                <ScrollView style={styles.listContainer}>
                    {
                        futureMeets.map((meet, index) => (
                            <View key={index}><MeetDetailCard meet={meet}/></View>
                        ))
                    }
                </ScrollView>
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
        left: "5%",
        display: "flex",
        height: "55%",
        width: "90%",
        flexDirection: "column",
        gap: 30,
    },
    listContainer: {
        display: "flex",
        width: "100%",
        flex: 1,
        marginHorizontal: "auto",
        gap: 20,
    },
    todayMeets: {
        position: "absolute",
        top: "3%",
        left: "10%",
        display: "flex",
        height: "28%",
        width: "80%",
        flexDirection: "column",
        gap: 30,
    }

})

export default SchedulePage;