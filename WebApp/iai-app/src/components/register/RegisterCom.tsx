import { useRef, MouseEvent, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../context-store";
import AppConfig from "../../config";
import RegisterParams from "../../models/common/PageParms";
import IdNameModel from "../../models/common/IdNameModel";
import RegisterService from "../../services/authentication-service";
import RegisterUserModel from "../../models/authentication/RegisterUser";
import { OBJECT_NAME_RULE, EMAIL_RULE, PASSWORD_RULE, MOBILE_NUMBER_RULE } from "../../utils/validation-utils";
import { useForm } from "react-hook-form";
import masterDataService from '../../services/master-data-service';
import EncryptUtil from '../../utils/encode-utils';
import { RoleEnum } from "../../models/enums/RoleEnum";
import ReCAPTCHA from "react-google-recaptcha";
import CompanyLogo from "../../assets/img/logos/employer.png";
import InterviewerLogo from "../../assets/img/logos/interviewer.png";
import alertUtils from "../../utils/toaster-utils";
import modalUtils from "../../utils/modal-utils";

const RegisterCom = () => {
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterUserModel>({
        mode: "onChange",
    });
    const [primarySkill, setPrimarySkill] = useState<IdNameModel[]>([]);
    const [country, setCountry] = useState<IdNameModel[]>([]);
    const [city, setCity] = useState<IdNameModel[]>([]);
    const [experience, setExperience] = useState<IdNameModel[]>([]);
    const captchaRef: any = useRef(null);
    const siteKey = AppConfig.envVariables.recapchaSiteKey;

    useEffect(() => {
        getPrimarySkill();
        getCountry();
        getExperience();
    }, [])

    const requestParams: RegisterParams = useParams();
    const history = useHistory();
    const authenticated = useAppSelector(
        (state: any) => state.authState.authenticated
    );

    if (authenticated) {
        return <Redirect to="/"></Redirect>;
    };

    const signIn = (event: MouseEvent) => {
        event.preventDefault();
        history.push("/login");
    };

    const fnRegister = (event: MouseEvent, registerType: string) => {
        event.preventDefault();
        history.push("/register/" + registerType);
    }

    const onSubmit = (registerFormData: RegisterUserModel) => {
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        if (token === null || token === '') {
            alertUtils.showWarning("Please accept captcha.");
            return;
        }
        registerFormData.password = EncryptUtil.getEncoded(registerFormData.password);
        registerFormData.confirmPassword = EncryptUtil.getEncoded(registerFormData.confirmPassword);
        if (registerFormData.password != registerFormData.confirmPassword) {
            alertUtils.showError("passwords doesn't match.");
        } else {
            registerFormData.mobileNumber = Number(registerFormData.mobileNumber);
            registerFormData.primarySkillId = Number(registerFormData.primarySkillId);
            registerFormData.countryId = Number(registerFormData.countryId);
            registerFormData.cityId = Number(registerFormData.cityId);
            registerFormData.experienceId = Number(registerFormData.experienceId);
            registerFormData.roleId = requestParams.type === "Candidate" ? Number(RoleEnum.Candidate) : Number(RoleEnum.Interviewer);
            registerFormData.emailId = registerFormData.userName;
            RegisterService.registerUser(registerFormData).then((res) => {
                if (res.isSuccess) {
                    alertUtils.showSuccess(res.informationMessages.toString());
                } else {
                    alertUtils.showError(res.errorMessages.toString());
                }
            }).catch((error) => {
                alertUtils.showError("Erorr registering user.");
            });
        }
    };

    const getPrimarySkill = () => {
        masterDataService.loadPrimarySkills()
            .then((res) => {
                if (res.isSuccess) {
                    setPrimarySkill(res.items);
                } else {
                    alertUtils.showError("Unable to load Primary skills");
                }
            })
            .catch((error) => {
                alertUtils.showError("Erorr fetching Primary skills");
            });
    };

    const getCountry = () => {
        masterDataService.loadCountries()
            .then((res) => {
                if (res.isSuccess) {
                    setCountry(res.items);
                } else {
                    alertUtils.showError("Unable to load Countries");
                }
            })
            .catch((error) => {
                alertUtils.showError("Unable to load Countries");
            });
    };

    const getExperience = () => {
        masterDataService.loadExperiences()
            .then((res) => {
                if (res.isSuccess) {
                    setExperience(res.items);
                } else {
                    alertUtils.showError("Unable to load Experience");
                }
            })
            .catch((error) => {
                alertUtils.showError(error);
            });
    };

    const getCity = (targetValue: string) => {
        masterDataService.loadCities(parseInt(targetValue)).then((res) => {
            if (res.isSuccess) {
                setCity(res.items);
            } else {
                alertUtils.showError("Unable to load Cities");
            }
        }).catch((error) => {
            alertUtils.showError(error);
        });
    };

    return (
        <section className="bg-light md">
            <div className="container-body">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        {(requestParams.type === "Candidate") && (
                            <div>
                                <div className="container-body register-image">
                                    <div className="col-md-12 register-image-name">
                                        <p>Saran (F1035A71977123)</p>
                                    </div>
                                    <div className="col-md-12 register-image-rating">
                                        <h3>3/5</h3>
                                    </div>
                                    <div className="col-md-12">
                                        <p className="register-image-skill">J2EE, JAVA, SPRING</p>
                                    </div>
                                    <div className="col-md-12">
                                        <p className="register-image-info">Visit to verify at <br /> www.iaminterviewed.com</p>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="container-body register-profile-info">
                                        <div className="contact-form-box register-profile-info-padding-0">
                                            <form className="contact quform" action="quform/contact.php" method="post" encType="multipart/form-data">
                                                <div className="quform-elements">
                                                    <div className="row">
                                                        <p>
                                                            <ul>
                                                                <li>Your profile is secured</li>
                                                                <li>No one can see your contact details. You MUST grant Access to each of the request for any employer to see your contact details</li>
                                                                <li>You can Apply to your favorite companies</li>
                                                                <li>You will receive your Technical Skill Badge after Interview, you can use this badge to apply for any company</li>
                                                            </ul>
                                                        </p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-6">
                        <div className="container-body register-block">
                            <div className="contact-form-box">
                                <form className="contact quform" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="quform-elements">
                                        <div className="row">
                                            <p className="register-block-signin-text">Sign us as {requestParams.type}</p>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <input type="text" className="form-control" {...register("name", OBJECT_NAME_RULE)} placeholder="Name" autoComplete="off" />
                                                        <span className="error">
                                                            {errors.name && errors.name.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <input type="email" className="form-control" {...register("userName", EMAIL_RULE)} placeholder="Email/User Name" autoComplete="off" />
                                                        <span className="error">
                                                            {errors.userName && errors.userName.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <input type="password" className="form-control" {...register("password", PASSWORD_RULE)} placeholder="Password" autoComplete="off" />
                                                        <span className="error">
                                                            {errors.password && errors.password.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <input type="password" className="form-control" {...register("confirmPassword", PASSWORD_RULE)} placeholder="Confirm Password" autoComplete="off" />
                                                        <span className="error">
                                                            {errors.confirmPassword && errors.confirmPassword.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <input type="tel" className="form-control" {...register("mobileNumber", MOBILE_NUMBER_RULE)} placeholder="Mobile Number" autoComplete="off" />
                                                        <span className="error">
                                                            {errors.mobileNumber && errors.mobileNumber.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <select className="form-control form-select" {...register("primarySkillId", { required: true })}>
                                                            <option value="">Select Primary Skill</option>
                                                            {primarySkill.map((type, index) => {
                                                                return (
                                                                    <option key={index} value={type.id}> {type.name} </option>
                                                                );
                                                            })}
                                                        </select>
                                                        <span className="error">
                                                            {errors.primarySkillId && errors.primarySkillId.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <select className="form-control form-select" {...register("countryId", { required: true })} onChange={(e) => getCity(e.target.value)}>
                                                            <option value="">Select Country</option>
                                                            {country.map((type, index) => {
                                                                return (
                                                                    <option key={index} value={type.id}> {type.name} </option>
                                                                );
                                                            })}
                                                        </select>
                                                        <span className="error">
                                                            {errors.countryId && errors.countryId.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <select className="form-control form-select" {...register("cityId", { required: true })}>
                                                            <option value="">Select City</option>
                                                            {city.map((type, index) => {
                                                                return (
                                                                    <option key={index} value={type.id}> {type.name} </option>
                                                                );
                                                            })}
                                                        </select>
                                                        <span className="error">
                                                            {errors.cityId && errors.cityId.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <select className="form-control form-select" {...register("experienceId", { required: true })}>
                                                            <option value="">Select Experience</option>
                                                            {experience.map((type, index) => {
                                                                return (
                                                                    <option key={index} value={type.id}> {type.name} </option>
                                                                );
                                                            })}
                                                        </select>
                                                        <span className="error">
                                                            {errors.experienceId && errors.experienceId.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="quform-element form-group">
                                                    <div className="quform-input">
                                                        <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="quform-submit-inner">
                                                    <button className="butn primary mt-4" type="submit"><span>Register</span></button>
                                                </div>
                                                <div className="quform-loading-wrap text-start"><span className="quform-loading"></span></div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="quform-submit-inner">
                                                    <button className="butn white  mt-4" type="button"><span>Cancel</span></button>
                                                </div>
                                                <div className="quform-loading-wrap text-start"><span className="quform-loading"></span></div>
                                            </div>
                                            <div className="col-md-6 register-block-already-registered">
                                                <span className="psw" ><a onClick={(e) => { signIn(e); }}>Already Registered ? Sign in</a></span>
                                            </div>
                                            <p className="register-block-signup">Sign up as</p>
                                            <div className="services-block-two col-lg-4 col-md-6 mt-1-5">
                                                <div className="inner-box candidate register-block-signup-interviewer">
                                                    <div className="icon-box">
                                                        <span> <img className="register-block-signup-interviewer-logo" src={InterviewerLogo} alt=""></img></span>
                                                    </div>
                                                    <h3><a onClick={(e) => { fnRegister(e, "Interviewer"); }}>Interviewer</a></h3>
                                                </div>
                                            </div>
                                            <div className="services-block-two col-lg-4 col-md-6 mt-1-5" >
                                                <div className="inner-box candidate register-block-signup-company">
                                                    <div className="icon-box">
                                                        <span> <img src={CompanyLogo} alt="" className="register-block-signup-company-logo"></img></span>
                                                    </div>
                                                    <h3><a onClick={(e) => { fnRegister(e, "Company"); }}>Employer</a></h3>
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
export default RegisterCom;