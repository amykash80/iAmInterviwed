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
import InterviewerScheduleComponent from "../../components/interviewer/schedule/InterviewerScheduleComponent";
import MasterDataService from '../../services/master-data-service';
import alertUtils from "../../utils/toaster-utils";
import IdNameModel from "../../models/common/IdNameModel";

const InterviewerSchedule = () => {
    const [timeSlots, setTimeSlots] = useState<IdNameModel[]>([]);
    const [refreshInterviewerSchedule, setRefreshInterviewerSchedule] = useState<number>(2);

    useEffect(() => {
        getTimeSlots();
    }, [])

    const getTimeSlots = () => {
        MasterDataService.loadTimeSlots().then((res) => {
            if (res.isSuccess) {
                setTimeSlots(res.items);
                setRefreshInterviewerSchedule(refreshInterviewerSchedule * 5);
            } else {
                alertUtils.showError("Unable to load Primary skills");
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Primary skills");
        });
    };

    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header">SCHEDULES</h4>
            </div>
            {timeSlots.length > 0 &&
                <InterviewerScheduleComponent
                    key={refreshInterviewerSchedule}
                    tileSlotsList={timeSlots} />
            }
        </Layout>
    );
};
export default InterviewerSchedule;