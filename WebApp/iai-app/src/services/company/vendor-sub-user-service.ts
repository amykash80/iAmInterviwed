import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import IdNameModel from "../../models/common/IdNameModel";
import BaseResponse from "../../models/common/BaseResponse";
import BaseResponseList from "../../models/common/BaseResponseList";
import VendorSubUserSearchInputModel from "../../models/company/vendorUser/request/VendorSubUserSearchInputModel";
import PagedListModel from "../../models/common/PagedListModel";
import VendorSubUserRequestModel from "../../models/company/vendorUser/request/VendorSubUserRequestModel";

class VendorSubUserService {
    async fillVendorSubUsers(companyId: string) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.company.vendorSubUser.fillVendorSubUsers  + "/" + companyId);
        return res;
    }

    async getVendorSubUsers(inputParms: VendorSubUserSearchInputModel) {
        let res: PagedListModel<VendorSubUserRequestModel> = await httpClient.post<PagedListModel<VendorSubUserRequestModel>>(AppConfig.company.vendorSubUser.getVendorSubUsers, inputParms);
        return res;
    }

    async getVendorSubUserById(vendorSubUserId: string) {
        let res: BaseResponse<VendorSubUserRequestModel> = await httpClient.get<BaseResponse<VendorSubUserRequestModel>>(AppConfig.company.vendorSubUser.getVendorSubUserById  + "/" + vendorSubUserId);
        return res;
    }

    async saveVendorSubUser(vendorSubUser: VendorSubUserRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.company.vendorSubUser.saveVendorSubUser, vendorSubUser);
        return res;
    }
}
const vendorSubUserService = new VendorSubUserService();
export default vendorSubUserService;