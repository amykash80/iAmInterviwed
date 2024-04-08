export default interface BaseResponseList<T> {
    isSuccess: boolean;   
    errorMessages : string[];
    warningMessages: string[];
    informationMessages: string[];
    items: T;
}