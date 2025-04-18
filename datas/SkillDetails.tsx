export interface SkillDetails {
    skillId: number,
    name: string,
    description: string,
    users: UserSkill[],
}

export interface UserSkill {
    userId: number,
    firstname: string,
    lastname: string,
    profilePicture: string,
    skillLevel: number,
}