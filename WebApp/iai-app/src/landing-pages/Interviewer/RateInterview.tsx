import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../context-store";
import { useHistory } from "react-router";
import Layout from "../../components/layout/Layout";
import "../../assets/InnerCSS/plugins/bootstrap/css/bootstrap.min.css";
import "../../assets/InnerCSS/plugins/font-awesome/css/font-awesome.min.css";
import "../../assets/InnerCSS/plugins/icomoon/style.css";
import "../../assets/InnerCSS/plugins/uniform/css/default.css";
import "../../assets/InnerCSS/plugins/switchery/switchery.min.css";
import "../../assets/InnerCSS/plugins/nvd3/nv.d3.min.css";
import "../../assets/InnerCSS/css/styles.css";
import "../../assets/InnerCSS/css/custom.css";
import RateInterviewComponent from "../../components/interviewer/dashboard/RateInterviewComponent";
import RatingParams from "../../models/common/RatingParms";
import InterviewRatingModel from "../../models/interviewer/response/InterviewRatingModel";
import InterviewerService from '../../services/interviewer/interviewer-service';
import alertUtils from "../../utils/toaster-utils";

const RateInterview = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [ratingModel, setRatingModel] = useState<InterviewRatingModel>();
    const [refreshRateInterview, setRefreshRateInterview] = useState<number>(2);
    const requestParams: RatingParams = useParams();
    const history = useHistory();

    useEffect(() => {
        getRatingDetails();
    }, []);

    const getRatingDetails = () => {
        if (loggedInUser && requestParams && requestParams.interviewId) {
            InterviewerService.getInterviewRatingDetails(requestParams.interviewId).then((res) => {
                if(res.isSuccess) {
                    setRatingModel(res.data);
                    setRefreshRateInterview(refreshRateInterview * 5);
                } else {
                    alertUtils.showError(res.errorMessages.toString());
                }                
            }).catch((error) => {
                alertUtils.showError("Erorr fetching Schedules");
            });
        }
    };

    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header"> Rate Interview</h4>
            </div>
            {refreshRateInterview !== 2 && ratingModel &&
                <RateInterviewComponent
                    key={refreshRateInterview}
                    objRateInterview={ratingModel} />
            }
        </Layout>
    );
};
export default RateInterview;