interface ConfirmScheduleDetailsModel {
    interviewId: string;
    interviewUniqueId: string;
    interviewDate: string;
    timeSlotId: number;
    timeSlotName: string;
    interviewerId: string;
    candidateId: string;
    candidateName: string;
    primarySkillName: string;
    secondarySkills: SecondarySkillNameModel[];
    mobileNumber: number;
    experienceName: string;
    keyResponsibilities: string;
}
export default ConfirmScheduleDetailsModel;

interface SecondarySkillNameModel {
    secondarySkillName: string;
    secondarySkillNumber: number;
}