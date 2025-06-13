import {StyleSheet, View} from "react-native";
import ProfilePicture from "@/components/ProfilePicture";
import React from "react";
import UserDetails from "@/datas/UserDetails";

const InvitedFriendsComponent: React.FC<{ selectedFriends: UserDetails[] }> = ({selectedFriends}) => {
    const pictureDiameter = 30;
    return (
        <View style={[styles.friendsInvitedList, {width: (selectedFriends.length - 1 / 2) * pictureDiameter}]}>
            {
                selectedFriends.map((selectedFriend, index) => (
                    <View style={{position: "absolute", left: pictureDiameter * index / 2}}>
                        <ProfilePicture diameter={pictureDiameter} image={selectedFriend.profilePicture}/>
                    </View>
                ))
            }
        </View>
    )
}

export default InvitedFriendsComponent;

const styles = StyleSheet.create({

    friendsInvitedList: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
    }

})