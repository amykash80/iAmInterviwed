import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import IdNameModel from "../../../models/common/IdNameModel";
import { MOBILE_NUMBER_RULE } from "../../../utils/validation-utils";
import { useForm } from "react-hook-form";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import FileUploadService from '../../../services/file-upload-service';
import alertUtils from "../../../utils/toaster-utils";
import InterviewerPersonalInfoModel from "../../../models/interviewer/response/InterviewerPersonalInfoModel";
import InterviewerPersonalInfoRequestModel from "../../../models/interviewer/request/InterviewerPersonalInfoRequestModel";
import { FileUploadTypeEnum } from "../../../models/enums/FileUploadTypeEnum";
import CandidateService from '../../../services/candidate/candidate-service';
import fileUtils from "../../../utils/file-utils";

interface InterviewerProfileProps {
    objInterviewerProfile: InterviewerPersonalInfoModel;
    experienceList: IdNameModel[];
    cityList: IdNameModel[];
}

const InterviewerPersonalInfoComponent = (props: InterviewerProfileProps) => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [isResumeUploaded, setIsResumeUploaded] = useState<boolean>(false);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<InterviewerPersonalInfoRequestModel>({
        mode: "onChange",
        defaultValues: props.objInterviewerProfile
    });

    useEffect(() => {
        clearFile();
        if (props.objInterviewerProfile.resumeTitle) {
            setIsResumeUploaded(true);
        }
    }, []);

    const hiddenFileInput: any = React.useRef();
    const browseFileHandler = (event: any) => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };

    const clearFile = () => {
        hiddenFileInput.current.value = "";
    };

    function uploadInterviewerResume(e: any): void {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("fileName", e.target.files[0].name);
        data.append("userId", loggedInUser ? loggedInUser.profileId : "");
        data.append("fileUploadType", FileUploadTypeEnum.InterviewerResume.toString());
        FileUploadService.uploadFile(data).then((res) => {
            alertUtils.showSuccess(res.informationMessages.toString());
            setIsResumeUploaded(true);
        }).catch((error) => {
            alertUtils.showError(error);
        });
    };

    const onSubmit = (formData: InterviewerPersonalInfoRequestModel) => {
        if (isResumeUploaded) {
            InterviewerService.saveInterviewerPersonalInfo(formData).then((res) => {
                alertUtils.showSuccess(res.informationMessages.toString());
            }).catch((error) => {
                alertUtils.showError(error);
            });
        } else {
            alertUtils.showWarning("Please Upload Resume to Save Profile.");
        }
    };

    const downloadInterviewerResume = () => {
        if (loggedInUser) {
            CandidateService.downloadCandidateResume(loggedInUser.profileId, FileUploadTypeEnum.InterviewerResume.toString()).then((res) => {                                
                fileUtils.downloadFile(res, props.objInterviewerProfile.resumeTitle);
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    }

    return (
        <div className="card card-white">
            <div className="card-body">
                <form className="contact quform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="quform-elements">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">City: <span className="required">*</span></label>
                                        <select className="form-control form-select" {...register("cityId", { required: true })}>
                                            <option value="">Select City</option>
                                            {props.cityList.map((type, index) => {
                                                return (
                                                    <option key={index} value={type.id}> {type.name} </option>
                                                );
                                            })}
                                        </select>
                                        <span className="error">
                                            {errors.cityId && errors.cityId.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">Experience: <span className="required">*</span></label>
                                        <select className="form-control form-select" {...register("experienceId", { required: true })}>
                                            <option value="">Select Experience</option>
                                            {props.experienceList.map((type, index) => {
                                                return (
                                                    <option key={index} value={type.id}> {type.name} </option>
                                                );
                                            })}
                                        </select>
                                        <span className="error">
                                            {errors.experienceId && errors.experienceId.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">Mobile Number: <span className="required">*</span></label>
                                        <input type="tel" className="form-control" {...register("mobileNumber", MOBILE_NUMBER_RULE)} placeholder="Mobile Number" autoComplete="off" />
                                        <span className="error">
                                            {errors.mobileNumber && errors.mobileNumber.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">Address: </label>
                                        <textarea rows={3} className="form-control" {...register("address")} placeholder="Address" autoComplete="off" />
                                        <span className="error">
                                            {errors.address && errors.address.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                {/* <a title="Import File, Please do not import files with the same name." onClick={browseFileHandler}>
                                    <i className="fa fa-upload"></i>
                                    <span>Upload Resume</span>
                                </a> */}
                                <label className="form-label">Resume: {!isResumeUploaded && <span className="required">*</span>}</label>
                                <input className="form-control" type="file" ref={hiddenFileInput}
                                    onChange={uploadInterviewerResume} accept='.doc,.docx,application/pdf'></input>
                            </div>
                            {isResumeUploaded &&
                                <div className="col-md-3">
                                    <a title="Import File, Please do not import files with the same name." onClick={downloadInterviewerResume}>
                                        <i className="fa fa-download"></i>
                                        <span>Download Resume</span>
                                    </a>
                                </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-3">
                                <button className="butn primary mt-4" type="submit"><span>Save Profile</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default InterviewerPersonalInfoComponent;