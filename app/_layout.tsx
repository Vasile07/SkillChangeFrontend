import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, {useEffect} from "react";
import "react-native-reanimated";

import {useColorScheme} from "@/hooks/useColorScheme";
import {AuthProvider} from "@/context/AuthContext";
import {CustomToast} from "@/components/CustomToast";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const toastConfig = {
        customMeeting: (props: any) => <CustomToast {...props} />,
    };

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <Stack>
                    {/* Hide header for index.tsx */}
                    <Stack.Screen
                        name="index"
                        options={{headerShown: false}}
                    />

                    {/* Tabs */}
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>

                    {/* Authentication */}
                    <Stack.Screen name="LoginScreen" options={{headerShown: false}}/>
                    <Stack.Screen name="RegisterScreen" options={{headerShown: false}}/>
                    <Stack.Screen name="ForgotPasswordEmailCompletionScreen" options={{headerShown: false}}/>
                    <Stack.Screen name="ForgotPasswordCodeCompletionScreen" options={{headerShown: false}}/>
                    <Stack.Screen name="ForgotPasswordNewPasswordScreen" options={{headerShown: false}}/>
                    <Stack.Screen name="SkillPage" options={{headerShown: false}}/>
                    <Stack.Screen name="DirectChatPage" options={{headerShown: false}}/>

                    {/* Fallback */}
                    <Stack.Screen name="+not-found"/>
                </Stack>
                <Toast config={toastConfig}/>
            </ThemeProvider>
        </AuthProvider>
    );
}
