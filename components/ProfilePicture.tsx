import {Image, StyleSheet, View} from "react-native";
import React from "react";

const ProfilePicture: React.FC<{ image: string, diameter: number }> = ({image, diameter}) => {
    return (
        <View style={[styles.profilePictureContainer, {width: diameter, aspectRatio: 1, borderRadius: diameter}]}>
            <Image source={{uri: image}} style={styles.profileImage}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderColor: "#26344F",
        borderWidth: 3,
    },
    profileImage: {
        width: "70%",
        height: "70%",
        resizeMode: "contain",
    }

})

export default ProfilePicture