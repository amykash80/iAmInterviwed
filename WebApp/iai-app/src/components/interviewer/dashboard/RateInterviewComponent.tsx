import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import alertUtils from "../../../utils/toaster-utils";
import InterviewerService from '../../../services/interviewer/interviewer-service';
import { Accordion, Card, Button } from "react-bootstrap";
import InterviewRatingModel from "../../../models/interviewer/response/InterviewRatingModel";
import dateUtils from "../../../utils/date-utils";
import "../../../landing-pages/Interviewer/rating.css";

interface RateInterviewProps {
    objRateInterview: InterviewRatingModel;
}

const RateInterviewComponent = (props: RateInterviewProps) => {
    const history = useHistory();
    const [rating, setRating] = useState<number[]>([1, 2, 3, 4, 5]);
    console.log(props.objRateInterview);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<InterviewRatingModel>({
        mode: "onChange",
        defaultValues: props.objRateInterview
    });

    const onSubmit = (formData: InterviewRatingModel) => {
        let ratingZero = formData.technicalSkillRating.find(x => x.rating === 0);
        let softSkillZero = formData.softSkillRating.find(x => x.rating === 0);
        if(ratingZero || softSkillZero) {
            alertUtils.showError("Rating should not be 0.");
        } else {
            InterviewerService.updateInterviewRating(formData).then((res) => {
                if (res.isSuccess) {
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

    const clearRating = () => {
        history.push("/interviewer-dashboard");
    }

    return (
        <div className="card card-white">
            <div className="card-body">
                <form className="contact quform" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-3">Candidate Name :</div>
                        <div className="col-md-3"><span className="rating-value-lable">{props.objRateInterview.candidateName}</span></div>
                        <div className="col-md-3">Interview Date & Time : </div>
                        <div className="col-md-3"><span className="rating-value-lable">{dateUtils.getFormattedDateFromDate(props.objRateInterview.interviewDate)} - {props.objRateInterview.timeSlotName}</span></div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">Primary Skill :</div>
                        <div className="col-md-3"><span className="rating-value-lable">{props.objRateInterview.primarySkillName}</span></div>
                        <div className="col-md-3">Mobile No :</div>
                        <div className="col-md-3"><span className="rating-value-lable">{props.objRateInterview.mobileNumber}</span></div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">Candidate Email :</div>
                        <div className="col-md-3"><span className="rating-value-lable">{props.objRateInterview.mobileNumber}</span></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="rating-tip-header">Rating Tips/Interpretation</h3>
                            <p className="rating-tips">1. Know the subject but no good knowledge, need to learn.</p>
                            <p className="rating-tips">2. Know the subject, have knowledge but no good working exp.</p>
                            <p className="rating-tips">3. Have the knowledge and can work independently.</p>
                            <p className="rating-tips">4. Can work and Guide the team also to work.</p>
                            <p className="rating-tips">5. Exceptionally talented in this and is an asset to the team and to organization.</p>
                        </div>
                        <div className="col-md-6">
                            <h3 className="rating-tip-header">Key Responsibilities</h3>
                            <p></p>
                        </div>
                    </div>
                    <div className="row">
                        <Accordion defaultActiveKey="0">
                            <Card className="card-border-bottom">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        TECHNICAL RATING
                                        <i className="fa fa-angle-down"></i>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {props.objRateInterview.technicalSkillRating.map((skill, index) => (
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label className="form-label">{skill.secondarySkillName} </label>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="quform-element form-group">
                                                        <div className="quform-input">
                                                            <select className="form-control form-select" {...register(`technicalSkillRating.${index}.rating`, { required: true })}>
                                                                <option value="">Select Rating</option>
                                                                {rating.map((type, index) => {
                                                                    return (
                                                                        <option key={index} value={type}> {type} </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="quform-element form-group">
                                                        <div className="quform-input">
                                                            <textarea rows={3} className="form-control" minLength={50} maxLength={200} {...register(`technicalSkillRating.${index}.comments`, { required: skill.isCommentsRequired })} placeholder="Min 50 and Max 200 characters" autoComplete="off" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        SOFT SKILL RATING
                                        <i className="fa fa-angle-down"></i>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        {props.objRateInterview.softSkillRating.map((skill, index) => (
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label className="form-label">{skill.softSkillName} </label>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="quform-element form-group">
                                                        <div className="quform-input">
                                                            <select className="form-control form-select" {...register(`softSkillRating.${index}.rating`, { required: true })}>
                                                                <option value="">Select Rating</option>
                                                                {rating.map((type, index) => {
                                                                    return (
                                                                        <option key={index} value={type}> {type} </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="quform-element form-group">
                                                        <div className="quform-input">
                                                            <textarea rows={3} className="form-control" minLength={50} maxLength={200} {...register(`softSkillRating.${index}.comments`, { required: true })} placeholder="Min 50 and Max 200 characters" autoComplete="off" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                    <div className="row">
                        <div className="col-md-12 padding-0">
                            <textarea rows={4} className="form-control" minLength={100} maxLength={500} {...register("interviewerComments", { required: true })} placeholder="Min 100 and Max 500 characters" autoComplete="off" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9"></div>
                        <div className="col-md-3">
                            <button className="but btn-primary btn-form" type="submit">Save</button>
                            <button className="but btn-danger btn-form" type="button" onClick={() => clearRating()}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default RateInterviewComponent;