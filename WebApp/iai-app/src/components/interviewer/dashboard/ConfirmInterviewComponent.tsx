import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import modalUtils from "../../../utils/modal-utils";
import InterviewerDashboardModel from "../../../models/interviewer/response/InterviewerDashboardModel";
import ConfirmScheduleDetailsModel from "../../../models/interviewer/response/ConfirmScheduleDetailsModel";
import fileUtils from "../../../utils/file-utils";
import CandidateService from '../../../services/candidate/candidate-service';
import { FileUploadTypeEnum } from "../../../models/enums/FileUploadTypeEnum";

interface ConfirmInterviewProps {
    interview: InterviewerDashboardModel;
    onConfirmInterview: (interviewId: string) => void;
}

const ConfirmInterviewComponent = function (props: ConfirmInterviewProps) {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [interviewDetails, setInterviewDetails] = useState<ConfirmScheduleDetailsModel>();

    useEffect(() => {
        getInterviewDetails();
    }, []);

    const getInterviewDetails = () => {
        InterviewerService.getInterviewDetails(props.interview.interviewId).then((res) => {
            setInterviewDetails(res.data);
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Details" + error);
        });
    };

    const confirmInterview = () => {
        props.onConfirmInterview(props.interview.interviewId);
    }

    const downloadCandidateResume = () => {
        if (loggedInUser && interviewDetails) {
            CandidateService.downloadCandidateResume(loggedInUser.profileId, FileUploadTypeEnum.CandidateResume.toString()).then((res) => {               
                fileUtils.downloadFile(res, interviewDetails.candidateName);
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-4 ">Interview Details</div>
                <div className="col-md-8">Interview Date and Time : {interviewDetails?.interviewDate} {interviewDetails?.timeSlotName}</div>
            </div>
            <div className="row">
                <div className="col-md-3 text-center-align">Mobile Number :</div>
                <div className="col-md-3">{interviewDetails?.mobileNumber}</div>
                <div className="col-md-3 text-center-align">Experience :</div>
                <div className="col-md-3">{interviewDetails?.experienceName}</div>
            </div>
            <div className="row">
                <div className="col-md-3 text-center-align">Primary Skill :</div>
                <div className="col-md-3">{interviewDetails?.primarySkillName}</div>
                <div className="col-md-3 text-center-align">Key Responsibilities :</div>
                <div className="col-md-3">{interviewDetails?.keyResponsibilities}</div>
            </div>
            {interviewDetails?.secondarySkills.map(field => (
                <div className="row">
                    <div className="col-md-3 text-center-align">Secondary Skill {field.secondarySkillNumber} :</div>
                    <div className="col-md-3">{field.secondarySkillName}</div>
                </div>
            ))}
            <div className="row">
                <div className="col-md-3 text-center-align">Resume :</div>
                <div className="col-md-6">
                    <a title="Import File, Please do not import files with the same name." onClick={downloadCandidateResume}>
                        <i className="fa fa-download"></i>
                        <span>Download Resume</span>
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                    {!props.interview.isConfirmedByInterviewer &&
                        <button className="btn btn-primary btn-form" type="button" onClick={() => confirmInterview()}><span>Confirm</span></button>
                    }
                    <button className="btn btn-danger btn-form" type="button" onClick={() => modalUtils.closeModal()}><span>Close</span></button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmInterviewComponent;