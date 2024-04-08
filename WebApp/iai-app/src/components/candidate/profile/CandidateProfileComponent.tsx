import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import IdNameModel from "../../../models/common/IdNameModel";
import { EMAIL_RULE, MOBILE_NUMBER_RULE } from "../../../utils/validation-utils";
import { useForm } from "react-hook-form";
import CandidateService from '../../../services/candidate/candidate-service';
import FileUploadService from '../../../services/file-upload-service';
import alertUtils from "../../../utils/toaster-utils";
import CandidateProfileRequest from "../../../models/candidate/request/CandidateProfileRequest";
import CandidateProfileModel from "../../../models/candidate/response/CandidateProfileModel";
import { FileUploadTypeEnum } from "../../../models/enums/FileUploadTypeEnum";
import fileUtils from "../../../utils/file-utils";

interface CandidateProfileProps {
    objCandidateProfile: CandidateProfileModel;
    experienceList: IdNameModel[];
    cityList: IdNameModel[];
    designationList: IdNameModel[];
    noticePeriodList: IdNameModel[];
}

const CandidateProfileComponent = (props: CandidateProfileProps) => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [city, setCity] = useState<IdNameModel[]>(props.cityList);
    const [designation, setDesignation] = useState<IdNameModel[]>(props.designationList);
    const [experience, setExperience] = useState<IdNameModel[]>(props.experienceList);
    const [noticePeriod, setNoticePeriod] = useState<IdNameModel[]>(props.noticePeriodList);
    const [canidateProfile, setCanidateProfile] = useState<CandidateProfileModel>(props.objCandidateProfile);
    const [isResumeUploaded, setIsResumeUploaded] = useState<boolean>(false);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CandidateProfileRequest>({
        mode: "onChange",
        defaultValues: props.objCandidateProfile
    });

    useEffect(() => {
        clearFile();
        if (props.objCandidateProfile.resumeTitle) {
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

    function uploadCandidateResume(e: any): void {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("fileName", e.target.files[0].name);
        data.append("userId", loggedInUser ? loggedInUser.profileId : "");
        data.append("fileUploadType", FileUploadTypeEnum.CandidateResume.toString());
        FileUploadService.uploadFile(data).then((res) => {
            alertUtils.showSuccess(res.informationMessages.toString());
            setIsResumeUploaded(true);
        }).catch((error) => {
            alertUtils.showError(error);
        });
    };

    const downloadCandidateResume = () => {
        if (loggedInUser) {
            CandidateService.downloadCandidateResume(loggedInUser.profileId, FileUploadTypeEnum.CandidateResume.toString()).then((res) => {               
                //var contentType = res.headers.get("Content-Type");
                fileUtils.downloadFile(res, props.objCandidateProfile.resumeTitle);
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    }

    const onSubmit = (formData: CandidateProfileRequest) => {
        if (isResumeUploaded) {
            CandidateService.saveCandidateProfile(formData).then((res) => {
                alertUtils.showSuccess(res.informationMessages.toString());
            }).catch((error) => {
                alertUtils.showError(error);
            });
        } else {
            alertUtils.showWarning("Please Upload Resume to Save Profile.");
        }
    };

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
                                            {city.map((type, index) => {
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
                                            {experience.map((type, index) => {
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
                                        <label className="form-label">Designation: <span className="required">*</span></label>
                                        <select className="form-control form-select" {...register("designationId", { required: true })}>
                                            <option value="">Select Current Designation</option>
                                            {designation.map((type, index) => {
                                                return (
                                                    <option key={index} value={type.id}> {type.name} </option>
                                                );
                                            })}
                                        </select>
                                        <span className="error">
                                            {errors.designationId && errors.designationId.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">Current Pay: <span className="required">*</span></label>
                                        <input type="number" maxLength={2} className="form-control" {...register("currentPay", { required: true })} placeholder="Current pay" autoComplete="off" />
                                        <span className="error">
                                            {errors.currentPay && errors.currentPay.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">Notice Period: <span className="required">*</span></label>
                                        <select className="form-control form-select" {...register("noticePeriodId", { required: true })}>
                                            <option value="">Select NoticePeriod</option>
                                            {noticePeriod.map((type, index) => {
                                                return (
                                                    <option key={index} value={type.id}> {type.name} </option>
                                                );
                                            })}
                                        </select>
                                        <span className="error">
                                            {errors.noticePeriodId && errors.noticePeriodId.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
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
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <label className="form-label">Email Address: <span className="required">*</span></label>
                                        <input type="email" className="form-control" {...register("emailId", EMAIL_RULE)} placeholder="Email Id" autoComplete="off" />
                                        <span className="error">
                                            {errors.emailId && errors.emailId.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="quform-element form-group">
                                    <div className="quform-input">
                                        <input type="checkbox" {...register("restrictEmployerToViewProfile")} />&nbsp;&nbsp;
                                        <label> Keep My Profile Confidential </label>
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
                                    onChange={uploadCandidateResume} accept='.doc,.docx,application/pdf'></input>
                            </div>
                            {isResumeUploaded &&
                                <div className="col-md-3">
                                    <a title="Import File, Please do not import files with the same name." onClick={downloadCandidateResume}>
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
export default CandidateProfileComponent;