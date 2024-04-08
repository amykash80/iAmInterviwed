import AppConfig from "../config";
import httpClient from "../utils/http-client";
import IdNameModel from "../models/common/IdNameModel";
import BaseResponse from "../models/common/BaseResponse";
import BaseResponseList from "../models/common/BaseResponseList";

class FileUploadService {
    async uploadFile(data: any) {
        const res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(
            AppConfig.fileUpload.uploadFile, data
        );
        return res;
    };
}
const fileUploadService = new FileUploadService();
export default fileUploadService;