import JobPostingSkillRequestModel from './JobPostingSkillRequestModel';
interface JobPostingInterviewProcessRequestModel {
    requirementInterviewProcessId: string;
    requirementId: string;
    interviewRoundId: number | null;
    recruiterId: string;
    userId: string;
    jobPostingSkillRequestModel: JobPostingSkillRequestModel[];
}
export default JobPostingInterviewProcessRequestModel;