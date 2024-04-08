import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import BaseResponse from "../../models/common/BaseResponse";
import InterviewerPersonalInfoModel from "../../models/interviewer/response/InterviewerPersonalInfoModel";
import InterviewerPersonalInfoRequestModel from "../../models/interviewer/request/InterviewerPersonalInfoRequestModel";
import InterviewerProfileModel from "../../models/interviewer/request/InterviewerProfileModel";
import InterviewerSchedulesModel from "../../models/interviewer/response/InterviewerSchedulesModel";
import InterviewerSchedulesRequestModel from "../../models/interviewer/request/InterviewerSchedulesRequestModel";
import ConfirmScheduleDetailsModel from "../../models/interviewer/response/ConfirmScheduleDetailsModel";
import InterviewRatingModel from "../../models/interviewer/response/InterviewRatingModel";
import InterviewerDashboardRequestParameters from "../../models/interviewer/request/InterviewerDashboardRequestParameters";
import PagedListModel from "../../models/common/PagedListModel";
import InterviewerDashboardModel from "../../models/interviewer/response/InterviewerDashboardModel";

class InterviewerService {
    async getInterviewerPersonalInfo(interviewerId: string) {
        let res: BaseResponse<InterviewerPersonalInfoModel> = await httpClient.get<BaseResponse<InterviewerPersonalInfoModel>>(AppConfig.interviewer.getInterviewerPersonalInfo + "/" + interviewerId);
        return res;
    }

    async saveInterviewerPersonalInfo(interviewerPersonalInfo: InterviewerPersonalInfoRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.interviewer.saveInterviewerPersonalInfo, interviewerPersonalInfo);
        return res;
    }

    async getInterviewerProfile(interviewerId: string) {
        let res: BaseResponse<InterviewerProfileModel[]> = await httpClient.get<BaseResponse<InterviewerProfileModel[]>>(AppConfig.interviewer.getInterviewerProfile + "/" + interviewerId);
        return res;
    }

    async saveInterviewerProfile(interviewerProfile: InterviewerProfileModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.interviewer.saveInterviewerProfile, interviewerProfile);
        return res;
    }

    async getInterviewerSchedules(interviewerId: string, startDate: string) {
        let res: BaseResponse<InterviewerSchedulesModel> = await httpClient.get<BaseResponse<InterviewerSchedulesModel>>(AppConfig.interviewer.getInterviewerSchedules + "/" + interviewerId + "/" + startDate);
        return res;
    }

    async saveInterviewerSchedule(interviewerSchedule: InterviewerSchedulesRequestModel[]) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.interviewer.saveInterviewerSchedule, interviewerSchedule);
        return res;
    }

    async getInterviewDetails(interviewId: string) {
        let res: BaseResponse<ConfirmScheduleDetailsModel> = await httpClient.get<BaseResponse<ConfirmScheduleDetailsModel>>(AppConfig.interviewer.getInterviewDetails + "/" + interviewId);
        return res;
    }

    async ConfirmInterview(interviewId: string, interviewerId: string) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.interviewer.confirmInterview + "/" + interviewId + "/" + interviewerId);
        return res;
    }    

    async getInterviewsToBePicked() {
        let res: BaseResponse<ConfirmScheduleDetailsModel[]> = await httpClient.get<BaseResponse<ConfirmScheduleDetailsModel[]>>(AppConfig.interviewer.pickUpSchedules);
        return res;
    }

    async updateInterviewerForSchedule(interviewId: string, interviewerId: string) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.interviewer.updateInterviewerForSchedule + "/" + interviewId + "/" + interviewerId);
        return res;
    }

    async getInterviewRatingDetails(interviewId: string) {
        let res: BaseResponse<InterviewRatingModel> = await httpClient.get<BaseResponse<InterviewRatingModel>>(AppConfig.interviewer.getInterviewRatingDetails + "/" + interviewId);
        return res;
    }

    async updateInterviewRating(rating: InterviewRatingModel) {
        let res: BaseResponse<InterviewRatingModel> = await httpClient.post<BaseResponse<InterviewRatingModel>>(AppConfig.interviewer.updateInterviewRating, rating);
        return res;
    }

    async loadInterviewerDashboard(inputParms: InterviewerDashboardRequestParameters) {
        let res: PagedListModel<InterviewerDashboardModel> = await httpClient.post<PagedListModel<InterviewerDashboardModel>>(AppConfig.interviewer.loadInterviewerDashboard, inputParms);
        return res;
    }
}
const interviewerService = new InterviewerService();
export default interviewerService;