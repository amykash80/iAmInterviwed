import React, { useState } from "react";
import { useAppSelector } from "../../../context-store";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import dateUtils from "../../../utils/date-utils";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InterviewerSchedulesModel from "../../../models/interviewer/response/InterviewerSchedulesModel";
import InterviewerScheduleGridComponent from "./InterviewerScheduleGridComponent";

const InterviewerScheduleSearchComponent = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [scheduleDate, setScheduleDate] = useState("" as any);
    const [interviewerSchedules, setInterviewerSchedules] = useState<InterviewerSchedulesModel>();
    const [refreshInterviewerScheduleGrid, setRefreshInterviewerScheduleGrid] = useState<number>(2);

    const selectDateHanler = (date: any) => {
        setScheduleDate(date);
    };

    const searchSchedule = () => {
        if (loggedInUser) {
            InterviewerService.getInterviewerSchedules(loggedInUser.profileId, dateUtils.getFormattedDateFromDate(scheduleDate)).then((res) => {
                setInterviewerSchedules(res.data);
                setRefreshInterviewerScheduleGrid(refreshInterviewerScheduleGrid * 5);
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <label className="form-label">Date: </label>
                    <DateTimePicker
                        selectsStart
                        onChange={selectDateHanler}
                        selected={scheduleDate}
                        timeInputLabel="Time:"
                        dateFormat="yyyy-MMM-dd"
                        className="form-control"
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}
                    />
                </div>
                <div className="col-md-2">
                    <label className="form-label"></label>
                    <button disabled={scheduleDate === ""} className="btn btn-success btn-form block-display" type="submit" onClick={() => searchSchedule()}><span>Search</span></button>
                </div>
            </div>
            <div className="row">
                {interviewerSchedules && refreshInterviewerScheduleGrid != 2 &&
                    <InterviewerScheduleGridComponent
                        key={refreshInterviewerScheduleGrid}
                        interviewerSchedule={interviewerSchedules} />
                }
            </div>
        </div>
    );
};
export default InterviewerScheduleSearchComponent;