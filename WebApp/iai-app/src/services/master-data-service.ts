import AppConfig from "../config";
import httpClient from "../utils/http-client";
import IdNameModel from "../models/common/IdNameModel";
import BaseResponse from "../models/common/BaseResponse";
import BaseResponseList from "../models/common/BaseResponseList";

class MasterDataService {
    async loadPrimarySkills() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getPrimarySkills);
        return res;
    }

    async loadSecondarySkills(primarySkillId: number) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getSecondarySkills + '/' + primarySkillId);
        return res;
    }

    async loadSoftSkills() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getSoftSkills);
        return res;
    }

    async loadRoles() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getRoles);
        return res;
    }

    async loadCountries() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getCountries);
        return res;
    }

    async loadCities(countryId: number) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getCities + '/' + countryId);
        return res;
    }

    async loadDesignation(companyId: string) {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getDesignation + '/' + companyId);
        return res;
    }

    async loadDomains() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getDomains);
        return res;
    }

    async loadExperiences() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getExperiences);
        return res;
    }

    async loadInterviewTypes() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getInterviewTypes);
        return res;
    }

    async loadJobTypes() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getJobTypes);
        return res;
    }

    async loadNoticePeriod() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getNoticePeriod);
        return res;
    }

    async loadScreens() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getScreens);
        return res;
    }

    async loadStatus() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getStatus);
        return res;
    }

    async loadTimeSlots() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getTimeSlots);
        return res;
    }

    async loadZoomAccounts() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getZoomAccounts);
        return res;
    }

    async loadInterviewRounds() {
        let res: BaseResponseList<IdNameModel[]> = await httpClient.get<BaseResponseList<IdNameModel[]>>(AppConfig.masterDataLoad.getInterviewRounds);
        return res;
    }

    async loadSalaries() {
        let salaries: IdNameModel[] = [];
        let maxSalary: number = 30;
        for (let i = 1; i <= maxSalary; i++) {
            let salary: IdNameModel = {
                id: i,
                guId: i.toString(),
                name: i + ' Lakh'
            };
            salaries.push(salary);
        }
        return salaries;
    }
}
const masterDataService = new MasterDataService();
export default masterDataService;