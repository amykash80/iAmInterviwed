import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import { Redirect, useHistory } from "react-router";
import dateUtils from "../../../utils/date-utils";
import DataGrid from "../../common/table/DataGrid";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import InterviewerDashboardRequestParameters from "../../../models/interviewer/request/InterviewerDashboardRequestParameters";
import { SortDirection } from "../../../models/enums/SortDirectionEnum";
import InterviewerDashboardModel from "../../../models/interviewer/response/InterviewerDashboardModel";
import PagedListModel from "../../../models/common/PagedListModel";
import DateTimePicker from "react-datepicker";
import { GeneralPoupConfig, ModalSize } from "../../../models/modal-types";
import modalUtils from "../../../utils/modal-utils";
import ConfirmInterviewPopUp from "./ConfirmInterviewComponent";
import { ConfirmEnum } from "../../../models/enums/ConfirmEnum";
import RatingDetailsPopUp from "../../candidate/dashboard/RatingDetailsComponent";

const InterviewerDashboardComponent = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [startDate, setStartDate] = useState(dateUtils.addDays(new Date(), -7) as any);
    const [endDate, setEndDate] = useState(new Date() as any);
    const [dashboardList, setDashboardList] = useState<PagedListModel<InterviewerDashboardModel>>();
    const history = useHistory();

    useEffect(() => {
        getInterviewerDashboard();
    }, []);

    const startDateHanler = (date: any) => {
        setStartDate(date);
    };

    const endDateHanler = (date: any) => {
        setEndDate(date);
    };

    const getInterviewerDashboard = () => {
        if (loggedInUser) {
            let inputParms: InterviewerDashboardRequestParameters = {
                page: 1,
                pageSize: 1000,
                sort: "InterviewDate",
                sortDir: SortDirection.Asc,
                interviewerId: loggedInUser?.profileId,
                startDate: dateUtils.getFormattedDateFromDate(startDate),
                endDate: dateUtils.getFormattedDateFromDate(endDate),
                candidateName: "",
                interviewTypeId: 0,
                statusId: 0
            }
            InterviewerService.loadInterviewerDashboard(inputParms).then((res) => {
                setDashboardList(res);
            }).catch((error) => {
                alertUtils.showError("Erorr fetching Schedules");
            });
        }
    };

    const confirmFormatter = (
        cell: any,
        row: InterviewerDashboardModel,
        rowIndex: number
    ) => {
        return (
            row.isConfirmedByInterviewer.toString()
        );
    }

    const ActionFormatter = (
        cell: any,
        row: InterviewerDashboardModel,
        rowIndex: number
    ) => {
        if (row.isConfirmedByInterviewer === ConfirmEnum.Yes) {
            return (
                <div>
                    <a onClick={() => { confirmInterviewPopUp(row); }} title="View Interview"><i className="fa-solid fa-eye fa-fw"></i></a>
                    <a onClick={() => { rateInterview(row); }} title="Rate Interview"><i className="fa-regular fa-star fa-fw"></i></a>
                </div>
            );
        } else {
            return (
                <div>
                    <a onClick={() => { confirmInterviewPopUp(row); }} title="Confirm Interview"><i className="fa-solid fa-circle-check fa-fw"></i></a>
                </div>
            );
        }
    };

    const columnsInterviews = [
        {
            dataField: "interviewDate",
            text: "Interview Date"
        },
        {
            dataField: "timeSlotName",
            text: "Time"
        },
        {
            dataField: "primarySkillName",
            text: "P Skill"
        },
        {
            dataField: "candidateName",
            text: "Candidate Name"
        },
        {
            dataField: "interviewTypeName",
            text: "Interview Type"
        },
        {
            dataField: "isConfirmedByInterviewer",
            text: "Confirmed",
            formatter: confirmFormatter
        },
        {
            dataField: "rating",
            text: "Rating"
        },
        {
            dataField: "statusName",
            text: "Status"
        },
        {
            dataField: "meetingURL",
            text: "Meeting Link"
        },
        // {
        //     dataField: "meetingURL",
        //     text: "Spl Notes"
        // },
        {
            dataField: "",
            text: "",
            formatter: ActionFormatter
        }
    ];

    const confirmInterviewPopUp = (interview: InterviewerDashboardModel) => {
        const config: GeneralPoupConfig = {
            title: !interview.isConfirmedByInterviewer ? "Confirm Interview" : "Interview Details",
            content: (
                <ConfirmInterviewPopUp
                    interview={interview}
                    onConfirmInterview={confirmInterviewHandler}
                />
            ),
            size: ModalSize.XL,
            className: "model-min-height-500"
        };
        modalUtils.showPopup(config);
    }

    const confirmInterviewHandler = (interviewId: string) => {
        if (loggedInUser) {
            InterviewerService.ConfirmInterview(interviewId, loggedInUser.profileId).then((res) => {
                alertUtils.showSuccess(res.informationMessages.toString());
                //setTimeout(() => {
                modalUtils.closeModal();
                getInterviewerDashboard();
                //}, 1000);
            }).catch((error) => {
                alertUtils.showError("Erorr fetching Details" + error);
            });
        }
    }

    const rateInterview = (interview: InterviewerDashboardModel) => {
        if (interview.isRated === ConfirmEnum.Yes) {
            InterviewerService.getInterviewRatingDetails(interview.interviewId).then((res) => {
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
        } else {
            history.push("/rate-interview/" + interview.interviewId);
        }
    }

    return (
        <div className="card card-white">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">Start Date: </label>
                        <DateTimePicker
                            selectsStart
                            onChange={startDateHanler}
                            selected={startDate}
                            timeInputLabel="Time:"
                            dateFormat="yyyy-MMM-dd"
                            className="form-control"
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">End Date: </label>
                        <DateTimePicker
                            selectsStart
                            onChange={endDateHanler}
                            selected={endDate}
                            timeInputLabel="Time:"
                            dateFormat="yyyy-MMM-dd"
                            className="form-control"
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label"></label>
                        <button disabled={startDate === "" || endDate === ""} className="btn btn-success btn-form block-display" type="submit" onClick={() => getInterviewerDashboard()}><span>Search</span></button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {dashboardList && dashboardList.items.length > 0 &&
                            <DataGrid
                                uniqueField="interviewId"
                                data={dashboardList.items}
                                columns={columnsInterviews}
                                disablePagination={true}
                                filterRequired={false}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InterviewerDashboardComponent;