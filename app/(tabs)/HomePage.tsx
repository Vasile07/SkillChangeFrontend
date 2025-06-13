import React, {useCallback, useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import {useAuthentication} from "@/context/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import {useFocusEffect, useRouter} from "expo-router";
import RecommendationCarrousel from "@/components/RecommendationCarrousel";
import UserMeetDetails from "@/datas/UserMeetDetails";
import ProfilePicture from "@/components/ProfilePicture";
import axiosInstance from "@/axiosInstance";
import Skill from "@/datas/Skill";

const HomePage: React.FC = () => {
    const {isLoading, isAuthenticated} = useAuthentication();
    const [numberOfMeetsToday, setNumberOfMeetsToday] = useState<number>(0);
    const router = useRouter()
    const [loggedInUser, setLoggedInUser] = useState<null | UserMeetDetails>(null)

    useEffect(() => {
        if (isAuthenticated)
            axiosInstance.get(`/users`).then((response) => {
                setLoggedInUser(response.data)
            })

    }, [isAuthenticated]);

    const [recommendedSkills, setRecommendedSkills] = useState<Skill[]>([]);
    useFocusEffect(useCallback(() => {
        if (isAuthenticated) {
            axiosInstance.get(`/skills/recommendedSkills`).then((response) => {
                setRecommendedSkills(response.data)
                console.log(response.data)
            })
            axiosInstance.get(`/meets/todayMeets/count`).then((response) => {
                setNumberOfMeetsToday(response.data);
            })
        }

    }, [isAuthenticated]))

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoading && !isAuthenticated) {
                router.push("/LoginScreen");

            }

        }, 100);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [isLoading, isAuthenticated]);

    return (
        (isLoading || loggedInUser === null) ?
            <LoadingScreen/>
            :
            <ScreenContainer style={styles.pageContainer} testID={"home-page"}>
                <View style={styles.headerView}>
                    <View style={styles.welcomeTitle}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#26344F"
                        }}>Hello, {loggedInUser.firstname}</Text>
                        <Text style={{fontSize: 16, fontWeight: "600", color: "#26344F"}}>Welcome to SkillChange</Text>
                    </View>
                    <View style={styles.profilePictureSection}>
                        <ProfilePicture image={loggedInUser.profilePicture} diameter={45}/>
                    </View>
                </View>
                <View style={styles.meets}>
                    <View style={styles.textMeet}>
                        <Text>You have scheduled</Text>
                        <Text>{numberOfMeetsToday} meetings today</Text>
                    </View>
                    <View style={styles.linkContainer}>
                        <Pressable style={styles.link} onPress={() => router.push('/(tabs)/SchedulePage')}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                                color: "#FFF",
                                textDecorationLine: "underline"
                            }}>Go see them</Text>
                            <View style={[styles.triangle, {transform: [{rotate: "90deg"}]}]}/>
                        </Pressable>

                    </View>
                </View>
                <View style={styles.recommendationSection}>
                    {recommendedSkills.length == 3 && <RecommendationCarrousel items={recommendedSkills}/>}
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
        backgroundColor: "#F1F4F9"
    },
    headerView: {
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    welcomeTitle: {
        marginLeft: 30,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    profilePictureSection: {

        marginRight: 30,
        display: "flex",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    meets: {
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"

    },
    textMeet: {
        marginLeft: 30,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    linkContainer: {
        display: "flex",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    recommendationSection: {
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 35,
        paddingRight: 15,
        paddingLeft: 50,
        backgroundColor: "#26344F",
        position: "relative"
    },
    triangle: {
        position: "absolute",
        left: -5,
        width: 0,
        height: 0,
        borderLeftWidth: 18,
        borderRightWidth: 18,
        borderBottomWidth: 30,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#F1F4F9",
    }

})

export default HomePage;