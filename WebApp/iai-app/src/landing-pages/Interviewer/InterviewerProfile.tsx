import { useState, useEffect } from "react";
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
import InterviewerProfileComponent from "../../components/interviewer/profile/InterviewerProfileComponent";

const InterviewerProfile = () => {
    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header"> MY PROFILE</h4>
            </div>
            <InterviewerProfileComponent />
        </Layout>
    );
};
export default InterviewerProfile;