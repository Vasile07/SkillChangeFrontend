import {Image, StyleSheet, View} from "react-native";
import React from "react";

const ProfilePicture: React.FC<{ image?: string, diameter: number }> = ({image, diameter}) => {
    return (
        <View style={[styles.profilePictureContainer, {width: diameter, aspectRatio: 1, borderRadius: diameter / 2}]}>
            <Image source={{uri: image == null ? "../../assets/images/unknownUser.png" : image}}
                   style={styles.profileImage}></Image>
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
        overflow: "hidden",
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    }

})

export default ProfilePicture