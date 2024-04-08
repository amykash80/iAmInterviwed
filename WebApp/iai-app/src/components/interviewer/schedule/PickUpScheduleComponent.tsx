import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import dateUtils from "../../../utils/date-utils";
import DataGrid from "../../common/table/DataGrid";
import ConfirmScheduleDetailsModel from "../../../models/interviewer/response/ConfirmScheduleDetailsModel";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";

const PickUpScheduleComponent = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [pickUpSchedules, setPickUpSchedules] = useState<ConfirmScheduleDetailsModel[]>([]);

    useEffect(() => {
        getPickUpSchedules();
    }, []);

    const getPickUpSchedules = () => {
        InterviewerService.getInterviewsToBePicked().then((res) => {
            if (res.isSuccess) {
                setPickUpSchedules(res.data);
            } else {
                alertUtils.showError(res.errorMessages.toString());
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Schedules");
        });
    };

    const dateFormatter = (
        cell: any,
        row: ConfirmScheduleDetailsModel,
        rowIndex: number,
        formatExtraData: any
    ) => {
        if (row.interviewDate) {
            return dateUtils.getFormattedDateFromDate(row.interviewDate);
        } else {
            return "";
        }
    };

    const ActionFormatter = (
        cell: any,
        row: ConfirmScheduleDetailsModel,
        rowIndex: number
    ) => {
        return (
            <div>
                <a onClick={() => { savePickUpSchedule(row); }}>Yes</a>
            </div>
        );
    };

    const columnsSchedules = [
        {
            dataField: "interviewDate",
            text: "Interview Date",
            formatter: dateFormatter
        },
        {
            dataField: "timeSlotName",
            text: "Time"
        },
        {
            dataField: "experienceName",
            text: "Yrs of Experience"
        },
        {
            dataField: "keyResponsibilities",
            text: "Spl Notes"
        },
        {
            dataField: "candidateName",
            text: "Your booked slots for the day"
        },
        {
            dataField: "",
            text: "PickUp",
            formatter: ActionFormatter
        }
    ];

    const savePickUpSchedule = (row: ConfirmScheduleDetailsModel) => {
        if (loggedInUser) {
            InterviewerService.updateInterviewerForSchedule(row.interviewId, loggedInUser.profileId).then((res) => {
                if (res.isSuccess) {
                    alertUtils.showSuccess(res.informationMessages.toString());
                    getPickUpSchedules();
                } else {
                    alertUtils.showError(res.errorMessages.toString());
                }
            }).catch((error) => {
                alertUtils.showError("Erorr fetching Schedules");
            });
        }
    };

    return (
        <div className="card card-white">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        {pickUpSchedules.length > 0 &&
                            <DataGrid
                                uniqueField="date"
                                data={pickUpSchedules}
                                columns={columnsSchedules}
                                disablePagination={true}
                                filterRequired={false}
                            />
                        }
                        {pickUpSchedules.length === 0 &&
                            <p>No Interviews Available.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PickUpScheduleComponent;