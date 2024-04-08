interface ScheduleInterviewRequest {
    candidateId: string;
    interviewDate: Date;
    timeSlotId: number;
    interviewTypeId: number
    primarySkillId: number;
    secondarySkills: number[];
    termsAndConditions: boolean;
    requirementId?: string;
}
export default ScheduleInterviewRequest;