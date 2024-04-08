interface JobPostingSearchInputModel {
    userId: string;
    companyId: string;
    jobCode: string;
    page: number;
    pageSize: number;
    sort: string;
    sortDir: number;
}
export default JobPostingSearchInputModel;