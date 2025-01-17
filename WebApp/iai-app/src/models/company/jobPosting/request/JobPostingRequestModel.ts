import JobPostingSkillRequestModel from './JobPostingSkillRequestModel';
interface JobPostingRequestModel {
    requirementId: string;
    companyId: string;
    recruiterId: string;
    jobTypeId: number | null;
    jobCode: string;
    jobDescription: string;
    keyResponsibilities: string;
    domainId: number | null;
    additionalSkills: string;
    primarySkillId: number | null;
    minExperienceId: number | null;
    maxExperienceId: number | null;
    startDate: Date;
    endDate: Date;
    cityId: number | null;
    designationId: string;
    highestPay: string;
    interviewTypeId: number | null;
    assessmentName: string;
    scheduleZoomInterview: boolean;
    addInterviewProcess: boolean;
    statusId: number | null;
    sendMailToRecruiter: boolean;
    captureScreenShot: boolean;
    minRatingForSelection: number;
    jobPostingSkillRequestModel: JobPostingSkillRequestModel[];
    userId: string;
}
export default JobPostingRequestModel;