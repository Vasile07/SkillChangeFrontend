export default interface MessagePreview {
    message: string,
    userName: string,
    userId: number,
    userProfilePicture?: string | null,
    messageId: number,
}