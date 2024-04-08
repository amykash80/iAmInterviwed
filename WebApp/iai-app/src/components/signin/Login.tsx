import { FormEvent, useRef, MouseEvent } from "react";
import { Redirect, useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../context-store";
import { authActions } from "../../context-store/auth-context";
import AuthRequest from "../../models/authentication/AuthRequest";
import authenticationService from "../../services/authentication-service";
import alertUtils from "../../utils/toaster-utils";
import SignInLogo from "../../assets/img/content/signin.png";
import CandidateLogo from "../../assets/img/logos/candidate.png";
import CompanyLogo from "../../assets/img/logos/employer.png";
import InterviewerLogo from "../../assets/img/logos/interviewer.png";
import EncryptUtil from '../../utils/encode-utils';
import modalUtils from "../../utils/modal-utils";

const Login = () => {
    const history = useHistory();
    const authenticated = useAppSelector(
        (state) => state.authState.authenticated
    );
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        let password: string = EncryptUtil.getEncoded(passwordRef.current!.value);
        let userName: string = usernameRef.current!.value;

        let request: AuthRequest = {
            userName,
            password
        };
        modalUtils.showLoader("Logging in PLease wait...");
        authenticationService.authenticate(request).then((res) => {
            modalUtils.closeModal();
            if (res.token == null) {
                alertUtils.showError("Unable to login due to wrong credentials !");                
            } else {
                dispatch(authActions.login(res));
            }
        }).catch((error) => {
            modalUtils.closeModal();
            alertUtils.showError("Unable to login due to some error!");
        });
    };

    const register = (event: MouseEvent, registerType: string) => {
        event.preventDefault();
        history.push("/register/" + registerType);
    }
    if (authenticated) {
        return <Redirect to="/"></Redirect>;
    }
    return (
        <section className="bg-light md">
            <div className="container-body">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <img src={SignInLogo} alt="..."></img>
                    </div>
                    <div className="col-lg-6">
                        <div className="container" style={{ backgroundColor: '#ebf0f7', padding: '30px 20px' }}>
                            <div className="contact-form-box" style={{ padding: '50px' }}>
                                <form className="contact quform" onSubmit={loginHandler}>
                                    <div className="quform-elements">
                                        <div className="row">
                                            <p style={{ color: '#000', fontWeight: '700' }}>Sign in into your account</p>
                                            <div className="col-md-12">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <input type="text" className="form-control" name="username" placeholder="Your user name here" autoComplete="off" ref={usernameRef}></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <input type="password" className="form-control" name="password" placeholder="Your password here" autoComplete="off" ref={passwordRef}></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="quform-submit-inner">
                                                    <button className="butn primary mt-4" type="submit"><span>Sign In</span></button>
                                                </div>
                                                <div className="quform-loading-wrap text-start"><span className="quform-loading"></span></div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="quform-submit-inner">
                                                    <button className="butn white  mt-4" type="button"><span>Cancel</span></button>
                                                </div>
                                                <div className="quform-loading-wrap text-start"><span className="quform-loading"></span></div>
                                            </div>
                                            <div className="col-md-6" style={{ textAlign: 'right' }}>
                                                <br></br>
                                                <span className="psw" ><a href="#">Forgot Password?</a></span>
                                            </div>
                                            <p style={{ color: '#000', fontWeight: '700', paddingTop: '10%' }}>Sign up as</p>
                                            <div className="services-block-two col-lg-4 col-md-6 mt-1-5" >
                                                <div className="inner-box candidate" style={{ textAlign: 'left', padding: '0', paddingLeft: '50px' }}>
                                                    <div className="icon-box" style={{ top: '0', left: '0' }}>
                                                        <span> <img src={CandidateLogo} alt="" width="40" style={{ marginBottom: '10px' }}></img></span>
                                                    </div>
                                                    <h3 style={{ paddingTop: '5px' }}>
                                                        <a onClick={(e) => { register(e, "Candidate"); }}>Candidate</a></h3>
                                                </div>
                                            </div>
                                            <div className="services-block-two col-lg-4 col-md-6 mt-1-5"  >
                                                <div className="inner-box candidate" style={{ textAlign: 'left', padding: '0', paddingLeft: '50px' }}>
                                                    <div className="icon-box" style={{ top: '0', left: '0' }}>
                                                        <span> <img src={InterviewerLogo} alt="" width="40" style={{ marginBottom: '10px' }}></img></span>
                                                    </div>
                                                    <h3 style={{ paddingTop: '5px' }}>
                                                        <a onClick={(e) => { register(e, "Interviewer"); }}>Interviewer</a></h3>
                                                </div>
                                            </div>
                                            <div className="services-block-two col-lg-4 col-md-6 mt-1-5"  >
                                                <div className="inner-box candidate" style={{ textAlign: 'left', padding: '0', paddingLeft: '50px' }}>
                                                    <div className="icon-box" style={{ top: '0', left: '0' }}>
                                                        <span> <img src={CompanyLogo} alt="" width="40" style={{ marginBottom: '10px' }}></img></span>
                                                    </div>
                                                    <h3 style={{ paddingTop: '5px' }}>
                                                        <a onClick={(e) => { register(e, "Company"); }}>Employer</a></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;