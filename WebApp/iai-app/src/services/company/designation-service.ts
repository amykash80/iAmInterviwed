import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import IdNameModel from "../../models/common/IdNameModel";
import BaseResponse from "../../models/common/BaseResponse";
import BaseResponseList from "../../models/common/BaseResponseList";
import DesignationSearchInputModel from "../../models/company/designation/request/DesignationSearchInputModel";
import PagedListModel from "../../models/common/PagedListModel";
import DesignationModel from "../../models/company/designation/response/DesignationModel";
import DesignationRequestModel from "../../models/company/designation/request/DesignationRequestModel";

class DesignationService {
    async fillDesignations(companyId: string) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.company.designation.fillDesignations  + "/" + companyId);
        return res;
    }

    async getDesignations(inputParms: DesignationSearchInputModel) {
        let res: PagedListModel<DesignationModel> = await httpClient.post<PagedListModel<DesignationModel>>(AppConfig.company.designation.getDesignations, inputParms);
        return res;
    }

    async getDesignationById(designationId: string) {
        let res: BaseResponse<DesignationModel> = await httpClient.get<BaseResponse<DesignationModel>>(AppConfig.company.designation.getDesignationById  + "/" + designationId);
        return res;
    }

    async saveDesignation(designation: DesignationRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.company.designation.saveDesignation, designation);
        return res;
    }
}
const designationService = new DesignationService();
export default designationService;