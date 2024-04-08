import { useRef, MouseEvent, useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import { CandidateDashboardInterview } from "../../../models/candidate/response/CandidateDashboardModel";
import candidateClasses from "../../landing-pages/candidate/candidate.module.css";
import dateUtils from "../../../utils/date-utils";

interface CandidateDashboardRatingProps {
    objCandidateDashboardDetails: CandidateDashboardInterview;
}

const CandidateDashboardInterviewComponent = (props: CandidateDashboardRatingProps) => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [candidateDashboardDetails, setCandidateDashboardDetails] = useState<CandidateDashboardInterview>(props.objCandidateDashboardDetails);
    return (
        <div>            
            <div className="row">
                <div className="col-md-6">Date:</div>
                <div className="col-md-6">{candidateDashboardDetails.interviewDate}</div>
            </div>
            <div className="row">
                <div className="col-md-6">Time:</div>
                <div className="col-md-6">{candidateDashboardDetails.timeSlotName}</div>
            </div>
            <div className="row">
                <div className="col-md-6">Skills:</div>
                <div className="col-md-6">{candidateDashboardDetails.secondarySkillName}</div>
            </div>
            <div className="row">
                <div className="col-md-6"> Interviewer:</div>
                <div className="col-md-6">{candidateDashboardDetails.interviewerName}</div>
            </div>
        </div>
    );
};
export default CandidateDashboardInterviewComponent;