import AppConfig from "../config";
import AuthRequest from "../models/authentication/AuthRequest";
import AuthResponse from "../models/authentication/AuthResponse";
import httpClient from "../utils/http-client";
import storageHelper from "../utils/client-storage";
import User from "../models/User";
import ApiResponse from "../models/ApiResponse";
import RegisterUser from "../models/authentication/RegisterUser";
import UserRegistrationResponse from "../models/authentication/UserRegistrationResponse";
import BaseResponse from "../models/common/BaseResponse";
import RegisterCompany from "../models/authentication/RegisterCompany";
import VerificationModel from "../models/authentication/VerificationModel";
import ChangePasswordModel from "../models/authentication/ChangePasswordModel";

class AuthenticationService {
    async authenticate(req: AuthRequest) {
        let res: AuthResponse = await httpClient.post<AuthResponse>(AppConfig.account.authenticationUrl, req);
        storageHelper.setItem(AppConfig.account.apiTokenHeader, res.token);
        storageHelper.setItem(AppConfig.account.userTokenHeader, res.token);
        res.user = await this.getUserDetail();
        return res;
    }

    async logOut() {
        let res: AuthResponse = {} as AuthResponse;
        storageHelper.removeItem(AppConfig.account.apiTokenHeader);
        storageHelper.removeItem(AppConfig.account.userTokenHeader);
        return res;
    }

    async getUserDetail() {
        let apiResponse = await httpClient.get<BaseResponse<User>>(AppConfig.account.userDetails);
        return apiResponse.data;
    }

    authTokenExists() {
        const apiToken = storageHelper.getItem(AppConfig.account.apiTokenHeader);
        const userToken = storageHelper.getItem(AppConfig.account.userTokenHeader);
        if (apiToken && userToken) {
            return true;
        }
        return false;
    }

    async registerUser(req: RegisterUser) {
        let res: BaseResponse<UserRegistrationResponse> = await httpClient.post<BaseResponse<UserRegistrationResponse>>(AppConfig.account.register, req);
        return res;
    }

    async registerCompany(req: RegisterCompany) {
        let res: BaseResponse<UserRegistrationResponse> = await httpClient.post<BaseResponse<UserRegistrationResponse>>(AppConfig.account.registerCompany, req);
        return res;
    }

    async VerifyUser(req: VerificationModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.account.verifyuser, req);
        return res;
    }

    async ChangePassword(req: ChangePasswordModel) {
        let res: BaseResponse<boolean> = await httpClient.post<BaseResponse<boolean>>(AppConfig.account.changePassword, req);
        return res;
    }
}
const authenticationService = new AuthenticationService();
export default authenticationService;