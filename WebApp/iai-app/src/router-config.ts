import RouteConfig from "./models/RouteConfig";
import SignIn from "./landing-pages/SignIn";
import Index from "./landing-pages/Index";
import Register from "./landing-pages/Register";
import VerifyAccount from "./landing-pages/VerifyAccount";
import ChangePassword from "./landing-pages/ChangePassword";
import Home from "./landing-pages/home/Home";
import InterviewerDashboard from "./landing-pages/Interviewer/InterviewerDashboard";
import InterviewerProfile from "./landing-pages/Interviewer/InterviewerProfile";
import InterviewerSchedule from "./landing-pages/Interviewer/InterviewerSchedule";
import ReferFriend from "./landing-pages/Interviewer/ReferFriend";
import PickUpSchedule from "./landing-pages/Interviewer/PickUpSchedule";
import InterviewerPersonalInfo from "./landing-pages/Interviewer/InterviewerPersonalInfo";
import CandidateDashboard from "./landing-pages/candidate/CandidateDashboard";
import CandidateProfile from "./landing-pages/candidate/CandidateProfile";
import ScheduleInterview from "./landing-pages/candidate/ScheduleInterview";
import RateInterview from "./landing-pages/Interviewer/RateInterview";

const routes: RouteConfig[] = [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/index",
        component: Index,
        protected: false,
    },
    {
        path: "/login",
        component: SignIn,
        protected: false,
    },
    {
        path: "/register/:type",
        component: Register,
        protected: false,
    },
    {
        path: "/verifyaccount/:verificationCode",
        component: VerifyAccount,
        protected: false,
    },
    {
        path: "/changepassword",
        component: ChangePassword
    },
    {
        path: "/interviewer-dashboard",
        component: InterviewerDashboard
    },
    {
        path: "/interviewer-profile",
        component: InterviewerProfile
    },
    {
        path: "/interviewer-personal-info",
        component: InterviewerPersonalInfo
    },
    {
        path: "/interviewer-schedule",
        component: InterviewerSchedule
    },
    {
        path: "/refer-friend",
        component: ReferFriend
    },
    {
        path: "/pickup-schedule",
        component: PickUpSchedule
    },
    {
        path: "/candidate-dashboard",
        component: CandidateDashboard
    },
    {
        path: "/candidate-profile",
        component: CandidateProfile
    },
    {
        path: "/schedule-interview",
        component: ScheduleInterview
    },
    {
        path: "/rate-interview/:interviewId",
        component: RateInterview
    }
];
export default routes;