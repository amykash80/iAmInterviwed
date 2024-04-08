import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import IdNameModel from "../../models/common/IdNameModel";
import BaseResponse from "../../models/common/BaseResponse";
import BaseResponseList from "../../models/common/BaseResponseList";
import JobPostingSearchInputModel from "../../models/company/jobPosting/request/JobPostingSearchInputModel";
import JobPostingModel from "../../models/company/jobPosting/response/JobPostingModel";
import PagedListModel from "../../models/common/PagedListModel";
import JobPostingRequestModel from "../../models/company/jobPosting/request/JobPostingRequestModel";
import JobPostingInterviewProcessRequestModel from "../../models/company/jobPosting/request/JobPostingInterviewProcessRequestModel";
import InterviewProcessModel from "../../models/company/jobPosting/response/InterviewProcessModel";
import JobPostingSkillRequestModel from "../../models/company/jobPosting/request/JobPostingSkillRequestModel";
import CompanyConfigurationModel from "../../models/company/CompanyConfigurationModel";

class JobPostingService {
    async fillJobPostings(companyId: string) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.company.jobPosting.fillJobCodes  + "/" + companyId);
        return res;
    }

    async getAllJobPostings(inputParms: JobPostingSearchInputModel) {
        let res: PagedListModel<JobPostingModel> = await httpClient.post<PagedListModel<JobPostingModel>>(AppConfig.company.jobPosting.getAllJobPostings, inputParms);
        return res;
    }

    async getJobPostings(inputParms: JobPostingSearchInputModel) {
        let res: PagedListModel<JobPostingModel> = await httpClient.post<PagedListModel<JobPostingModel>>(AppConfig.company.jobPosting.getJobPostings, inputParms);
        return res;
    }

    async getJobPostingById(requirementId: string) {
        let res: BaseResponse<JobPostingRequestModel> = await httpClient.get<BaseResponse<JobPostingRequestModel>>(AppConfig.company.jobPosting.getJobPostingById  + "/" + requirementId);
        return res;
    }

    async saveJobPosting(jobPosting: JobPostingRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.company.jobPosting.saveJobPosting, jobPosting);
        return res;
    }

    async getInterviewProcesses(requirementId: string) {
        let res: BaseResponseList<InterviewProcessModel[]> = await httpClient.get<BaseResponseList<InterviewProcessModel[]>>(AppConfig.company.jobPosting.getInterviewProcesses  + "/" + requirementId);
        return res;
    }

    async getInterviewProcessSkills(requirementInterviewProcessId: string) {
        let res: BaseResponseList<JobPostingSkillRequestModel[]> = await httpClient.get<BaseResponseList<JobPostingSkillRequestModel[]>>(AppConfig.company.jobPosting.getInterviewProcessSkills  + "/" + requirementInterviewProcessId);
        return res;
    }

    async saveInterviewProcess(jobPosting: JobPostingInterviewProcessRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.company.jobPosting.saveInterviewProcess, jobPosting);
        return res;
    }

    async getCompanyConfiguration(userId: string) {
        let res: BaseResponse<CompanyConfigurationModel> = await httpClient.get<BaseResponse<CompanyConfigurationModel>>(AppConfig.company.jobPosting.getCompanyConfiguration  + "/" + userId);
        return res;
    }
}
const jobPostingService = new JobPostingService();
export default jobPostingService;