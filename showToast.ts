import Toast from 'react-native-toast-message';
import MeetingNotification from "@/datas/MeetingNotification";

export const showToast = (meetNotification: MeetingNotification) => {
    Toast.show({
        type: 'customMeeting',
        visibilityTime: 10000,
        props: {
            meetNotification: meetNotification,
        },
    });
};
