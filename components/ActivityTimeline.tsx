import React, {useCallback} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import CircleTimeline from "@/components/CircleTimeline";
import TimelinePoints from "@/components/TimelinePoints";
import {useStorageSystem} from "@/hooks/useStorageSystem";
import TodayMeetDetails from "@/datas/TodayMeetDetails";
import axiosInstance from "@/axiosInstance";
import {useFocusEffect} from "expo-router";

const ActivityTimeline: React.FC = () => {

    const [todayMeets, setTodayMeets] = useStorageSystem<TodayMeetDetails[]>("todayMeets", []);

    useFocusEffect(useCallback(() => {
        axiosInstance.get("/meets/todayMeets")
            .then((response) => {
                setTodayMeets(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []));

    const getTimelineComponent = (todayMeet: TodayMeetDetails, index: number, showPoints?: boolean) => {
        return (
            <View key={index}>
                <View style={styles.timeContainer}>
                    <CircleTimeline state={todayMeet.meetState}/>
                    <View style={styles.textContainer}>
                        <View style={styles.title}>
                            <Text style={styles.activityNameText}>
                                {todayMeet.activityName} -
                            </Text>
                            <Text style={styles.hourText}>
                                {todayMeet.hour}
                            </Text>
                        </View>
                        <Text style={styles.stateText}>{todayMeet.meetState.replace("_", " ")}</Text>
                    </View>

                </View>
                <View style={{marginLeft: 25 / 2 + 1}}>
                    {showPoints != false && <TimelinePoints pointsNumber={4}/>}
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.timelineContainer}>
            {
                todayMeets.length > 0 && (
                    <>
                        {
                            todayMeets.slice(0, todayMeets.length - 1).map((todayMeet, index) => (
                                getTimelineComponent(todayMeet, index)
                            ))
                        }
                        {
                            getTimelineComponent(todayMeets[todayMeets.length - 1], todayMeets.length - 1, false)
                        }
                    </>
                )
            }
        </ScrollView>

    )
}

export default ActivityTimeline;

const styles = StyleSheet.create({
    timelineContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginVertical: 10,
    },
    timeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
    },
    activityNameText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFF",
    },
    title: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    hourText: {
        marginTop: 2,
        marginLeft: 5,
        fontSize: 10,
        color: "#FFF",
    },
    textContainer: {
        marginLeft: 12,
        display: "flex",
        flexDirection: "column",
    },
    stateText: {
        fontSize: 10,
        color: "#FFF",
    }


});