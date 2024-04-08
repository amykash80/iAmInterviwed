import { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import IdNameModel from "../../../models/common/IdNameModel";
import { useForm } from "react-hook-form";
import masterDataService from '../../../services/master-data-service';
import alertUtils from "../../../utils/toaster-utils";
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateUtils from "../../../utils/date-utils";
import ScheduleInterviewRequest from "../../../models/candidate/request/ScheduleInterviewRequest";
import CandidateService from '../../../services/candidate/candidate-service';
import { InterviewTypeEnum } from "../../../models/enums/InterviewTypeEnum";

const ScheduleInterviewComponent = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [interviewDate, setInterviewDate] = useState("" as any);
    const [primarySkills, setPrimarySkills] = useState<IdNameModel[]>([]);
    const [secondarySkillList, setSecondarySkillList] = useState<IdNameModel[]>([]);
    const [timeSlots, setTimeSlots] = useState<IdNameModel[]>([]);
    const [secondarySkills, setSecondarySkills] = useState<number[]>([0, 0, 0, 0, 0]);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ScheduleInterviewRequest>({
        mode: "onChange"
    });

    useEffect(() => {
        getPrimarySkills();
        getTimeSlots();
    }, [])

    const getPrimarySkills = () => {
        masterDataService.loadPrimarySkills().then((res) => {
            if (res.isSuccess) {
                setPrimarySkills(res.items);
            } else {
                alertUtils.showError("Unable to load Primary skills");
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Primary skills");
        });
    };

    const getSecondarySkills = (primarySkillId: string) => {
        masterDataService.loadSecondarySkills(Number(primarySkillId)).then((res) => {
            if (res.isSuccess) {
                setSecondarySkillList(res.items);
            } else {
                alertUtils.showError("Unable to load Primary skills");
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Primary skills");
        });
    };

    const getTimeSlots = () => {
        masterDataService.loadTimeSlots().then((res) => {
            if (res.isSuccess) {
                setTimeSlots(res.items);
            } else {
                alertUtils.showError("Unable to load Primary skills");
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Primary skills");
        });
    };

    const selectEndDateHanler = (date: any) => {
        setInterviewDate(date);
    };

    const onSubmit = (formData: ScheduleInterviewRequest) => {
        var skillsDuplicateArr = formData.secondarySkills.map(function (item) { return item });
        var isDuplicate = skillsDuplicateArr.some(function (item, idx) {
            return skillsDuplicateArr.indexOf(item) != idx
        });
        if (!interviewDate && !formData.secondarySkills.includes(0) && isDuplicate) {
            alertUtils.showError("Interview date is mandatory. Secondary skills as mandatory and should be unique.");
        } else {
            formData.candidateId = loggedInUser ? loggedInUser.profileId : "";
            formData.interviewDate = interviewDate;
            formData.interviewTypeId = InterviewTypeEnum.Audio;
            CandidateService.scheduleInterview(formData).then((res) => {
                if (res.data) {
                    alertUtils.showSuccess(res.informationMessages.toString());
                }
                else {
                    alertUtils.showError(res.errorMessages.toString());
                }
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
                        <div className="col-md-4">
                            <label className="form-label">Interview Date: <span className="required">*</span></label>
                            <DateTimePicker
                                selectsStart
                                onChange={selectEndDateHanler}
                                selected={interviewDate}
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
                            <div className="quform-element form-group">
                                <div className="quform-input">
                                    <label className="form-label">Time Slot: </label>
                                    <select className="form-control form-select" {...register("timeSlotId", { required: true })}>
                                        <option value="">Select Timeslot</option>
                                        {timeSlots.map((type, index) => {
                                            return (
                                                <option key={index} value={type.id}> {type.name} </option>
                                            );
                                        })}
                                    </select>
                                    <span className="error">
                                        {errors.timeSlotId && errors.timeSlotId.message}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="quform-element form-group">
                                <div className="quform-input">
                                    <label className="form-label">Primary Skill: <span className="required">*</span></label>
                                    <select className="form-control form-select" {...register("primarySkillId", { required: true })} onChange={(e) => getSecondarySkills(e.target.value)}>
                                        <option value="">Select Primary Skill</option>
                                        {primarySkills.map((type, index) => {
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
                    </div>
                    {secondarySkills.map((field, index) => (
                        <div className="row">
                            <div className="col-md-2">
                                <label className="form-label">Secondary Skill {index + 1}: <span className="required">*</span></label>
                            </div>
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <select className="form-control form-select" {...register(`secondarySkills.${index}`, { required: true })}>
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
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="quform-element form-group">
                                <div className="quform-input">
                                    <input type="checkbox" {...register("termsAndConditions", { required: true })} />&nbsp;&nbsp;
                                    <label> I Agree for Terms and Conditions <span className="required">*</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9"></div>
                        <div className="col-md-3">
                            <button className="butn primary mt-4" type="submit"><span>Schedule Interview</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ScheduleInterviewComponent;