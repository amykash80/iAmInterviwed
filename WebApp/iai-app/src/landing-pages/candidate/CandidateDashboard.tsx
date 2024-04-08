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
import CandidateDashboardComponent from "../../components/candidate/dashboard/CandidateDashboardComponent";
import { CandidateDashboardModel } from "../../models/candidate/response/CandidateDashboardModel";
import CandidateService from '../../services/candidate/candidate-service';
import alertUtils from "../../utils/toaster-utils";

const candidateDashboardRatingDefault = {
    interviewId: "",
    interviewUniqueId: "",
    ratingId: "",
    totalRating: "",
    interviewerComments: "",
    candidateDashboardRatingDetails: [],
    softSkillRatingDetails: []
};

const candidateDashboardInterviewDefault = {
    candidateId: "",
    interviewId: "",
    interviewUniqueId: "",
    interviewDate: new Date(),
    timeSlotName: "",
    primarySkillName: "",
    secondarySkillName: "",
    interviewerName: ""
};

const candidateDashboardProfileDefault = {
    candidateId: "",
    candidateName: "",
    designationName: "",
    primarySkillName: "",
    cityName: "",
    experienceName: "",
    resumeTitle: ""
};

const candidateDashboardModelDefault: CandidateDashboardModel = {
    candidateDashboardProfile: candidateDashboardProfileDefault,
    candidateDashboardActiveInterview: candidateDashboardInterviewDefault,
    candidateDashboardCompletedInterview: candidateDashboardInterviewDefault,
    candidateDashboardRating: candidateDashboardRatingDefault
}

const CandidateDashboard = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [candidateDashboardDetails, setCandidateDashboardDetails] = useState<CandidateDashboardModel>(candidateDashboardModelDefault);
    const [refreshCandidateDashboard, setRefreshCandidateDashboard] = useState<number>(2);

    useEffect(() => {
        if (loggedInUser) {
            getCandidateDashboardDetails(loggedInUser.profileId);
        }
    }, []);

    const getCandidateDashboardDetails = (candidateId?: string) => {
        if (candidateId) {
            CandidateService.getCandidateDashboardDetails(candidateId).then((res) => {
                if (res.isSuccess) {
                    setCandidateDashboardDetails(res.data);
                    setRefreshCandidateDashboard(refreshCandidateDashboard * 5);
                } else {
                    alertUtils.showError("Unable to load Data");
                }
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    };

    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header"> DASHBOARD</h4>
            </div>
            {refreshCandidateDashboard !== 2 &&
                <CandidateDashboardComponent
                    key={refreshCandidateDashboard}
                    objCandidateDashboardDetails={candidateDashboardDetails} />
            }
        </Layout>
    );
};
export default CandidateDashboard;