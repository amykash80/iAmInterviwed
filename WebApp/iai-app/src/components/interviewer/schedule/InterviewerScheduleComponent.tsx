import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import IdNameModel from "../../../models/common/IdNameModel";
import TagsInputModel from "../../../models/common/TagsInputModel";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import dateUtils from "../../../utils/date-utils";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { addDays } from "../../../assets/InnerCSS/plugins/full-calendar/core/main";
import { WithContext as ReactTags } from 'react-tag-input';
import InterviewerSchedulesRequestModel from "../../../models/interviewer/request/InterviewerSchedulesRequestModel";
import InterviewerSchedulesModel from "../../../models/interviewer/response/InterviewerSchedulesModel";
import InterviewerScheduleGridComponent from "./InterviewerScheduleGridComponent";
import InterviewerScheduleSearchComponent from "./InterviewerScheduleSearchComponent";

interface InterviewerScheduleProps {
    tileSlotsList: IdNameModel[];
}

const InterviewerScheduleComponent = (props: InterviewerScheduleProps) => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    let tagsinputList: TagsInputModel[] = props.tileSlotsList.map((item) => {
        return { id: item.id.toString(), text: item.name }
    })
    const [scheduleDate, setScheduleDate] = useState("" as any);
    const [timeslotsTags, setTimeslotsTags] = useState<TagsInputModel[]>(tagsinputList);
    const [timeslotsSelected, setTimeslotsSelected] = useState<TagsInputModel[]>([]);
    const [interviewerSchedules, setInterviewerSchedules] = useState<InterviewerSchedulesModel>();
    const [refreshInterviewerScheduleGrid, setRefreshInterviewerScheduleGrid] = useState<number>(2);

    const selectDateHanler = (date: any) => {
        //console.log(dateUtils.getDayFromDate(new Date(date)));
        setScheduleDate(date);
    };

    const handleDelete = (i: number) => {
        setTimeslotsSelected(timeslotsSelected.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag: TagsInputModel) => {
        setTimeslotsSelected([...timeslotsSelected, tag]);
    };

    const handleDrag = (tag: TagsInputModel, currPos: any, newPos: any) => {
        const newTags = timeslotsSelected.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTimeslotsSelected(newTags);
    };

    const handleTagClick = (index: any) => {
        //console.log('The tag at index ' + index + ' was clicked');
    };

    const saveSchedule = () => {
        if (scheduleDate === "" || timeslotsSelected.length < 1) {
            alertUtils.showWarning("Please Select Date and TimeSlots.");
        } else {
            var timslotsSaveList: InterviewerSchedulesRequestModel[] = [];
            if (loggedInUser) {
                var objTimeSlot: InterviewerSchedulesRequestModel = {
                    interviewerId: loggedInUser.profileId,
                    startDate: dateUtils.getFormattedDateFromDate(scheduleDate),
                    endDate: dateUtils.getFormattedDateFromDate(scheduleDate),
                    timeSlotIds: timeslotsSelected.map(x => Number(x.id)),
                    blockSchedule: false
                }
                timslotsSaveList.push(objTimeSlot);
            }
            if (timslotsSaveList.length > 0) {
                InterviewerService.saveInterviewerSchedule(timslotsSaveList).then((res) => {
                    alertUtils.showSuccess(res.informationMessages.toString());
                    if (loggedInUser) {
                        getInterviewerSchedule(loggedInUser.profileId, scheduleDate);
                    }
                }).catch((error) => {
                    alertUtils.showError(error);
                });
            }
        }
    }

    const clearSchedule = () => {
        setScheduleDate("");
        setTimeslotsSelected([]);
        setRefreshInterviewerScheduleGrid(2);
    }

    const getInterviewerSchedule = (interviewerId: string, date: string) => {
        InterviewerService.getInterviewerSchedules(interviewerId, dateUtils.getFormattedDateFromDate(date)).then((res) => {
            setInterviewerSchedules(res.data);
            setRefreshInterviewerScheduleGrid(refreshInterviewerScheduleGrid * 5);
        }).catch((error) => {
            alertUtils.showError(error);
        });
    }

    return (
        <div className="card card-white">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">Date: <span className="required">*</span></label>
                        <DateTimePicker
                            selectsStart
                            onChange={selectDateHanler}
                            selected={scheduleDate}
                            timeInputLabel="Time:"
                            dateFormat="yyyy-MMM-dd"
                            className="form-control"
                            minDate={dateUtils.addDays(new Date(), 1)}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    </div>
                    <div className="col-md-8">
                        <label className="form-label">Time Slots: <span className="required">*</span></label>
                        <ReactTags
                            tags={timeslotsSelected}
                            suggestions={timeslotsTags}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            handleTagClick={handleTagClick}
                            inputFieldPosition="bottom"
                            minQueryLength={0}
                            placeholder="Click here to Add a Schedule"
                            autofocus={false}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-3">
                        <button disabled={scheduleDate === "" || timeslotsSelected.length < 1} className="btn btn-success btn-form" type="submit" onClick={() => saveSchedule()}><span>Save</span></button>
                        <button className="btn btn-danger btn-form" type="button" onClick={() => clearSchedule()}><span>Clear</span></button>
                    </div>
                </div>
                <div className="row">
                    {interviewerSchedules && refreshInterviewerScheduleGrid != 2 &&
                        <InterviewerScheduleGridComponent 
                        key={refreshInterviewerScheduleGrid} 
                        interviewerSchedule={interviewerSchedules} />
                    }
                </div>
                <InterviewerScheduleSearchComponent />
            </div>
        </div>
    );
};
export default InterviewerScheduleComponent;