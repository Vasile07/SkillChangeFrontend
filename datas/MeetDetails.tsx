import UserMeetDetails from "@/datas/UserMeetDetails";

export default interface MeetDetails {
    activityName: string,
    activityPicture: string,
    startHour: string,
    endHour: string,
    date: string,
    address: string,
    users: UserMeetDetails[],
    color: string,
}