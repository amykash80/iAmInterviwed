interface InterviewerProfileModel {
    interviewerId: string;
    interviewerProfileId: string;
    profileName: string;
    primarySkillId: number;
    primarySkillName: string
    additionalSkills: string;
    interviewerSkills: InterviewerSkillsModel[];
}
export default InterviewerProfileModel;

interface InterviewerSkillsModel {
    secondarySkillId: number;
    secondarySkillName: string;
    secondarySkillNumber: number;
}