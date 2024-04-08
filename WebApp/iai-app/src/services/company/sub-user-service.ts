import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import IdNameModel from "../../models/common/IdNameModel";
import BaseResponse from "../../models/common/BaseResponse";
import BaseResponseList from "../../models/common/BaseResponseList";
import SubUserSearchInputModel from "../../models/company/subUser/request/SubUserSearchInputModel";
import PagedListModel from "../../models/common/PagedListModel";
import SubUserModel from "../../models/company/subUser/response/SubUserModel";
import SubUserRequestModel from "../../models/company/subUser/request/SubUserRequestModel";

class SubUserService {
    async fillSubUsers(companyId: string) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.company.subUser.fillSubUsers  + "/" + companyId);
        return res;
    }

    async getSubUsers(inputParms: SubUserSearchInputModel) {
        let res: PagedListModel<SubUserModel> = await httpClient.post<PagedListModel<SubUserModel>>(AppConfig.company.subUser.getSubUsers, inputParms);
        return res;
    }

    async getSubUserById(subUserId: string) {
        let res: BaseResponse<SubUserRequestModel> = await httpClient.get<BaseResponse<SubUserRequestModel>>(AppConfig.company.subUser.getSubUserById  + "/" + subUserId);
        return res;
    }

    async saveSubUser(subUser: SubUserRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.company.subUser.saveSubUser, subUser);
        return res;
    }
}
const subUserService = new SubUserService();
export default subUserService;