interface CandidateProfileRequest {
    candidateId: string;
    cityId: number;
    experienceId: number;
    designationId: number;
    currentPay: number;
    noticePeriodId: number;
    mobileNumber: number;
    emailId: string;
    resumeTitle?: string;
    restrictEmployerToViewProfile?: boolean;
}
export default CandidateProfileRequest;