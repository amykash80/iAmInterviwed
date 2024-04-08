import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import IdNameModel from "../../../models/common/IdNameModel";
import { useForm } from "react-hook-form";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import InterviewerProfileModel from "../../../models/interviewer/request/InterviewerProfileModel";
import DataGrid from "../../common/table/DataGrid";

interface InterviewerProfileGridProps {
    profilesList: InterviewerProfileModel[];
    onProfileAction: (row: InterviewerProfileModel, actionType: string) => void;
}

const InterviewerProfileGridComponent = (props: InterviewerProfileGridProps) => {
    const ActionFormatter = (
        cell: any,
        row: InterviewerProfileModel,
        rowIndex: number
    ) => {
        return (
            <div className="text-center-align">
                <a onClick={() => { editProfile(row); }}>Edit</a>
            </div>
        );
    };

    const secondarySkillsFormatter = (
        cell: any,
        row: InterviewerProfileModel,
        rowIndex: number
    ) => {
        return (
            <div title={row.interviewerSkills.map(x => x.secondarySkillName).toString()}>
                {row.interviewerSkills.map(x => x.secondarySkillName).toString()}
            </div>
        );
    };

    const editProfile = (row: InterviewerProfileModel) => {
        props.onProfileAction(row, "Edit");
    }

    const addProfile = () => {
        let newProfileModel: InterviewerProfileModel = {
            interviewerId: "",
            interviewerProfileId: "",
            profileName: "",
            primarySkillId: 0,
            primarySkillName: "",
            additionalSkills: "",
            interviewerSkills: []
        }
        props.onProfileAction(newProfileModel, "Add");
    }

    const columnsInterviewerProfile = [
        {
            dataField: "profileName",
            text: "ProfileName"
        },
        {
            dataField: "primarySkillName",
            text: "Primary Skill"
        },
        {
            dataField: "additionalSkills",
            text: "SecondarySkills",
            formatter: secondarySkillsFormatter
        },
        {
            dataField: "actions",
            text: "",
            formatter: ActionFormatter
        }
    ];

    return (
        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-default float-right" onClick={addProfile}> + Add Profile</button>
                <DataGrid
                    uniqueField="interviewerProfileId"
                    data={props.profilesList}
                    columns={columnsInterviewerProfile}
                    disablePagination={true}
                    filterRequired={false}
                />
            </div>
        </div>
    );
};
export default InterviewerProfileGridComponent;