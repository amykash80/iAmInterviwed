interface InterviewerSchedulesRequestModel {
    interviewerId: string;
    startDate: string;
    endDate: string;
    timeSlotIds: number[];
    blockSchedule: boolean;
}
export default InterviewerSchedulesRequestModel;