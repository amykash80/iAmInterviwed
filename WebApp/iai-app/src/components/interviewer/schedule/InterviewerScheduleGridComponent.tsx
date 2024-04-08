import React, { useState, useEffect } from "react";
import InterviewerSchedulesModel from "../../../models/interviewer/response/InterviewerSchedulesModel";
import dateUtils from "../../../utils/date-utils";
import DataGrid from "../../common/table/DataGrid";
import { GeneralPoupConfig, ModalSize } from "../../../models/modal-types";
import modalUtils from "../../../utils/modal-utils";
import CloneSchedulePopUp from "./CloneScheduleComponent";
import { DayofWeekEnum } from "../../../models/enums/DayofWeekEnum";

interface InterviewerProfileProps {
    interviewerSchedule: InterviewerSchedulesModel;
}

const InterviewerScheduleGridComponent = (props: InterviewerProfileProps) => {
    let weekdays: string[] = [DayofWeekEnum.Monday.toString(), DayofWeekEnum.Tuesday.toString(), DayofWeekEnum.Wednesday.toString(), DayofWeekEnum.Thursday.toString(), DayofWeekEnum.Friday.toString()];
    let weekEnds: string[] = [DayofWeekEnum.Sunday.toString(), DayofWeekEnum.Saturday.toString()];
    const dateFormatter = (
        cell: any,
        row: InterviewerSchedulesModel,
        rowIndex: number,
        formatExtraData: any
    ) => {
        if (row.date) {
            return dateUtils.getFormattedDateFromDate(row.date) + "-" + dateUtils.getDayFromDate(row.date);
        } else {
            return "";
        }
    };

    const ActionFormatter = (
        cell: any,
        row: InterviewerSchedulesModel,
        rowIndex: number
    ) => {
        if(weekdays.indexOf(dateUtils.getDayFromDate(row.date)) > -1) {
            return (
                <div>
                    <a onClick={() => { cloneSchedulesPopUp(row); }}>Clone For All Week Days</a>
                </div>
            );
        } else {
            return (
                <div>
                    <a onClick={() => { cloneSchedulesPopUp(row); }}>Clone For All Weekends</a>
                </div>
            );
        }        
    };

    const columnsInterviewerSchedule = [
        {
            dataField: "",
            text: "Sl No",
            headerStyle: { width: "5%" }
        },
        {
            dataField: "date",
            text: "Date",
            formatter: dateFormatter
        },
        {
            dataField: "timeSlots",
            text: "Time Slots"
        },
        {
            dataField: "actions",
            text: "",
            formatter: ActionFormatter
        }
    ];

    const cloneSchedulesPopUp = (row: InterviewerSchedulesModel) => {
        const config: GeneralPoupConfig = {
            title: "Clone Schedules",
            content: (
                <CloneSchedulePopUp
                    schedule={row}
                />
            ),
            size: ModalSize.LG,
            className: "model-min-height-500"
        };
        modalUtils.showPopup(config);
    }

    return (
        <div className="col-md-12">
            <DataGrid
                uniqueField="date"
                data={[props.interviewerSchedule]}
                columns={columnsInterviewerSchedule}
                disablePagination={true}
                filterRequired={false}
            />
        </div>
    );
};
export default InterviewerScheduleGridComponent;