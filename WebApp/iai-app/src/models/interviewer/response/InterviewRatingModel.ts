import ConfirmScheduleDetailsModel from "./ConfirmScheduleDetailsModel";

interface InterviewRatingModel extends ConfirmScheduleDetailsModel {
    ratingId: string;
    totalRating: number;
    interviewerComments: string;
    interviewRecordingTitle: string;
    ratedDate: Date;
    isRatingAcceptedByUser: boolean;
    technicalSkillRating: TechnicalSkillRatingModel[];
    softSkillRating: SoftSkillRatingModel[];
}
export default InterviewRatingModel;

interface TechnicalSkillRatingModel {
    interviewSkillId: string;
    secondarySkillId: number;
    secondarySkillName: string;
    secondarySkillNumber: number;
    isCommentsRequired: boolean;
    rating: number;
    comments: string;
}

interface SoftSkillRatingModel {
    softSkillId: number;
    softSkillName: string;
    rating: number;
    comments: string;
}