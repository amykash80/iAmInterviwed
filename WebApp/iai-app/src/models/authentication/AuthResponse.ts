import User from '../User';

export default interface AuthResponse {
    token: string;
    userName: string;
    validaty: string;
    refreshToken: string;
    id: string;
    emailId: string;
    guidId: string;
    expiredTime: Date;
    role: string;
    user: User;    
}
