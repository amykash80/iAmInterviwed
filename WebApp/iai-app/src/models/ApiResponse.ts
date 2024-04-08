export default class ApiResponse<T> {
    result: T;
    errorMessage: string;
    success: boolean = true;
    message: string;//Job Designer

    constructor(result: T, message: string = '', success: boolean = true) {
        this.result = result;
        this.errorMessage = message;
        this.success = success;
        this.message = message;//Job Designer
    }
}