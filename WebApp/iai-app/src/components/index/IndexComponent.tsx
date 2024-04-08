import { FormEvent, useRef, MouseEvent } from "react";
import { Redirect, useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../context-store";
import { authActions } from "../../context-store/auth-context";
import AuthRequest from "../../models/authentication/AuthRequest";
import authenticationService from "../../services/authentication-service";
import alertUtils from "../../utils/toaster-utils";
import SliderComponent from "./SliderComponent";
import HowItWorksComponent from "./HowItWorksComponent";
import TechnologyComponent from "./TechnologyComponent";
import TestimonialsComponent from "./TestimonialsComponent";
import InterviewsComponent from "./InterviewsComponent";
import ClientsComponent from "./ClientsComponent";

const IndexComponent = () => {
    const history = useHistory();
    const authenticated = useAppSelector(
        (state) => state.authState.authenticated
    );

    if (authenticated) {
        return <Redirect to="/"></Redirect>;
    }
    return (
        <div>
            <SliderComponent />
            <HowItWorksComponent />
            <TechnologyComponent />
            <TestimonialsComponent />
            <InterviewsComponent />
            <ClientsComponent />
        </div>
    );
};
export default IndexComponent;