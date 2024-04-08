interface InterviewerDashboardModel {
    interviewId: string;
    interviewDate: Date;
    timeSlotName: string;
    candidateName: string;
    interviewTypeName: string;
    primarySkillName: string;
    isConfirmedByInterviewer: string;
    statusName: string;
    isRated: string;
    isRatingAcceptedByUser: string
    rating: string;
    meetingURL: string;
}
export default InterviewerDashboardModel;