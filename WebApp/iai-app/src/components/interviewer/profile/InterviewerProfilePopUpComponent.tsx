import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import IdNameModel from "../../../models/common/IdNameModel";
import { useForm } from "react-hook-form";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import InterviewerProfileModel from "../../../models/interviewer/request/InterviewerProfileModel";
import MasterDataService from '../../../services/master-data-service';
import { OBJECT_NAME_RULE } from "../../../utils/validation-utils";

interface InterviewerProfileProps {
    objInterviewerProfile: InterviewerProfileModel;
    primarySkillList: IdNameModel[];
    secondarySkillList: IdNameModel[];
    actionType: string;
    onCloseProfile: () => void;
}

const InterviewerProfilePopupComponent = (props: InterviewerProfileProps) => {
    const [secondarySkills, setSecondarySkills] = useState<number[]>([0, 0, 0, 0, 0]);
    const [secondarySkillList, setSecondarySkillList] = useState<IdNameModel[]>(props.secondarySkillList);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<InterviewerProfileModel>({
        mode: "onChange",
        defaultValues: props.objInterviewerProfile
    });

    useEffect(() => {
        if (props.actionType === "Edit") {
            getSecondarySkills(props.objInterviewerProfile.primarySkillId);
        }
    }, []);

    const getSecondarySkills = (primarySkillId: number) => {
        if (primarySkillId !== 0) {
            MasterDataService.loadSecondarySkills(primarySkillId).then((res) => {
                if (res.isSuccess) {
                    setSecondarySkillList(res.items);
                } else {
                    alertUtils.showError("Unable to load Primary skills");
                }
            }).catch((error) => {
                alertUtils.showError("Erorr fetching Primary skills");
            });
        } else {
            alertUtils.showError("Please Select Primary Skill");
        }
    };

    const onSubmit = (formData: InterviewerProfileModel) => {
        formData.interviewerSkills.forEach(function (item, index) {
            item.secondarySkillId = Number(item.secondarySkillId);
            item.secondarySkillNumber = index + 1;
        });
        var skillsDuplicateArr = formData.interviewerSkills.map(function (item) { return item.secondarySkillId });
        var isDuplicate = skillsDuplicateArr.some(function (item, idx) {
            return skillsDuplicateArr.indexOf(item) != idx
        });
        if (formData.interviewerSkills.filter(x => x.secondarySkillId === 0).length > 0 || isDuplicate) {
            alertUtils.showError("Secondary skills as mandatory and should be unique.");
        } else {
            InterviewerService.saveInterviewerProfile(formData).then((res) => {
                alertUtils.showSuccess(res.informationMessages.toString());
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    };

    return (
        <div className="card card-white">
            <div className="card-body">
                <form className="contact quform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="quform-element form-group">
                                <div className="quform-input">
                                    <label className="form-label">Profile Name: <span className="required">*</span> </label>
                                    <input type="text" className="form-control" {...register("profileName", OBJECT_NAME_RULE)} placeholder="Profile Name" autoComplete="off" />
                                    <span className="error">
                                        {errors.profileName && errors.profileName.message}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="quform-element form-group">
                                <div className="quform-input">
                                    <label className="form-label">Primary Skill: <span className="required">*</span></label>
                                    <select disabled={props.actionType === "Edit"} className="form-control form-select" {...register("primarySkillId", { required: true })}
                                        onChange={(e) => getSecondarySkills(Number(e.target.value))}>
                                        <option value="">Select Primary Skill</option>
                                        {props.primarySkillList.map((type, index) => {
                                            return (
                                                <option key={index} value={type.id}> {type.name} </option>
                                            );
                                        })}
                                    </select>
                                    <span className="error">
                                        {errors.primarySkillId && errors.primarySkillId.message}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {secondarySkills.map((field, index) => (
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">Secondary Skill {index + 1}: <span className="required">*</span></label>
                                        <select className="form-control form-select" {...register(`interviewerSkills.${index}.secondarySkillId`, { required: true })}>
                                            <option value="">Select Secondary Skill</option>
                                            {secondarySkillList.map((type, index) => {
                                                return (
                                                    <option key={index} value={type.id}> {type.name} </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-md-9"></div>
                        <div className="col-md-3">
                            <button className="btn btn-success btn-form" type="submit"><span>Save</span></button>
                            <button className="btn btn-danger btn-form" type="button" onClick={() => props.onCloseProfile()}>Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default InterviewerProfilePopupComponent;