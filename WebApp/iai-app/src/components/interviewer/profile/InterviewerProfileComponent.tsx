import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../context-store";
import IdNameModel from "../../../models/common/IdNameModel";
import { useForm } from "react-hook-form";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import alertUtils from "../../../utils/toaster-utils";
import InterviewerProfileModel from "../../../models/interviewer/request/InterviewerProfileModel";
import MasterDataService from '../../../services/master-data-service';
import InterviewerProfileGridComponent from './InterviewerProfileGridComponent';
import { GeneralPoupConfig, ModalSize } from "../../../models/modal-types";
import modalUtils from "../../../utils/modal-utils";
import InterviewerProfilePopUp from "./InterviewerProfilePopUpComponent";

const InterviewerProfileComponent = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const [primarySkillList, setPrimarySkillList] = useState<IdNameModel[]>([]);
    const [interviewerProfile, setInterviewerProfile] = useState<InterviewerProfileModel[]>([]);
    const [secondarySkillList, setSecondarySkillList] = useState<IdNameModel[]>([]);
    const [refreshInterviewerProfile, setRefreshInterviewerProfile] = useState<number>(2);

    useEffect(() => {
        getPrimarySkill();
        if (loggedInUser) {
            getInterviewerProfile(loggedInUser.profileId);
        }
    }, []);

    const getInterviewerProfile = (interviewerId?: string) => {
        if (interviewerId) {
            InterviewerService.getInterviewerProfile(interviewerId).then((res) => {
                if (res.isSuccess) {
                    setInterviewerProfile(res.data);
                    setRefreshInterviewerProfile(refreshInterviewerProfile * 5);
                } else {
                    alertUtils.showError("Unable to load Data");
                }
            }).catch((error) => {
                alertUtils.showError(error);
            });
        }
    };

    const getPrimarySkill = () => {
        MasterDataService.loadPrimarySkills().then((res) => {
            if (res.isSuccess) {
                setPrimarySkillList(res.items);
            } else {
                alertUtils.showError("Unable to load Primary skills");
            }
        }).catch((error) => {
            alertUtils.showError("Erorr fetching Primary skills");
        });
    };

    const onProfileActionHandler = (obj: InterviewerProfileModel, actionType: string) => {
        if (actionType === "Edit") {
            MasterDataService.loadSecondarySkills(obj.primarySkillId).then((res) => {
                if (res.isSuccess) {
                    const config: GeneralPoupConfig = {
                        title: "Profile Details",
                        content: (
                            <InterviewerProfilePopUp
                                objInterviewerProfile={obj}
                                primarySkillList={primarySkillList}
                                secondarySkillList={res.items}
                                actionType={actionType}
                                onCloseProfile={onCloseProfileHandler}
                            />
                        ),
                        size: ModalSize.XL,
                        className: "model-min-height-500"
                    };
                    modalUtils.showPopup(config);
                } else {
                    alertUtils.showError("Unable to load Primary skills");
                }
            }).catch((error) => {
                alertUtils.showError("Erorr fetching Primary skills");
            });
        } else {
            const config: GeneralPoupConfig = {
                title: "Profile Details",
                content: (
                    <InterviewerProfilePopUp
                        objInterviewerProfile={obj}
                        primarySkillList={primarySkillList}
                        secondarySkillList={[]}
                        actionType={actionType}
                        onCloseProfile={onCloseProfileHandler}
                    />
                ),
                size: ModalSize.XL,
                className: "model-min-height-500"
            };
            modalUtils.showPopup(config);
        }
    }

    const onCloseProfileHandler = () => {
        modalUtils.closeModal();
        if (loggedInUser) {
            getInterviewerProfile(loggedInUser.profileId);
        }
    }

    return (
        <div className="card card-white">
            <div className="card-body">
                {interviewerProfile.length > 0 && refreshInterviewerProfile > 2 &&
                    <InterviewerProfileGridComponent
                        key={refreshInterviewerProfile}
                        profilesList={interviewerProfile}
                        onProfileAction={onProfileActionHandler} />
                }
            </div>
        </div>
    );
};
export default InterviewerProfileComponent;