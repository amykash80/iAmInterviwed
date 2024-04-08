export interface CandidateDashboardModel {
    candidateDashboardProfile: CandidateDashboardProfile;
    candidateDashboardActiveInterview: CandidateDashboardInterview;
    candidateDashboardCompletedInterview: CandidateDashboardInterview;
    candidateDashboardRating: CandidateDashboardRating
}
// export default CandidateDashboardModel;

interface CandidateDashboardProfile {
    candidateId: string;
    candidateName: string;
    designationName: string;
    primarySkillName: string;
    cityName: string;
    experienceName: string;
    resumeTitle: string;
}

export interface CandidateDashboardInterview {
    candidateId: string;
    interviewId: string;
    interviewUniqueId: string;
    interviewDate: Date;
    timeSlotName: string;
    primarySkillName: string;
    secondarySkillName: string;
    interviewerName: string;
}

export interface CandidateDashboardRating {
    interviewId: string;
    interviewUniqueId: string;
    ratingId: string;
    totalRating: string;
    interviewerComments: string;
    candidateDashboardRatingDetails: CandidateDashboardRatingDetails[];
    softSkillRatingDetails: SoftSkillRatingModel[];
}

interface CandidateDashboardRatingDetails {
    ratingId: string;
    secondarySkillName: string;
    rating: string;
    comments: string;
}

interface SoftSkillRatingModel {
    softSkillId: number;
    softSkillName: string;
    rating: number;
    comments: string;
}