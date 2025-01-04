import React, {createContext, PropsWithChildren, useContext, useEffect, useState,} from 'react';
import {useStorageState} from "@/hooks/useStorageState";
import axios from "axios";

interface AuthContextType {
    loginFunction: (email: string, password: string) => void,
    logoutFunction: () => void,
    isAuthenticated: boolean,
    isLoading: boolean,
}

export const AuthContext = createContext<AuthContextType>({
    loginFunction: (email, password) => {
    },
    logoutFunction: () => {
    },
    isAuthenticated: false,
    isLoading: false,
});

export const AuthProvider = ({children}: PropsWithChildren) => {
    const [[isLoading, jwt], setJwt] = useStorageState("jwt")
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const loginFunction = (email: string, password: string) => {
        axios.post("http://localhost:8080/users/login", {email, password})
            .then((response) => {
                setJwt(response.data.jwt)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const logoutFunction = () => {
        setJwt(null);
    }

    useEffect(() => {
        if (!isLoading)
            if (jwt != null)
                setIsAuthenticated(true)
            else
                setIsAuthenticated(false);
    }, [isLoading, jwt]);

    return (
        <AuthContext.Provider value={{loginFunction, logoutFunction, isAuthenticated, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthentication = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useUser must be used within a AuthProvider');
    }
    return context;
};
