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
import CandidateProfileComponent from "../../components/candidate/profile/CandidateProfileComponent";
import MasterDataService from '../../services/master-data-service';
import CandidateService from '../../services/candidate/candidate-service';
import alertUtils from "../../utils/toaster-utils";
import IdNameModel from "../../models/common/IdNameModel";
import CandidateProfileModel from "../../models/candidate/response/CandidateProfileModel";

const CandidateProfileModelDefault = {
    candidateId: "",
    countryId: 0,
    cityId: 0,
    experienceId: 0,
    designationId: 0,
    currentPay: 0,
    noticePeriodId: 0,
    mobileNumber: 0,
    emailId: "",
    resumeTitle: "",
    restrictEmployerToViewProfile: false
};

const CandidateProfile = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [city, setCity] = useState<IdNameModel[]>([]);
    const [designation, setDesignation] = useState<IdNameModel[]>([]);
    const [experience, setExperience] = useState<IdNameModel[]>([]);
    const [noticePeriod, setNoticePeriod] = useState<IdNameModel[]>([]);
    const [candidateProfile, setCandidateProfile] = useState<CandidateProfileModel>(CandidateProfileModelDefault);
    const [refreshCandidateProfile, setRefreshCandidateProfile] = useState<number>(2);

    useEffect(() => {
        if (loggedInUser) {
            getCandidateProfile(loggedInUser.profileId);
        }
        getExperience();
        getDesignation();
        getNoticePeriod();
    }, []);

    const getCandidateProfile = (candidateId?: string) => {
        if (candidateId) {
            CandidateService.getCandidateProfile(candidateId).then((res) => {
                if (res.isSuccess) {
                    setCandidateProfile(res.data);
                    getCity(res.data.countryId);
                } else {
                    alertUtils.showError("Unable to load Data");
                }
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    };

    const getExperience = () => {
        MasterDataService.loadExperiences()
            .then((res) => {
                if (res.isSuccess) {
                    setExperience(res.items);
                } else {
                    alertUtils.showError("Unable to load Experience");
                }
            })
            .catch((error) => {
                alertUtils.showError(error);
            });
    };

    const getCity = (targetValue: number) => {
        MasterDataService.loadCities(targetValue).then((res) => {
            if (res.isSuccess) {
                setCity(res.items);
                setRefreshCandidateProfile(refreshCandidateProfile * 5);
            } else {
                alertUtils.showError("Unable to load Cities");
            }
        }).catch((error) => {
            alertUtils.showError(error);
        });
    };

    const getDesignation = () => {
        CandidateService.loadCandidateDesignation().then((res) => {
            if (res.isSuccess) {
                setDesignation(res.items);
            } else {
                alertUtils.showError("Unable to load Cities");
            }
        }).catch((error) => {
            alertUtils.showError(error);
        });
    };

    const getNoticePeriod = () => {
        MasterDataService.loadNoticePeriod().then((res) => {
            if (res.isSuccess) {
                setNoticePeriod(res.items);
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
                <h4 className="breadcrumb-header"> MY PROFILE</h4>
            </div>
            <CandidateProfileComponent
                key={refreshCandidateProfile}
                objCandidateProfile={candidateProfile}
                experienceList={experience}
                cityList={city}
                designationList={designation}
                noticePeriodList={noticePeriod}
            />
        </Layout>
    );
};
export default CandidateProfile;