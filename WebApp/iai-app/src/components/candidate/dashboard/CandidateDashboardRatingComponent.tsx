import { useRef, MouseEvent, useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import { CandidateDashboardModel, CandidateDashboardRating } from "../../../models/candidate/response/CandidateDashboardModel";
import candidateClasses from "../../../landing-pages/candidate/candidate.module.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IAIEnum } from "../../../models/enums/IAIEnum";
import RatingDetailsPopUp from "./RatingDetailsComponent";
import DownloadBadgePopUp from "./DownloadBadgeComponent";
import { GeneralPoupConfig, ModalSize } from "../../../models/modal-types";
import modalUtils from "../../../utils/modal-utils";
import CandidateService from "../../../services/candidate/candidate-service";
import alertUtils from "../../../utils/toaster-utils";

interface CandidateDashboardRatingProps {
    objCandidateDashboardDetails: CandidateDashboardRating;
}

const CandidateDashboardRatingComponent = (props: CandidateDashboardRatingProps) => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [candidateDashboardDetails, setCandidateDashboardDetails] = useState<CandidateDashboardRating>(props.objCandidateDashboardDetails);

    const viewRating = () => {
        CandidateService.getInterviewRatingDetails(props.objCandidateDashboardDetails.interviewId).then((res) => {
            if (res.isSuccess) {
                const config: GeneralPoupConfig = {
                    title: "Rating Details",
                    content: (
                        <RatingDetailsPopUp
                            objRatingDetails={res.data}
                        />
                    ),
                    size: ModalSize.XL,
                    className: "model-rating-details-badge"
                };
                modalUtils.showPopup(config);
            } else {
                alertUtils.showError(res.errorMessages.toString());
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Schedules");
        });
    }

    const viewBadge = () => {
        CandidateService.getInterviewRatingDetails(props.objCandidateDashboardDetails.interviewId).then((res) => {
            if (res.isSuccess) {
                const config: GeneralPoupConfig = {
                    title: "Download Badge",
                    content: (
                        <DownloadBadgePopUp
                            objRatingDetails={res.data}
                        />
                    ),
                    size: ModalSize.LG,
                    className: "model-min-height-650"
                };
                modalUtils.showPopup(config);
            } else {
                alertUtils.showError(res.errorMessages.toString());
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Schedules");
        });
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className={candidateClasses.ratingDonut}>
                        <CircularProgressbar value={(Number(candidateDashboardDetails.totalRating) / IAIEnum.MaxRating) * 100} text={`${candidateDashboardDetails.totalRating}/${IAIEnum.MaxRating}`} strokeWidth={5}
                        />
                    </div>
                </div>
            </div>
            {candidateDashboardDetails.candidateDashboardRatingDetails.map((field, index) => (
                <div className="row">
                    <div className="col-md-6">{field.secondarySkillName}:</div>
                    <div className="col-md-6">{field.rating}</div>
                </div>
            ))}
            <div className="row">
                <div className="col-md-12 padding-10 ">
                    <a className={candidateClasses.viewRatingLink} onClick={() => viewRating()}>View Rating</a>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 padding-10 ">
                    <a className={candidateClasses.viewRatingLink} onClick={() => viewBadge()}>View Badge</a>
                </div>
            </div>
        </div>
    );
};
export default CandidateDashboardRatingComponent;