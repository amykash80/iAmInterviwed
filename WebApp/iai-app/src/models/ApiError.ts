class ApiError {
    message: string;
    status?: number;
    constructor(message: string, status?: number) {
        this.message = message;
        if (status) {
            this.status = status;
        }
    }
}
export default ApiError;