import {Image, StyleSheet, View} from "react-native";
import React from "react";

const ProfilePicture: React.FC<{ image: string }> = ({image}) => {
    return (
        <View style={styles.profilePictureContainer}>
            <Image source={image}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        width: 45,
        height: 45,
        borderRadius: 45,
        borderColor: "#26344F",
        borderWidth: 3,
    }

})

export default ProfilePicture