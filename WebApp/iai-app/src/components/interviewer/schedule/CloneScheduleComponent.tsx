import React, { useState } from "react";
import { useAppSelector } from "../../../context-store";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import dateUtils from "../../../utils/date-utils";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InterviewerSchedulesModel from "../../../models/interviewer/response/InterviewerSchedulesModel";
import InterviewerSchedulesRequestModel from "../../../models/interviewer/request/InterviewerSchedulesRequestModel";
import modalUtils from "../../../utils/modal-utils";
import { DayofWeekEnum } from "../../../models/enums/DayofWeekEnum";

interface CloneScheduleProps {
    schedule: InterviewerSchedulesModel;
}

const CloneScheduleComponent = (props: CloneScheduleProps) => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    let weekdays: string[] = [DayofWeekEnum.Monday.toString(), DayofWeekEnum.Tuesday.toString(), DayofWeekEnum.Wednesday.toString(), DayofWeekEnum.Thursday.toString(), DayofWeekEnum.Friday.toString()];
    let weekEnds: string[] = [DayofWeekEnum.Sunday.toString(), DayofWeekEnum.Saturday.toString()];
    const [startDate, setStartDate] = useState("" as any);
    const [endDate, setEndDate] = useState("" as any);
    const [dayOfWeek, setDayOfWeek] = useState<string>(dateUtils.getDayFromDate(props.schedule.date));
    const startDateHanler = (date: any) => {
        setStartDate(date);
    };

    const endDateHanler = (date: any) => {
        setEndDate(date);
    };

    const cloneSchedule = () => {
        if (loggedInUser) {
            var sDate = new Date(startDate);
            var eDate = new Date(endDate);
            var timslotsSaveList: InterviewerSchedulesRequestModel[] = [];
            while (sDate <= endDate) {
                let saveSchedule: boolean = true;
                if (weekdays.indexOf(dayOfWeek) > -1) {
                    if (dateUtils.getDayFromDateFormat(sDate) === DayofWeekEnum.Saturday.toString()) {
                        saveSchedule = false;
                    }
                    if (dateUtils.getDayFromDateFormat(sDate) === DayofWeekEnum.Sunday.toString()) {
                        saveSchedule = false;
                    }
                } else if (weekEnds.indexOf(dayOfWeek) > -1) {
                    if (weekdays.indexOf(dateUtils.getDayFromDateFormat(sDate)) > -1) {
                        saveSchedule = false;
                    }
                }

                if (saveSchedule) {
                    let objTimeSlot: InterviewerSchedulesRequestModel = {
                        interviewerId: loggedInUser.profileId,
                        startDate: dateUtils.getFormattedDate(sDate),
                        endDate: dateUtils.getFormattedDate(sDate),
                        timeSlotIds: props.schedule.timeSlotIds,
                        blockSchedule: false
                    }
                    timslotsSaveList.push(objTimeSlot);
                }
                sDate = dateUtils.addDays(sDate, 1);
            }
            if (timslotsSaveList.length > 0) {
                InterviewerService.saveInterviewerSchedule(timslotsSaveList).then((res) => {
                    alertUtils.showSuccess(res.informationMessages.toString());
                    clearSchedule();
                }).catch((error) => {
                    alertUtils.showError(error);
                });
            }
        }
    }

    const clearSchedule = () => {
        setStartDate("");
        setEndDate("");
        modalUtils.closeModal();
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <label className="form-label">From: </label>
                    <DateTimePicker
                        selectsStart
                        onChange={startDateHanler}
                        selected={startDate}
                        timeInputLabel="Time:"
                        dateFormat="yyyy-MMM-dd"
                        className="form-control"
                        minDate={dateUtils.addDays(new Date(), 1)}
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">To: </label>
                    <DateTimePicker
                        selectsStart
                        onChange={endDateHanler}
                        selected={endDate}
                        timeInputLabel="Time:"
                        dateFormat="yyyy-MMM-dd"
                        className="form-control"
                        minDate={dateUtils.addDays(new Date(), 1)}
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}
                    />
                </div>
                {weekdays.indexOf(dayOfWeek) > -1 &&
                    <div className="col-md-4">
                        <label className="form-label"></label>
                        <button disabled={startDate === "" || endDate === ""} className="btn btn-link btn-form block-display" type="button" onClick={() => cloneSchedule()}><span>Clone for all weekdays</span></button>
                    </div>
                }
                {weekEnds.indexOf(dayOfWeek) > -1 &&
                    <div className="col-md-4">
                        <label className="form-label"></label>
                        <button disabled={startDate === "" || endDate === ""} className="btn btn-link btn-form block-display" type="button" onClick={() => cloneSchedule()}><span>Clone for all weekends</span></button>
                    </div>
                }
            </div>
            <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                    <button className="btn btn-danger btn-form" type="button" onClick={() => clearSchedule()}><span>Clear</span></button>
                </div>
            </div>
        </div >
    );
};
export default CloneScheduleComponent;