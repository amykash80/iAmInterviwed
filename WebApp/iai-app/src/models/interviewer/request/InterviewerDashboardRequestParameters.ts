import { SortDirection } from "../../enums/SortDirectionEnum";

interface InterviewerDashboardRequestParameters {
    page: number,
    pageSize: number,
    sort: string,
    sortDir: SortDirection,
    interviewerId: string,
    startDate: string,
    endDate: string,
    candidateName: string,
    interviewTypeId: number,
    statusId: number
}
export default InterviewerDashboardRequestParameters;