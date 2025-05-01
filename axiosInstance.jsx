import axios from "axios";
import {config} from "@/config";
import {Platform} from "react-native";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
    baseURL: config.API_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = "";

        if (Platform.OS === "web") {
            try {
                if (typeof localStorage !== "undefined") {
                    token = localStorage.getItem("jwt") || "";
                }
            } catch (e) {
                console.error("Local storage is unavailable:", e);
            }
        } else {
            try {
                token = (await SecureStore.getItemAsync("jwt")) || "";
            } catch (e) {
                console.error("SecureStore error:", e);
            }
        }

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
