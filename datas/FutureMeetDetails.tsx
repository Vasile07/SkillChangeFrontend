import UserMeetDetails from "@/datas/UserMeetDetails";

export default interface FutureMeetDetails {
    activityName: string,
    activityPicture: string,
    startHour: string,
    endHour: string,
    date: string,
    address: string,
    users: UserMeetDetails[],
    color: string,
}