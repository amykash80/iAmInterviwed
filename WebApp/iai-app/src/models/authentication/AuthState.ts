import User from "../User";

interface AuthState {
    authenticated: boolean;
    loggedInUser: User | null;
    userLoaded: boolean
    currentProject?: string;
}
export default AuthState;
