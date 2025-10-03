import React from 'react';
import {Pressable, Text, View} from 'react-native';
import MeetingNotification from "@/datas/MeetingNotification";
import Toast from 'react-native-toast-message';

interface CustomToastProps {
    meetNotification: MeetingNotification;
}

const onAccept = (meetId: number) => {
    Toast.hide()
}

const onDecline = (meetId: number) => {
    Toast.hide()
}

export const CustomToast = (props: any) => {
    const meetNotification = props.props.meetNotification;
    return (
        <View
            style={{
                padding: 16,
                backgroundColor: '#fff',
                borderLeftWidth: 5,
                borderLeftColor: '#4CAF50',
                borderRadius: 10,
                marginHorizontal: 16,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4,
            }}
        >
            <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#333'}}>
                📅 {meetNotification.organizer} invited you to "{meetNotification.title}"
            </Text>

            <Text style={{fontSize: 14, color: '#555', marginBottom: 2}}>
                Date: <Text style={{fontWeight: '500'}}>{meetNotification.date}</Text>
            </Text>
            <Text style={{fontSize: 14, color: '#555', marginBottom: 12}}>
                Time: <Text style={{fontWeight: '500'}}>{meetNotification.time}</Text>
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Pressable
                    onPress={() => onDecline(meetNotification.meetingId)}
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 6,
                        backgroundColor: '#f44336',
                        marginRight: 8,
                    }}
                >
                    <Text style={{color: '#fff', fontWeight: '500'}}>Decline</Text>
                </Pressable>

                <Pressable
                    onPress={() => onAccept(meetNotification.meetingId)}
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 6,
                        backgroundColor: '#4CAF50',
                    }}
                >
                    <Text style={{color: '#fff', fontWeight: '500'}}>Accept</Text>
                </Pressable>
            </View>
        </View>
    )
};
