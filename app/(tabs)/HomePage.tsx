import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {ScreenContainer} from "react-native-screens";
import TypesScrollComponent from "@/components/TypesScrollComponent";
import TypeProperties from "@/datas/TypeProperties";
import {useAuthentication} from "@/context/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import {useRouter} from "expo-router";

const HomePage: React.FC = () => {
    const [type, setType] = useState<TypeProperties>({id: 0, type: "All types"})
    const {isLoading, isAuthenticated} = useAuthentication();
    const router = useRouter()


    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoading && !isAuthenticated) {
                router.push("/LoginScreen");
            }
        }, 100); // Optional delay to allow smoother transitions or state updates

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [isLoading, isAuthenticated]);

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <ScreenContainer style={styles.pageContainer}>
                {/*<Text>HOME PAGE</Text>*/}
                {/*<ActivityCard width={130} height={130} image={require("@/assets/images/gardening.png")} title={"Gardening"}/>*/}
                {/*<View style={{width: 220, height: 290}}>*/}
                {/*    <RecommendationActivityCard image={require("@/assets/images/gardening.png")} title={"Gardening"}/>*/}
                {/*</View>*/}

                <View style={{width: "100%", height: 90}}>
                    <TypesScrollComponent type={type} setType={setType}/>
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
    }
})

export default HomePage;