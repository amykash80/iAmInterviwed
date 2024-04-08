interface JobPostingModel {
    requirementId: string;
    companyId: string;
    jobCode: string;
    jobTitle: string;
    jobTypeName: string;
    minExperience: string;
    maxExperience: string;
    highestPay: string;
    primarySkillName: string;
    startDate: string;
    endDate: string;
    status: string;
    addInterviewProcess: boolean;
}
export default JobPostingModel;