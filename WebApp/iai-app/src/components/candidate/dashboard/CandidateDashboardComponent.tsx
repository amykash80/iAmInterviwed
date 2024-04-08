import { useState, MouseEvent } from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../../context-store";
import { CandidateDashboardModel } from "../../../models/candidate/response/CandidateDashboardModel";
import candidateClasses from "../../../landing-pages/candidate/candidate.module.css";
import CandidateDashboardRatingComponent from "./CandidateDashboardRatingComponent";
import CandidateDashboardInterviewComponent from "./CandidateDashboardInterviewDetails";

interface CandidateDashboardProps {
    objCandidateDashboardDetails: CandidateDashboardModel;
}

const CandidateDashboardComponent = (props: CandidateDashboardProps) => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [candidateDashboardDetails, setCandidateDashboardDetails] = useState<CandidateDashboardModel>(props.objCandidateDashboardDetails);
    const history = useHistory();

    const redirectToSchedule = (event: MouseEvent) => {
        history.push("/schedule-interview");
    }

    return (
        <div className="row">
            <div className="col-md-4 border-right-line min-height-300">
                <div className="card card-white min-height-300">
                    <div className="card-body">
                        <h4 className={candidateClasses.candidateDashboardHeader}>User Profile</h4>
                        <div className="row">
                            <div className="col-md-12 text-center-align">
                                <span>{candidateDashboardDetails.candidateDashboardProfile.candidateName}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">Designation:</div>
                            <div className="col-md-6">{candidateDashboardDetails.candidateDashboardProfile.designationName}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">Primary Skill:</div>
                            <div className="col-md-6">{candidateDashboardDetails.candidateDashboardProfile.primarySkillName}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">Location:</div>
                            <div className="col-md-6">{candidateDashboardDetails.candidateDashboardProfile.cityName}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6"> Experience:</div>
                            <div className="col-md-6">{candidateDashboardDetails.candidateDashboardProfile.experienceName}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">My Resume:</div>
                            <div className="col-md-6">Download Resume</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 border-right-line min-height-300">
                <div className="card card-white min-height-300">
                    <div className="card-body">
                        <h4 className={candidateClasses.candidateDashboardHeader}>My Interview Schedule</h4>
                        {candidateDashboardDetails.candidateDashboardActiveInterview &&
                            <CandidateDashboardInterviewComponent
                                objCandidateDashboardDetails={candidateDashboardDetails.candidateDashboardActiveInterview} />
                        }
                        {!candidateDashboardDetails.candidateDashboardActiveInterview &&
                            <span>No scheduled Interviews.
                                <a className="a-info-click" onClick={(e) => { redirectToSchedule(e); }}> Click here </a>
                                to schedule Interview</span>

                        }
                        {candidateDashboardDetails.candidateDashboardCompletedInterview &&
                            <h4 className={candidateClasses.candidateDashboardHeader}>My Completed Interview</h4>
                        }
                        {candidateDashboardDetails.candidateDashboardCompletedInterview &&
                            <CandidateDashboardInterviewComponent
                                objCandidateDashboardDetails={candidateDashboardDetails.candidateDashboardCompletedInterview} />
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-4 min-height-300">
                <div className="card card-white min-height-300">
                    <div className="card-body">
                        <h4 className={candidateClasses.candidateDashboardHeader}>My Rating</h4>
                        {!candidateDashboardDetails.candidateDashboardActiveInterview &&
                            <a className="a-info-click" onClick={(e) => { redirectToSchedule(e); }}> Please schedule your first interview </a>
                        }
                        {candidateDashboardDetails.candidateDashboardRating &&
                            <CandidateDashboardRatingComponent
                                objCandidateDashboardDetails={candidateDashboardDetails.candidateDashboardRating} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CandidateDashboardComponent;