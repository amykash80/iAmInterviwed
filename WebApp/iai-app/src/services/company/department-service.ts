import AppConfig from "../../config";
import httpClient from "../../utils/http-client";
import IdNameModel from "../../models/common/IdNameModel";
import BaseResponse from "../../models/common/BaseResponse";
import BaseResponseList from "../../models/common/BaseResponseList";
import DepartmentSearchInputModel from "../../models/company/department/request/DepartmentSearchInputModel";
import PagedListModel from "../../models/common/PagedListModel";
import DepartmentModel from "../../models/company/department/response/DepartmentModel";
import DepartmentRequestModel from "../../models/company/department/request/DepartmentRequestModel";

class DepartmentService {
    async fillDepartments(companyId: string) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.company.department.fillDepartments  + "/" + companyId);
        return res;
    }

    async getDepartments(inputParms: DepartmentSearchInputModel) {
        let res: PagedListModel<DepartmentModel> = await httpClient.post<PagedListModel<DepartmentModel>>(AppConfig.company.department.getDepartments, inputParms);
        return res;
    }

    async getDepartmentById(departmentId: string) {
        let res: BaseResponse<DepartmentModel> = await httpClient.get<BaseResponse<DepartmentModel>>(AppConfig.company.department.getDepartmentById  + "/" + departmentId);
        return res;
    }

    async saveDepartment(department: DepartmentRequestModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.company.department.saveDepartment, department);
        return res;
    }
}
const departmentService = new DepartmentService();
export default departmentService;