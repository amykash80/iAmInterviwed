import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import IdNameModel from "../../models/common/IdNameModel";
import BaseResponse from "../../models/common/BaseResponse";
import BaseResponseList from "../../models/common/BaseResponseList";
import CandidateProfileModel from "../../models/candidate/response/CandidateProfileModel";
import CandidateProfileRequest from "../../models/candidate/request/CandidateProfileRequest";
import ScheduleInterviewRequest from "../../models/candidate/request/ScheduleInterviewRequest";
import { CandidateDashboardModel } from "../../models/candidate/response/CandidateDashboardModel";
import InterviewRatingModel from "../../models/interviewer/response/InterviewRatingModel";

class CandidateService {
    async loadCandidateDesignation() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.candidate.getCandidateDesignations);
        return res;
    }

    async getCandidateProfile(candidateId: string) {
        let res: BaseResponse<CandidateProfileModel> = await httpClient.get<BaseResponse<CandidateProfileModel>>(AppConfig.candidate.getCandidateProfile + "/" + candidateId);
        return res;
    }

    async saveCandidateProfile(candidateProfile: CandidateProfileRequest) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.candidate.saveCandidateProfile, candidateProfile);
        return res;
    }

    async scheduleInterview(interview: ScheduleInterviewRequest) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.candidate.candidateScheduleInterview, interview);
        return res;
    }

    async getCandidateDashboardDetails(candidateId: string) {
        let res: BaseResponse<CandidateDashboardModel> = await httpClient.get<BaseResponse<CandidateDashboardModel>>(AppConfig.candidate.getCandidateDashboardDetails + "/" + candidateId);
        return res;
    }

    async getInterviewRatingDetails(interviewId: string) {
        let res: BaseResponse<InterviewRatingModel> = await httpClient.get<BaseResponse<InterviewRatingModel>>(AppConfig.candidate.getInterviewRatingDetails + "/" + interviewId);
        return res;
    }

    async downloadCandidateResume(candidateId: string, fileDownloadType: string) {
        let res: any = await httpClient.get(AppConfig.fileUpload.downloadFile + "/" + candidateId + "/" + fileDownloadType, {responseType: "blob"});
        return res;
    }
}
const candidateService = new CandidateService();
export default candidateService;