export default interface PageParams {
    mode: string;
    id?: string;
}

export default interface RegisterParams {
    type: string;
}

export default interface VerifyAccountParams {
    verificationCode: string;
}

export default interface JobPostingParams {
    requirementId: string;
}