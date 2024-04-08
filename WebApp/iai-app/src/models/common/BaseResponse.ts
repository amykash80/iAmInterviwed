export default interface BaseResponse<T> {
    isSuccess: boolean;   
    errorMessages : string[];
    warningMessages: string[];
    informationMessages: string[];
    data: T;
}