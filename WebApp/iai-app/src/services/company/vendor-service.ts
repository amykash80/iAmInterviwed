import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import IdNameModel from "../../models/common/IdNameModel";
import BaseResponse from "../../models/common/BaseResponse";
import BaseResponseList from "../../models/common/BaseResponseList";
import VendorSearchInputModel from "../../models/company/vendor/request/VendorSearchInputModel";
import PagedListModel from "../../models/common/PagedListModel";
import VendorRequestModel from "../../models/company/vendor/request/VendorRequestModel";

class VendorService {
    async fillVendors(companyId: string) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.company.vendor.fillVendors  + "/" + companyId);
        return res;
    }

    async getVendors(inputParms: VendorSearchInputModel) {
        let res: PagedListModel<VendorRequestModel> = await httpClient.post<PagedListModel<VendorRequestModel>>(AppConfig.company.vendor.getVendors, inputParms);
        return res;
    }

    async getVendorById(vendorId: string) {
        let res: BaseResponse<VendorRequestModel> = await httpClient.get<BaseResponse<VendorRequestModel>>(AppConfig.company.vendor.getVendorById  + "/" + vendorId);
        return res;
    }

    async saveVendor(vendor: VendorRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.company.vendor.saveVendor, vendor);
        return res;
    }
}
const vendorService = new VendorService();
export default vendorService;