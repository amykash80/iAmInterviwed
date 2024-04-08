import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../context-store";
import Layout from "../../components/layout/Layout";
import "../../assets/InnerCSS/plugins/bootstrap/css/bootstrap.min.css";
import "../../assets/InnerCSS/plugins/font-awesome/css/font-awesome.min.css";
import "../../assets/InnerCSS/plugins/icomoon/style.css";
import "../../assets/InnerCSS/plugins/uniform/css/default.css";
import "../../assets/InnerCSS/plugins/switchery/switchery.min.css";
import "../../assets/InnerCSS/plugins/nvd3/nv.d3.min.css";
import "../../assets/InnerCSS/css/styles.css";
import "../../assets/InnerCSS/css/custom.css";
import InterviewerPersonalInfoComponent from "../../components/interviewer/profile/InterviewerPersonalInfoComponent";
import MasterDataService from '../../services/master-data-service';
import InterviewerService from '../../services/interviewer/interviewer-service';
import alertUtils from "../../utils/toaster-utils";
import IdNameModel from "../../models/common/IdNameModel";
import InterviewerPersonalInfoModel from "../../models/interviewer/response/InterviewerPersonalInfoModel";

const InterviewerPersonalInfoModelDefault = {
    interviewerId: "",
    countryId: 0,
    cityId: 0,
    experienceId: 0,
    mobileNumber: 0,
    address: "",
    resumeTitle: "",
};

const InterviewerPersonalInfo = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [city, setCity] = useState<IdNameModel[]>([]);
    const [experience, setExperience] = useState<IdNameModel[]>([]);
    const [interviewerProfile, setInterviewerProfile] = useState<InterviewerPersonalInfoModel>(InterviewerPersonalInfoModelDefault);
    const [refreshInterviewerProfile, setRefreshInterviewerProfile] = useState<number>(2);

    useEffect(() => {
        if (loggedInUser) {
            getInterviewerProfile(loggedInUser.profileId);
        }
        getExperience();
    }, []);

    const getExperience = () => {
        MasterDataService.loadExperiences().then((res) => {
            if (res.isSuccess) {
                setExperience(res.items);
            } else {
                alertUtils.showError("Unable to load Experience");
            }
        }).catch((error) => {
            alertUtils.showError(error);
        });
    };

    const getInterviewerProfile = (interviewerId?: string) => {
        if (interviewerId) {
            InterviewerService.getInterviewerPersonalInfo(interviewerId).then((res) => {
                if (res.isSuccess) {
                    setInterviewerProfile(res.data);
                    getCity(res.data.countryId);
                } else {
                    alertUtils.showError("Unable to load Data");
                }
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    };

    const getCity = (targetValue: number) => {
        MasterDataService.loadCities(targetValue).then((res) => {
            if (res.isSuccess) {
                setCity(res.items);
                setRefreshInterviewerProfile(refreshInterviewerProfile * 5);
            } else {
                alertUtils.showError("Unable to load Cities");
            }
        }).catch((error) => {
            alertUtils.showError(error);
        });
    };

    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header"> MY Personal Info</h4>                
            </div>
            <InterviewerPersonalInfoComponent
                    key={refreshInterviewerProfile}
                    objInterviewerProfile={interviewerProfile}
                    experienceList={experience}
                    cityList={city} />
        </Layout>
    );
};
export default InterviewerPersonalInfo;