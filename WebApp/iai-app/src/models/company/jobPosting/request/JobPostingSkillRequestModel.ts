interface JobPostingSkillRequestModel {
    requirementSkillId: string;
    requirementId: string;
    secondarySkillId: number | null;
    secondarySkillNumber: number;
    isCommentsRequired: boolean;
    requirementInterviewProcessId: string;
    recruiterId: string;
    userId: string;
}
export default JobPostingSkillRequestModel;